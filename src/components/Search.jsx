const Search = ({ searchInput, setSearchInput }) => {
  return (
    <div>
      <input
        type="text"
        name="query"
        placeholder="Search..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
    </div>
  );
};

export default Search;
