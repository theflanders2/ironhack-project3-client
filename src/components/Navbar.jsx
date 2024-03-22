import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/theme.context";
import { LanguageContext } from "../context/language.context";
import { AuthContext } from "../context/auth.context";

import englishContent from "../en-US.json";
import germanContent from "../de-DE.json";

function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { language, toggleLanguage } = useContext(LanguageContext);
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav className={`Navbar ${theme}`}>
      <NavLink to="/">
        <button>
          {language === "en-US"
            ? englishContent.navBar[0]
            : germanContent.navBar[0]}
        </button>
      </NavLink>

      {isLoggedIn && (
        <>
          <NavLink to={`/profile/${user._id}`}>
            <button>
              {language === "en-US"
                ? englishContent.navBar[3]
                : germanContent.navBar[3]}
            </button>
          </NavLink>

          <NavLink to="/games">
            <button>
              {language === "en-US"
                ? englishContent.navBar[4]
                : germanContent.navBar[4]}
            </button>
          </NavLink>
          {/* <span>Logged in as {user.username}</span> */}
          <button onClick={logOutUser}>Log Out {user.username}</button>
        </>
      )}

      {!isLoggedIn && (
        <>
          <NavLink to="/signup">
            <button>
              {language === "en-US"
                ? englishContent.navBar[1]
                : germanContent.navBar[1]}
            </button>
          </NavLink>

          <NavLink to="/login">
            <button>
              {language === "en-US"
                ? englishContent.navBar[2]
                : germanContent.navBar[2]}
            </button>
          </NavLink>
        </>
      )}

      <button className="theme-btn" onClick={toggleTheme}>
        {theme === "light" ? "dark " : "light "}
      </button>
      <select name="" id="" onChange={toggleLanguage}>
        <option value="en-US">English</option>
        <option value="de-DE">Deutsch</option>
      </select>
    </nav>
  );
}

export default Navbar;
