import React, { ChangeEvent, useCallback } from 'react';
import searchIcon from '../../assets/images/search.svg';
import { ICitySearch } from './ICitySearch.ts';

import './CitySearch.scss';

export const CitySearch: React.FC<ICitySearch> = ({
	city,
	setCity,
	handleSearch,
}) => {
	const handleChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			setCity(event.target.value);
		},
		[setCity],
	);

	const handleSubmit = useCallback(
		(event: React.FormEvent) => {
			event.preventDefault();
			handleSearch();
		},
		[handleSearch],
	);

	return (
		<form className='city-search' onSubmit={handleSubmit} aria-label='Search'>
			<input
				type='text'
				id='cityName'
				className='city-search__input'
				placeholder='Search for city'
				value={city}
				onChange={handleChange}
			/>
			<button type='submit' className='city-search__button'>
				<img src={searchIcon} alt='Search' className='city-search__icon' />
			</button>
		</form>
	);
};
