import { createContext, useState } from "react";

const ThemeContext = createContext();

function ThemeProviderWrapper(props) {
  const [theme, setTheme] = useState("Default-Theme");

  const selectTheme = (selectedTheme) => {
    setTheme(selectedTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, selectTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeProviderWrapper };
