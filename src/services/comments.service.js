import axios from "axios";

class CommentsService {
  constructor() {
    // Create a new instance of axios with a custom configuration
    this.api = axios.create({
      baseURL: import.meta.env.VITE_DEPLOYMENT_SERVER_URL || "http://localhost:5005",
    });
    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      // interceptor will execute before request is sent
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  /*-----GET SINGLE COMMENT-----*/
  // GET /api/comments/:commentId -  Retrieves a specific comment by id
  getComment = (id) => {
    return this.api.get(`/api/comments/${id}`);
  };

  /*-----POST COMMENT ON SINGLE GAME-----*/
  // POST /api/comments -  Posts a comment on a specific game by id
  createComment = (requestBody) => {
    return this.api.post("/api/comments", requestBody);
  };

  /*-----EDIT COMMENT-----*/
  // PUT : /api/comments/:commentId -  Updates a specific comment by id
  updateComment = (id, requestBody) => {
    return this.api.put(`/api/comments/${id}`, requestBody);
  };

  /*-----DELETE COMMENT FROM DATABASE AND REMOVE FROM USER'S COMMENTS ARRAY-----*/
  // DELETE: /api/comments/:commentId  -  Deletes a specific comment by id
  deleteComment = (id) => {
    return this.api.delete(`/api/comments/${id}`);
  };

}

const commentsService = new CommentsService();

export default commentsService;
