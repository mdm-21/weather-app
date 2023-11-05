import { ICurrentWeather } from "../../types/ICurrentWeather.ts";
import { weatherDetails } from "../../utils/weatherDetails.ts";

import "./WeatherDetails.scss";

export const WeatherDetails = ({ weatherData, unitsType }: ICurrentWeather) => {
	const details = weatherDetails(weatherData, unitsType);

	return (
		<div className="weather-details">
			{details.map((detail, index) => (
				<div className="weather-details__item" key={index}>
					<div className="weather-details__left">
						<span className="weather-details__item--name">{detail.label}</span>
						<span className="weather-details__item--value">{detail.value}</span>
					</div>

					<img
						src={detail.icon}
						alt="weather-icon"
						className="weather-details__item--icon"
					/>
				</div>
			))}
		</div>
	);
};
