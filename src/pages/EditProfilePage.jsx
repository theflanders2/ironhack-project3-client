import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import usersService from "../services/users.service";
import { ThemeContext } from "../context/theme.context";
import { LanguageContext } from "../context/language.context";

import englishContent from "../en-US.json";
import germanContent from "../de-DE.json";

function EditProfilePage() {
  const [email, setEmail] = useState("");

  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

  const { userId } = useParams();
  const navigate = useNavigate();

  const pageContent = language === "en-US" ? englishContent.editCommentPage : germanContent.editCommentPage;

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const foundUser = await usersService.getUser(userId);
        setEmail(foundUser.data.user.email);
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [userId]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestBody = { email }; // Create an object representing the request body
    try {
      await usersService.updateUser(userId, requestBody)
      navigate(`/profile/${userId}`);
    } catch (error) {
      console.log("Error updating user profile:", error);
    }
  };

  return (
    <div className="EditProfilePage">
      <h3>{pageContent[0]}</h3>
      <Link to={`/profile/${userId}`}>
        <button className={`${theme}`}>{pageContent[1]}</button>
      </Link>

      <form onSubmit={handleSubmit}>
        <label>{pageContent[2]}:</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className={`${theme}`} type="submit">{pageContent[3]}</button>
      </form>
    </div>
  );
}

export default EditProfilePage;
