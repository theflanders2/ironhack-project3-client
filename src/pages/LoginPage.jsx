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

  const pageContent = language === "en-US" ? englishContent.loginPage : germanContent.loginPage;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestBody = { email, password };
    // Create an object representing the request body
    try {
      const response = await authService.logIn(requestBody)
      storeToken(response.data.authToken);
      authenticateUser();
      navigate("/games");
    } catch(error) {
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    }
  };

  return (
    <div className="LoginPage">
      <h1>{pageContent[0]}</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">{pageContent[1]}:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          placeholder={pageContent[1]}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">{pageContent[2]}:</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          placeholder={pageContent[2]}
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className={`${theme}`} type="submit">{pageContent[3]}</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>{pageContent[4]}</p>
      <p>{pageContent[5]} <Link to={"/signup"}>{pageContent[6]}</Link></p>
    </div>
  );
}

export default Login;
