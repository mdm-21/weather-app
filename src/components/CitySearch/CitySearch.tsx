import React, { ChangeEvent } from 'react';
import searchIcon from '../../assets/images/search.svg';

import './CitySearch.scss';

interface CitySearchProps {
  city: string;
  setCity: (city: string) => void;
  handleSearch: () => void;
}

export const CitySearch: React.FC<CitySearchProps> = ({
  city,
  setCity,
  handleSearch,
}) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleSearch();
  };

  return (
    <form className="city-search" onSubmit={handleSubmit} aria-label="Search">
      <input
        type="text"
        id="cityName"
        className="city-search__input"
        placeholder="Search for city"
        value={city}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setCity(event.target.value)
        }
      />
      <button type="submit" className="city-search__button">
        <img src={searchIcon} alt="Search" className="city-search__icon" />
      </button>
    </form>
  );
};
