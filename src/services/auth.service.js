import axios from "axios";

class AuthService {
  #api; // use as private class field to ensure it can't be accessed outside class

  constructor() {
    this.#api = axios.create({
      baseURL: import.meta.env.VITE_DEPLOYMENT_SERVER_URL || "http://localhost:5005",
    });
    
    this.#api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        config.headers.Authorization = `Bearer ${storedToken}`;
      }
      return config;
    });
  }

  async signUp(requestBody) {
    return this.#api.post("/auth/signup", requestBody);
  }

  async logIn(requestBody) {
    return this.#api.post("/auth/login", requestBody);
  }

  async verifyToken() {
    return this.#api.get("/auth/verify");
  }
}

const authService = new AuthService();

export default authService;
