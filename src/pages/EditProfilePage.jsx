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

  useEffect(() => {
    usersService.getUser(userId)
      .then((foundUser) => {
        // Update the state with the game data coming from the response.
        // This way the inputs show the actual current details of the game
        setEmail(foundUser.data.user.email);
      })
      .catch((error) => console.log(error));
  }, [userId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email };

    // Make an axios PUT request to the API to update game
    usersService.updateUser(userId, requestBody)
      .then(() => navigate(`/profile/${userId}`));
    // Once the request is resolved successfully and the game's details
    // are updated, navigate back to the details page
  };

  return (
    <div className="EditProfilePage">
      <h3>
        {language === "en-US" ? englishContent.editProfilePage[0] : germanContent.editProfilePage[0]}
      </h3>
      <Link to={`/profile/${userId}`}>
        <button className={`${theme}`}>
          {language === "en-US" ? englishContent.editProfilePage[1] : germanContent.editProfilePage[1]}
        </button>
      </Link>

      <form onSubmit={handleSubmit}>
        <label>
          {language === "en-US" ? englishContent.editProfilePage[2] : germanContent.editProfilePage[2]}:
        </label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className={`${theme}`} type="submit">
          {language === "en-US" ? englishContent.editProfilePage[3] : germanContent.editProfilePage[3]}
        </button>
      </form>
    </div>
  );
}

export default EditProfilePage;
