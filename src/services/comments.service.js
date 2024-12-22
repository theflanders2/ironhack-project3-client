import axios from "axios";

class CommentsService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_DEPLOYMENT_SERVER_URL || "http://localhost:5005",
    });

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        config.headers.Authorization = `Bearer ${storedToken}`;
      }
      return config;
    });
  }

  // Retrieves a specific comment by id
  getComment = (id) => {
    return this.api.get(`/api/comments/${id}`);
  };

  // Posts a comment on a specific game by id
  createComment = (requestBody) => {
    return this.api.post("/api/comments", requestBody);
  };

  // Updates a specific comment by id
  updateComment = (id, requestBody) => {
    return this.api.put(`/api/comments/${id}`, requestBody);
  };

  // Deletes a specific comment by id
  deleteComment = (id) => {
    return this.api.delete(`/api/comments/${id}`);
  };

}

const commentsService = new CommentsService();

export default commentsService;
