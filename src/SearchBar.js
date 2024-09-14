import React, { useState, useEffect } from 'react';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [countries, setCountries] = useState([]);

  // Fetch data from the public directory
  useEffect(() => {
    fetch('/countries.json')
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Handle input change and filter suggestions
  const handleInputChange = (e) => {
    const input = e.target.value.toLowerCase(); // Ensure input is lowercase
    setQuery(input);

    if (input.length > 0) {
      const filteredSuggestions = countries.filter(
        (country) =>
          country.country.toLowerCase().includes(input) || // Use includes to match any part of the string
          country.capital.toLowerCase().includes(input)
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search by country or capital..."
        value={query}
        onChange={handleInputChange}
        className="search-input"
      />
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((country, index) => (
            <li key={index} className="suggestion-item">
              <strong>{country.country}</strong> - {country.capital}
              <br />
              Population: {country.population.toLocaleString()}
              <br />
              Official Language(s): {Array.isArray(country.official_language)
                ? country.official_language.join(', ')
                : country.official_language}
              <br />
              Currency: {country.currency}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
