import { createContext, useState } from "react";

const LanguageContext = createContext();

function LanguageProviderWrapper(props) {
  const [language, setLanguage] = useState("en-US");

  const toggleLanguage = () => {
    if (language === "en-US") {
      setLanguage("de-DE");
    } else {
      setLanguage("en-US");
    }
  };
  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {props.children}
    </LanguageContext.Provider>
  );
}

export { LanguageContext, LanguageProviderWrapper };
