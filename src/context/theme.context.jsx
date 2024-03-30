import { createContext, useState } from "react";

const ThemeContext = createContext();

function ThemeProviderWrapper(props) {
  const [theme, setTheme] = useState("Default");

  const toggleTheme = () => {
    if (theme === "Default") {
      setTheme("CottonCandy");
    } else {
      setTheme("Default");
    }
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeProviderWrapper };
