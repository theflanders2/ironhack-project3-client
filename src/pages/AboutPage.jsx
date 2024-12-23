import { useContext } from "react";
import { LanguageContext } from "../context/language.context";

import englishContent from "../en-US.json";
import germanContent from "../de-DE.json";

function AboutPage() {
  const { language } = useContext(LanguageContext);

  // Map language to corresponding content dynamically
  const content = language === "en-US" ? englishContent.aboutPage : germanContent.aboutPage;

  return (
    <div className="AboutPage">
      <h1>{content[0]}</h1>
      {content.slice(1).map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
}

export default AboutPage;
