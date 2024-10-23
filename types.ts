export type destinationSearch = {
	position: string;
	destination: string;
};

export type TripCardType = {
	depart: string;
	destination: string;
	status: "en cours" | "effectue" | "annule";
	nom: string;
	date: string;
};
