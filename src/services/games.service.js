import axios from "axios";

class GamesService {
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

  /*-----UPLOAD COVER ART-----*/
  // POST /api/games/upload  -  Uploads cover art for game
  uploadCoverArt = (file) => {
    return this.api.post("/api/games/upload", file);
  };

  /*-----ADD NEW GAME-----*/
  // POST /api/games  -  Adds a new game
  addGame = (requestBody) => {
    return this.api.post("/api/games", requestBody);
  };

  /*-----GET ALL GAMES-----*/
  // GET /api/games -  Retrieves all games
  getAllGames = () => {
    // same as
    // return axios.get("http://localhost:5005/api/games);
    return this.api.get("/api/games");
  };

  /*-----GET SINGLE GAME-----*/
  // GET /api/games/:gameId -  Retrieves a specific game by id
  getGame = (id) => {
    // same as
    // return axios.get("http://localhost:5005/api/games/:gameId);
    return this.api.get(`/api/games/${id}`);
  };

  /*-----EDIT EXISTING GAME-----*/
  // PUT /api/games/:gameId -  Updates a specific game by id
  updateGame = (id, requestBody) => {
    return this.api.put(`/api/games/${id}`, requestBody);
  };

  /*-----DELETE GAME FROM DATABASE AND REMOVE FROM USER'S GAMES CONTRIBUTED LIST-----*/
  // DELETE /api/games/:gameId  -  Deletes a specific game by id
  deleteGame = (id) => {
    return this.api.delete(`/api/games/${id}`);
  };
}

const gamesService = new GamesService();

export default gamesService;
