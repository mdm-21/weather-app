export interface Coord {
	lat: number;
	lon: number;
}

interface Main {
	feels_like: number;
	humidity: number;
	pressure: number;
	temp: number;
	temp_max: number;
	temp_min: number;
}

interface Weather {
	id: number;
	main: string;
	description: string;
	icon: string;
}

interface Sys {
	country: string;
	id: number;
	sunrise: number;
	sunset: number;
	type: number;
}

export interface WeatherData {
	base: string;
	clouds: { all: number };
	cod: number;
	coord: Coord;
	dt: number;
	id: number;
	main: Main;
	name: string;
	sys: Sys;
	timezone: number;
	visibility: number;
	weather: Weather[];
	wind: { deg: number; speed: number };
}