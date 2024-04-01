import { createContext, useState } from "react";

const ThemeContext = createContext();

function ThemeProviderWrapper(props) {
  const [theme, setTheme] = useState("Default-Theme");

  const toggleTheme = () => {
    if (theme === "Default-Theme") {
      setTheme("CottonCandy-Theme");
    }
    else {
      setTheme("Default-Theme");
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeProviderWrapper };
