import React from 'react';

import history from '../../assets/images/history.svg';
import location from '../../assets/images/location.svg';
import './LocationAndHistoryButtons.scss';

interface SearchHistoryProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  searchHistory: string[];
  handleHistoryCityClick: (city: string) => void;
  locationSearch: () => void;
}

export const LocationAndHistoryButtons: React.FC<SearchHistoryProps> = ({
  searchHistory,
  isOpen,
  setIsOpen,
  locationSearch,
}) => {
  return (
    <section className="location-history">
      <div className="location-history__buttons">
        <button onClick={locationSearch} className="location-history__button">
          <img src={location} alt="" className="location-history__icon" />
        </button>

        {searchHistory.length > 0 ? (
          <button
            className={`location-history__button ${
              isOpen ? 'location-history__button--open' : ''
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <img
              src={history}
              alt="history"
              className="location-history__icon"
            />
          </button>
        ) : null}
      </div>
    </section>
  );
};
