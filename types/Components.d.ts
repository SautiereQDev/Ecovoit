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

export type SearchTripCardType = {
  depart: string;
  destination: string;
  nom: string;
  date: string;
  distance: number | string;
};
