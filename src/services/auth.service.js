import axios from "axios";

class AuthService {
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

  signUp = (requestBody) => {
    // same as
    // return axios.post("http://localhost:5005/auth/signup");
    return this.api.post("/auth/signup", requestBody);
  };

  logIn = (requestBody) => {
    // same as
    // return axios.post("http://localhost:5005/auth/login");
    return this.api.post("/auth/login", requestBody);
  };

  verifyToken = () => {
    // same as
    // return axios.get("http://localhost:5005/auth/verify");
    return this.api.get("/auth/verify");
  };
}

const authService = new AuthService();

export default authService;
