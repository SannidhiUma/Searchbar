import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ data }) => {
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
  
    if (searchQuery.length > 0) {
      const filtered = data.filter(item => 
        (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.capital && item.capital.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  };
  

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search by country or capital..."
      />
      {filteredData.length > 0 && (
        <ul className="suggestions">
          {filteredData.map((item, index) => (
            <li key={index}>
              {item.name} - {item.capital}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;