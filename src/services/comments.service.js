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

  /*-----POST COMMENT ON SINGLE GAME-----*/
  // POST /api/comments -  Posts a comment on a specific game by id
  createComment = (requestBody) => {
    return this.api.post("/api/comments", requestBody);
  };
}

const commentsService = new CommentsService();

export default commentsService;
