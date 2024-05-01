import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";
import { LanguageContext } from "../context/language.context";

import englishContent from "../en-US.json";
import germanContent from "../de-DE.json";

function IsAnon( { children } ) {
  
  const { isLoggedIn, isLoading } = useContext(AuthContext);
  const { language } = useContext(LanguageContext);

  // If the authentication is still loading 
  if (isLoading) return <p>{language === "en-US" ? englishContent.isAnon[0] : germanContent.isAnon[0]}</p>;

  if (isLoggedIn) {
    // If the user is logged in, navigate to the home page     
    return <Navigate to="/" />;
  } else {
    // If the user is not logged in, allow to see the page 
    return children;
  }
}

export default IsAnon;
