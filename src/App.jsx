import "./App.css";
import { Routes, Route } from "react-router-dom";
 
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import GamesListPage from "./pages/GamesListPage";
import GameDetailsPage from "./pages/GameDetailsPage";
import EditGamePage from "./pages/EditGamePage";
 
function App() {
  return (
    <div className="App">
      <Navbar />
 
      <Routes>      
        <Route path="/" element={ <HomePage /> } />
        <Route path="/signup" element={ <SignupPage /> } />
        <Route path="/login" element={ <LoginPage /> } />
        <Route path="/profile" element={ <ProfilePage /> } />
        <Route path="/games" element={ <GamesListPage /> } />
        <Route path="/games/:gameId" element={ <GameDetailsPage /> } />
        <Route path="/games/edit/:gameId" element={ <EditGamePage /> } />
      </Routes>
      
    </div>
  );
}
 
export default App;