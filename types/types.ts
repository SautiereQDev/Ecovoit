export interface destinationSearch {
	position: string;
	destination: string;
}

export type searchTripFormType = {
	depart: string;
	destination: string;
	date: number;
};

export interface TripCardType {
	depart: string;
	destination: string;
	status: 'current' | 'completed' | 'canceled';
	nom: string;
	date: string;
}

export type NewTripType = {
	depart: string;
	destination: string;
	date: string;
	username: string;
};

export interface SearchTripCardType {
	depart: string;
	destination: string;
	nom: string;
	date: string;
	distance: number | string;
}

//Trip Search
export enum FiltreType {
	CONSOMMATION = 'consommation',
	DISTANCE = 'Distance',
	EMISSION = 'Emission',
	ECART_HORRAIRE = 'Ecart horraire',
}

export interface Filter {
	name: FiltreType;
	value: number;
	active: boolean;
}

export type imageSourceType = 'appareil photo' | 'galerie';

export type userParams = {
	theme: 'light' | 'dark';
};

export type ValidationErrors = Record<string, string | undefined>;

export type FieldValue = string | number | boolean | null | undefined;
