import { ThemeContext } from "../context/theme.context";
import { useContext } from "react";
import { LanguageContext } from "../context/language.context";

import englishContent from "../en-US.json";
import germanContent from "../de-DE.json";

function Footer() {
  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

  return (
    <footer className={`Footer ${theme}`}>
      <ul>
        <li>
          <p className={`svgrepo-link ${theme}`}>
          {language === "en-US" ? englishContent.footer[0] : germanContent.footer[0]} <a href="https://www.svgrepo.com" target="_blank">SVG Repo</a>
          </p>
        </li>
        <li>
          <p className="Footer-Title">2024 Gameodex</p>
        </li>
        <li>
          <p className={`theflanders-link ${theme}`}>
          {language === "en-US" ? englishContent.footer[1] : germanContent.footer[1]} <a href="https://github.com/theflanders2" target="blank">Kenneth Flanders</a>
          </p>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
