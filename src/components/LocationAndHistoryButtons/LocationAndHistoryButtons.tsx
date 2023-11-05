import React, {useState} from 'react';

import history from "../../assets/images/history.svg"
import location from "../../assets/images/location.svg";
import "./LocationAndHistoryButtons.scss";

interface SearchHistoryProps {
  searchHistory: string[];
  handleHistoryCityClick: (city: string) => void;
  locationSearch: () => void
}

export const LocationAndHistoryButtons: React.FC<SearchHistoryProps> = ({ searchHistory, handleHistoryCityClick, locationSearch }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="location-history">
      <div className="location-history__buttons">
        <button onClick={locationSearch} className="location-history__button">
          <img
            src={location}
            alt=""
            className="location-history__icon"
          />
        </button>

        <button
          className="location-history__button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <img
            src={history}
            alt="history"
            className="location-history__icon"
          />
        </button>
      </div>
      {isOpen ? (
        <ul className="location-history__list">
          {searchHistory.map((searchedCity, index) => (
            <li
              key={index}
              onClick={() => handleHistoryCityClick(searchedCity)}
              className="location-history__item"
            >
              {searchedCity}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
