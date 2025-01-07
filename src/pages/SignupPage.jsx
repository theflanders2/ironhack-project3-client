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

  // Map language to corresponding content dynamically
  const pageContent = language === "en-US" ? englishContent.signupPage : germanContent.signupPage;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { username, email, password };
    try {
      await authService.signUp(requestBody);
      navigate("/login");
    } catch (error) {
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    }
  };

  return (
    <div className="SignupPage">
      <h1>{pageContent[0]}</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">{pageContent[1]}:</label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          placeholder={pageContent[1]}
          required
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="email">{pageContent[2]}:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          placeholder={pageContent[2]}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">{pageContent[3]}:</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          placeholder={pageContent[3]}
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className={`${theme}`} type="submit">{pageContent[0]}</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>{pageContent[4]}</p>
      <Link to={"/login"}>
        {pageContent[5]}
      </Link>
    </div>
  );
}

export default SignupPage;
