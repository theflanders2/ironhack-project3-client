import { createContext, useState } from "react";

const LanguageContext = createContext();

function LanguageProviderWrapper(props) {
  const [language, setLanguage] = useState("en-US");
  
  const selectLanguage = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, selectLanguage }}>
      {props.children}
    </LanguageContext.Provider>
  );
}

export { LanguageContext, LanguageProviderWrapper };
