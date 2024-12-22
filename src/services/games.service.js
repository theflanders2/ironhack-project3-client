import axios from "axios";

class GamesService {
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

  // Uploads cover art for game
  uploadCoverArt = (file) => {
    return this.api.post("/api/games/upload", file);
  };

  // Adds a new game
  addGame = (requestBody) => {
    return this.api.post("/api/games", requestBody);
  };

  // Retrieves all games
  getAllGames = () => {
    return this.api.get("/api/games");
  };

  // Retrieves latest games added to db
  getLatestTenGamesAdded = () => {
    return this.api.get("/");
  };

  // Retrieves a specific game by id
  getGame = (id) => {
    return this.api.get(`/api/games/${id}`);
  };

  // Updates a specific game by id
  updateGame = (id, requestBody) => {
    return this.api.put(`/api/games/${id}`, requestBody);
  };

  // Adds a specific game to user's gamesPlayed list using game's id
  addToGamesPlayedList = (id) => {
    return this.api.put(`/api/games/${id}/add-to-games-played`);
  };

  // Removes a specific game from user's gamesPlayed list using game's id
  removeFromGamesPlayedList = (id) => {
    return this.api.put(`/api/games/${id}/remove-from-games-played`);
  };

  // Adds a specific game to user's currentlyPlaying list using game's id
  addToGamesCurrentlyPlayingList = (id) => {
    return this.api.put(`/api/games/${id}/add-to-games-currently-playing`);
  };

  // Removes a specific game from user's currentlyPlaying list using game's id
  removeFromGamesCurrentlyPlayingList = (id) => {
    return this.api.put(`/api/games/${id}/remove-from-games-currently-playing`);
  };

  // Adds a specific game to user's wishlist using game's id
  addToWishlist = (id) => {
    return this.api.put(`/api/games/${id}/add-to-wishlist`);
  };

  // Removes a specific game from user's wishlist using game's id
  removeFromWishlist = (id) => {
    return this.api.put(`/api/games/${id}/remove-from-wishlist`);
  };
}

const gamesService = new GamesService();

export default gamesService;
