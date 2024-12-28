import { useContext } from "react";

import { LanguageContext } from "../context/language.context";

import englishContent from "../en-US.json";
import germanContent from "../de-DE.json";

function Search ({ searchInput, setSearchInput }) {
  const { language } = useContext(LanguageContext);

  const pageContent = language === "en-US" ? englishContent.search : germanContent.search;

  return (
    <div className="Search">
      <input
        type="text"
        name="query"
        placeholder={pageContent[0]}
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
    </div>
  );
}

export default Search;
