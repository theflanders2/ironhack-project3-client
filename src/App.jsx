import "./App.css";
import { Routes, Route } from "react-router-dom";
 
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import UserDetailsPage from "./pages/UserDetailsPage";
import GamesListPage from "./pages/GamesListPage";
import GameDetailsPage from "./pages/GameDetailsPage";
import EditGamePage from "./pages/EditGamePage";
import EditCommentPage from "./pages/EditCommentPage";
 
function App() {
  return (
    <div className="App">
      <Navbar />
 
      <Routes>      
        <Route path="/" element={ <HomePage /> } />
        <Route path="/about" element={ <AboutPage /> } />
        <Route path="/signup" element={ <IsAnon><SignupPage /></IsAnon> } />
        <Route path="/login" element={ <IsAnon><LoginPage /></IsAnon> } />
        <Route path="/profile/:userId" element={ <IsPrivate><ProfilePage /></IsPrivate> } />
        <Route path="/profile/edit/:userId" element={ <IsPrivate><EditProfilePage /></IsPrivate> } />
        <Route path="/users/:userId" element={ <IsPrivate><UserDetailsPage /></IsPrivate> } />
        <Route path="/games" element={ <IsPrivate><GamesListPage /></IsPrivate> } />
        <Route path="/games/:gameId" element={ <IsPrivate><GameDetailsPage /></IsPrivate> } />
        <Route path="/games/edit/:gameId" element={ <IsPrivate><EditGamePage /></IsPrivate> } />
        <Route path="/comments/edit/:commentId" element={ <IsPrivate><EditCommentPage /></IsPrivate> } />
      </Routes>

      <Footer />
    </div>
  );
}
 
export default App;