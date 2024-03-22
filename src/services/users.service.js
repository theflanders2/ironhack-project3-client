import axios from "axios";

class UsersService {
  constructor() {
    // Create a new instance of axios with a custom configuration
    this.api = axios.create({
      baseURL:
        import.meta.env.VITE_DEPLOYMENT_SERVER_URL || "http://localhost:5005",
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

  /*-----FIND USER-----*/
  // GET /api/users/:userId -  Retrieves a specific user by id
  getUser = (id) => {
    // same as
    // return axios.get("http://localhost:5005/api/games/:gameId);
    return this.api.get(`/api/users/${id}`);
  };

  /*-----UPDATE USER-----*/
  // PUT /api/users/:userId  -  Updates a specific user by id
  updateUser = (id, requestBody) => {
    return this.api.put(`/api/users/${id}`, requestBody);
  };
}

const usersService = new UsersService();

export default usersService;
