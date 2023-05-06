import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch}>
      <label htmlFor="search">Search:</label>
      <input
        type="text"
        id="search"
        value={query}
        onChange={handleQueryChange}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
