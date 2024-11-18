export interface destinationSearch {
	position: string;
	destination: string;
};

export interface TripCardType {
	depart: string;
	destination: string;
	status: "en cours" | "effectue" | "annule";
	nom: string;
	date: string;
};

export interface SearchTripCardType {
	depart: string;
	destination: string;
	nom: string;
	date: string;
	distance: number | string;
};
