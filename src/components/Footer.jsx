import { ThemeContext } from "../context/theme.context";
import { useContext } from "react";

function Footer() {
  const { theme } = useContext(ThemeContext);

  return (
    <footer className={`Footer ${theme}`}>
      <ul>
        <li>
          <p className={`svgrepo-link ${theme}`}>Vectors and icons by <a href="https://www.svgrepo.com" target="_blank">SVG Repo</a></p>
        </li>
        <li>
          <p>2024 Gameodex</p>
        </li>
        <li>
          <p className={`theflanders-link ${theme}`}>Built and designed by <a href="https://github.com/theflanders2" target="blank">Kenneth Flanders</a></p>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
