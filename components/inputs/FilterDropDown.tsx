import React, { useState } from 'react';
import { View } from 'react-native';

enum Elements {
	CONSOMMATION,
	DISTANCE,
	DATE,
	HEURE,
	ECART_TEMPS,
}

type Filter = { [key: string]: boolean };

const FilterDropdown = () => {
	const [selectedFilter, setSelectedFilter] = useState<Elements | null>(null);
	const [filters, setFilters] = useState<Filter>({
		CONSOMMATION: false,
		DISTANCE: false,
		DATE: false,
		HEURE: false,
		ECART_TEMPS: false,
	});

	return (
		<View>
			{/*Boutton qui ouvre une modal au centre de l'écran, cette modal est une flatlist de checkbox
			 contenant les différents filtres. Ceux-ci font effet dès-lors qu'il sont cochés*/}
		</View>
	);
};

export default FilterDropdown;
