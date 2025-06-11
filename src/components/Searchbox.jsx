import React from 'react';

export default function SearchBox({ query, setQuery, search }) {
  return (
    <div className="search-box">
      <input
        type="text"
        className="search-bar"
        placeholder="Search for a city..."
        onChange={e => setQuery(e.target.value)}
        value={query}
        onKeyPress={search}
      />
    </div>
  );
}
