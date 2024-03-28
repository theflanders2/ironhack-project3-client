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

  /*-----GET LATEST 10 GAMES ADDED-----*/
  // GET /api/ -  Retrieves latest 10 games added to db
  getLatestTenGamesAdded = () => {
    return this.api.get("/");
  };

  /*-----GET SINGLE GAME-----*/
  // GET /api/games/:gameId -  Retrieves a specific game by id
  getGame = (id) => {
    // same as
    // return axios.get("http://localhost:5005/api/games/:gameId);
    return this.api.get(`/api/games/${id}`);
  };

  /*-----EDIT GAME-----*/
  // PUT /api/games/:gameId -  Updates a specific game by id
  updateGame = (id, requestBody) => {
    return this.api.put(`/api/games/${id}`, requestBody);
  };

  /*-----DELETE GAME FROM DATABASE AND REMOVE FROM USER'S GAMES CONTRIBUTED LIST-----*/
  // DELETE /api/games/:gameId  -  Deletes a specific game by id
  // deleteGame = (id) => {
  //   return this.api.delete(`/api/games/${id}`);
  // };
  
  /*-----ADD GAME TO GAMES PLAYED LIST-----*/
  // PUT /api/games/:gameId/add-to-games-played
  // Adds a specific game to user's gamesPlayed list using game's id
  addToGamesPlayedList = (id) => {
    return this.api.put(`/api/games/${id}/add-to-games-played`);
  };

  /*-----REMOVE GAME FROM GAMES PLAYED LIST-----*/
  // PUT /api/games/:gameId/remove-from-games-played
  // Removes a specific game from user's gamesPlayed list using game's id
  removeFromGamesPlayedList = (id) => {
    return this.api.put(`/api/games/${id}/remove-from-games-played`);
  };

  /*-----ADD GAME TO CURRENTLY PLAYING LIST-----*/
  // PUT /api/games/:gameId/add-to-games-currently-playing
  // Adds a specific game to user's currentlyPlaying list using game's id
  addToGamesCurrentlyPlayingList = (id) => {
    return this.api.put(`/api/games/${id}/add-to-games-currently-playing`);
  };

  /*-----REMOVE GAME FROM GAMES PLAYED LIST-----*/
  // PUT /api/games/:gameId/remove-from-games-currently-playing
  // Removes a specific game from user's currentlyPlaying list using game's id
  removeFromGamesCurrentlyPlayingList = (id) => {
    return this.api.put(`/api/games/${id}/remove-from-games-currently-playing`);
  };

  /*-----ADD GAME TO WISHLIST-----*/
  // PUT /api/games/:gameId/add-to-wishlist
  // Adds a specific game to user's wishlist using game's id
  addToWishlist = (id) => {
    return this.api.put(`/api/games/${id}/add-to-wishlist`);
  };

  /*-----REMOVE GAME FROM WISHLIST-----*/
  // PUT /api/games/:gameId/remove-from-games-currently-playing
  // Removes a specific game from user's wishlist using game's id
  removeFromWishlist = (id) => {
    return this.api.put(`/api/games/${id}/remove-from-wishlist`);
  };

}

const gamesService = new GamesService();

export default gamesService;
