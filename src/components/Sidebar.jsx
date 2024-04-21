import { useContext } from 'react';
import { NavLink } from "react-router-dom";
import { stack as BurgerMenu } from 'react-burger-menu';
import { LanguageContext } from "../context/language.context";
import { AuthContext } from "../context/auth.context";
import { ThemeContext } from "../context/theme.context";
import { BurgerMenuContext } from '../context/burgerMenu.context';

import englishContent from "../en-US.json";
import germanContent from "../de-DE.json";

const Sidebar = () => {
  const { language, toggleLanguage } = useContext(LanguageContext);
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const { theme, selectTheme } = useContext(ThemeContext);
  const { isMenuOpen, toggleMenu, stateChangeHandler } = useContext(BurgerMenuContext);

  return (
    <BurgerMenu isOpen={isMenuOpen}
      onStateChange={(state) => stateChangeHandler(state)}
      >
      <div className={`burger-nav-menu`}>
      {isLoggedIn && (
        <>
          <NavLink to={`/profile/${user._id}`}>
            <button onClick={toggleMenu} className={`${theme}`}>
              {language === "en-US" ? englishContent.navBar[3] : germanContent.navBar[3]}
            </button>
          </NavLink>

          <NavLink to="/games">
            <button onClick={toggleMenu} className={`${theme}`}>
              {language === "en-US" ? englishContent.navBar[4] : germanContent.navBar[4]}
            </button>
          </NavLink>
          {/* <span>Logged in as {user.username}</span> */}
          <button className={`${theme}`} onClick={() => { logOutUser(); toggleMenu(); }}>
            {language === "en-US" ? englishContent.navBar[5] : germanContent.navBar[5]}
          </button>
        </>
      )}

      {!isLoggedIn && (
        <>
          <NavLink to="/signup">
            <button onClick={toggleMenu} className={`${theme}`}>
              {language === "en-US" ? englishContent.navBar[1] : germanContent.navBar[1]}
            </button>
          </NavLink>

          <NavLink to="/login">
            <button onClick={toggleMenu} className={`${theme}`}>
              {language === "en-US" ? englishContent.navBar[2] : germanContent.navBar[2]}
            </button>
          </NavLink>
        </>
      )}
      <NavLink to="/about">
        <button onClick={toggleMenu} className={`${theme}`}>{language === "en-US" ? englishContent.navBar[6] : germanContent.navBar[6]}</button>
      </NavLink>
      
      <select onChange={(e) => selectTheme(e.target.value)} value={theme}>
        <option value="Default-Theme">Default-Theme</option>
        <option value="CottonCandy-Theme">CottonCandy-Theme</option>
        <option value="FadedForest-Theme">FadedForest-Theme</option>
        <option value="MunichRavens-Theme">MunichRavens-Theme</option>
      </select>

      <select name="" id="" onChange={toggleLanguage}>
        <option value="en-US">English</option>
        <option value="de-DE">Deutsch</option>
      </select>
      </div>
    </BurgerMenu>
  );
};

export default Sidebar;