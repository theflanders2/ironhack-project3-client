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
  const { language, selectLanguage } = useContext(LanguageContext);
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const { theme, selectTheme } = useContext(ThemeContext);
  const { isMenuOpen, toggleMenu, stateChangeHandler } = useContext(BurgerMenuContext);

  // Map language to corresponding content dynamically
  const pageContent = language === "en-US" ? englishContent.navBar : germanContent.navBar;

  return (
    <BurgerMenu
      isOpen={isMenuOpen}
      onStateChange={(state) => stateChangeHandler(state)}
      >
      <div className={`burger-nav-menu`}>
      <NavLink to="/">
        <button onClick={toggleMenu} className={`${theme}`}>{pageContent[0]}</button>
      </NavLink>
      
      {isLoggedIn && (
        <>
          <NavLink to={`/profile/${user._id}`}>
            <button onClick={toggleMenu} className={`${theme}`}>{pageContent[3]}</button>
          </NavLink>

          <NavLink to="/games">
            <button onClick={toggleMenu} className={`${theme}`}>{pageContent[4]}</button>
          </NavLink>
          <button className={`${theme}`} onClick={() => { logOutUser(); toggleMenu(); }}>{pageContent[5]}</button>
        </>
      )}

      {!isLoggedIn && (
        <>
          <NavLink to="/signup">
            <button onClick={toggleMenu} className={`${theme}`}>{pageContent[1]}</button>
          </NavLink>

          <NavLink to="/login">
            <button onClick={toggleMenu} className={`${theme}`}>{pageContent[2]}</button>
          </NavLink>
        </>
      )}

      <NavLink to="/about">
        <button onClick={toggleMenu} className={`${theme}`}>{pageContent[6]}</button>
      </NavLink>
      
      <select onChange={(e) => selectTheme(e.target.value)} value={theme}>
        <option value="Default-Theme">Default-Theme</option>
        <option value="CottonCandy-Theme">CottonCandy-Theme</option>
        <option value="FadedForest-Theme">FadedForest-Theme</option>
        <option value="MunichRavens-Theme">MunichRavens-Theme</option>
      </select>

      <select onChange={(e) => selectLanguage(e.target.value)} value={language}>
        <option value="en-US">English</option>
        <option value="de-DE">Deutsch</option>
      </select>
      </div>
    </BurgerMenu>
  );
};

export default Sidebar;