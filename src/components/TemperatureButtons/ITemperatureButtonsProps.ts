import { TemperatureUnits } from '../../types/TemperatureUnits.ts';

export interface ITemperatureButtonsProps {
	unitsType: TemperatureUnits;
	handleTemperatureUnitChange: (unitType: TemperatureUnits) => void;
	city: string;
}
