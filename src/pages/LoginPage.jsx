import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import authService from "../services/auth.service";
import { ThemeContext } from "../context/theme.context";
import { LanguageContext } from "../context/language.context";

import englishContent from "../en-US.json";
import germanContent from "../de-DE.json";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { theme } = useContext(ThemeContext);
  const { storeToken, authenticateUser } = useContext(AuthContext);
  const { language } = useContext(LanguageContext);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    authService.logIn(requestBody)
      .then((response) => {
        // Request to the server's endpoint `/auth/login` returns a response
        // with the JWT string ->  response.data.authToken
        storeToken(response.data.authToken); // this will store the token in localStorage
      })
      .then(() => {
        authenticateUser(); // update the auth state variables accordingly
        navigate("/games");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="LoginPage">
      <h1>
        {language === "en-US" ? englishContent.loginPage[0] : germanContent.loginPage[0]}
      </h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          {language === "en-US" ? englishContent.loginPage[1] : germanContent.loginPage[1]}:
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          placeholder={language === "en-US" ? englishContent.loginPage[1] : germanContent.loginPage[1]}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">
          {language === "en-US" ? englishContent.loginPage[2] : germanContent.loginPage[2]}:
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          placeholder={language === "en-US" ? englishContent.loginPage[2] : germanContent.loginPage[2]}
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className={`${theme}`} type="submit">
          {language === "en-US" ? englishContent.loginPage[3] : germanContent.loginPage[3]}
        </button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>{language === "en-US" ? englishContent.loginPage[4] : germanContent.loginPage[4]}</p>
      <p>{language === "en-US" ? englishContent.loginPage[5] : germanContent.loginPage[5]} <Link to={"/signup"}>{language === "en-US" ? englishContent.loginPage[6] : germanContent.loginPage[6]}</Link></p>
    </div>
  );
}

export default Login;
