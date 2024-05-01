import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import { ThemeContext } from "../context/theme.context";
import { LanguageContext } from "../context/language.context";

import englishContent from "../en-US.json";
import germanContent from "../de-DE.json";

function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { username, email, password };

    // Make an axios request to the API
    // If the POST request is a successful redirect to the login page
    // If the request resolves with an error, set the error message in the state
    authService.signUp(requestBody)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="SignupPage">
      <h1>
        {language === "en-US" ? englishContent.signupPage[0] : germanContent.signupPage[0]}
      </h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          {language === "en-US" ? englishContent.signupPage[1] : germanContent.signupPage[1]}:
        </label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          placeholder={language === "en-US" ? englishContent.signupPage[1] : germanContent.signupPage[1]}
          required
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="email">
          {language === "en-US" ? englishContent.signupPage[2] : germanContent.signupPage[2]}:
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          placeholder={language === "en-US" ? englishContent.signupPage[2] : germanContent.signupPage[2]}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">
          {language === "en-US" ? englishContent.signupPage[3] : germanContent.signupPage[3]}:
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          placeholder={language === "en-US" ? englishContent.signupPage[3] : germanContent.signupPage[3]}
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className={`${theme}`} type="submit">
          {language === "en-US" ? englishContent.signupPage[0] : germanContent.signupPage[0]}
        </button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>{language === "en-US" ? englishContent.signupPage[4] : germanContent.signupPage[4]}</p>
      <Link to={"/login"}>
        {language === "en-US" ? englishContent.signupPage[5] : germanContent.signupPage[5]}
      </Link>
    </div>
  );
}

export default SignupPage;
