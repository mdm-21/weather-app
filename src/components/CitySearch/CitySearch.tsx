import React, {ChangeEvent, KeyboardEvent} from 'react';
import searchIcon from "../../assets/images/search.svg";

import "./CitySearch.scss";

interface CitySearchProps {
	city: string;
	setCity: (city: string) => void;
	handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
	handleSearch: () => void;
}

export const CitySearch: React.FC<CitySearchProps> = ({ city, setCity, handleKeyDown, handleSearch }) => {
	// const [emptyInput, setEmptyInput] = useState<boolean>(false)
	//
	// useEffect(() => {
	// 	if (city === ' ') {
	// 		setEmptyInput(true)
	// 	}
	// }, [city]);

	return (
		<div className="city-search">
			<input
				type="text"
				// className={`city-search__input ${emptyInput && 'b'}`}
				className="city-search__input"
				placeholder="Search for city"
				value={city}
				onChange={(event: ChangeEvent<HTMLInputElement>) => setCity(event.target.value)}
				onKeyDown={handleKeyDown}
			/>
			<button className="city-search__button" onClick={handleSearch}>
				<img src={searchIcon} alt="Search" className="city-search__icon" />
			</button>
		</div>
	);
};
