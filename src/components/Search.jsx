import { useContext } from "react";

import { LanguageContext } from "../context/language.context";

import englishContent from "../en-US.json";
import germanContent from "../de-DE.json";

const Search = ({ searchInput, setSearchInput }) => {
  const { language } = useContext(LanguageContext);

  return (
    <div className="Search">
      <input
        type="text"
        name="query"
        placeholder={language === "en-US" ? englishContent.search[0] : germanContent.search[0]}
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
    </div>
  );
};

export default Search;
