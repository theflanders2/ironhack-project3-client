import { useContext } from "react";
import { LanguageContext } from "../context/language.context";

import englishContent from "../en-US.json";
import germanContent from "../de-DE.json";

function AboutPage() {
  const { language } = useContext(LanguageContext);

  return (
    <div className="AboutPage">
      <h1>
        {language === "en-US" ? englishContent.aboutPage[0] : germanContent.aboutPage[0]}
      </h1>
      <p>
        {language === "en-US" ? englishContent.aboutPage[1] : germanContent.aboutPage[1]}
      </p>
      <p>
        {language === "en-US" ? englishContent.aboutPage[2] : germanContent.aboutPage[2]}
      </p>
      <p>
        {language === "en-US" ? englishContent.aboutPage[3] : germanContent.aboutPage[3]}
      </p>
    </div>
  );
}

export default AboutPage;
