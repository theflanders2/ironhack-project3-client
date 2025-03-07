import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";
import { LanguageContext } from "../context/language.context";

import englishContent from "../en-US.json";
import germanContent from "../de-DE.json";

function IsPrivate( { children } ) {
  
  const { isLoggedIn, isLoading } = useContext(AuthContext);
  const { language } = useContext(LanguageContext);

  // Map language to corresponding content dynamically
  const pageContent = language === "en-US" ? englishContent.isPrivate : germanContent.isPrivate;

  // If the authentication is still loading 
  if (isLoading) return <p>{pageContent[0]}</p>;

  if (!isLoggedIn) {
  // If the user is not logged in 
    return <Navigate to="/login" />;
  } else {
  // If the user is logged in, allow to see the page 
    return children;
  }
}

export default IsPrivate;
