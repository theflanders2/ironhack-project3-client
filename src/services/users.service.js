import axios from "axios";

class UsersService {
  constructor() {
    this.api = axios.create({
      baseURL:
        import.meta.env.VITE_DEPLOYMENT_SERVER_URL || "http://localhost:5005",
    });

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        config.headers.Authorization = `Bearer ${storedToken}`;
      }
      return config;
    });
  }

  // Retrieves a specific user by id
  getUser = (id) => {
    return this.api.get(`/api/users/${id}`);
  };

  //Updates a specific user by id
  updateUser = (id, requestBody) => {
    return this.api.put(`/api/users/${id}`, requestBody);
  };
}

const usersService = new UsersService();

export default usersService;
