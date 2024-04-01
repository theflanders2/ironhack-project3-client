import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { LanguageContext } from "../context/language.context";
import { AuthContext } from "../context/auth.context";
import { ThemeContext } from "../context/theme.context";

import englishContent from "../en-US.json";
import germanContent from "../de-DE.json";

function Navbar() {
  const { language, toggleLanguage } = useContext(LanguageContext);
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className={`Navbar ${theme}`}>
      <div className="Logo">
        <NavLink className={`nav-title ${theme}`} to="/">Gameodex</NavLink>
      </div>

      <div className="nav-menu">
      {isLoggedIn && (
        <>
          <NavLink to={`/profile/${user._id}`}>
            <button className={`${theme}`}>
              {language === "en-US" ? englishContent.navBar[3] : germanContent.navBar[3]}
            </button>
          </NavLink>

          <NavLink to="/games">
            <button className={`${theme}`}>
              {language === "en-US" ? englishContent.navBar[4] : germanContent.navBar[4]}
            </button>
          </NavLink>
          {/* <span>Logged in as {user.username}</span> */}
          <button className={`${theme}`} onClick={logOutUser}>
            {language === "en-US" ? englishContent.navBar[5] : germanContent.navBar[5]}{" "}
            {user.username}
          </button>
        </>
      )}

      {!isLoggedIn && (
        <>
          <NavLink to="/signup">
            <button className={`${theme}`}>
              {language === "en-US" ? englishContent.navBar[1] : germanContent.navBar[1]}
            </button>
          </NavLink>

          <NavLink to="/login">
            <button className={`${theme}`}>
              {language === "en-US" ? englishContent.navBar[2] : germanContent.navBar[2]}
            </button>
          </NavLink>
        </>
      )}
      <NavLink to="/about">
        <button className={`${theme}`}>{language === "en-US" ? englishContent.navBar[6] : germanContent.navBar[6]}</button>
      </NavLink>
      <select name="" id="" onChange={toggleTheme}>
        <option>Default-Theme</option>
        <option>CottonCandy-Theme</option>
      </select>

      {/* <select name="" id="" onChange={toggleLanguage}>
        <option value="en-US">English</option>
        <option value="de-DE">Deutsch</option>
      </select> */}
      </div>
    </nav>
  );
}

export default Navbar;
