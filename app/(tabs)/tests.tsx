/**
 * Cette page va nous servir en phase de développement pour tester des composants
 */

import { DetailledTrip } from "@/components";

export default function Tests() {
	const tripData = {
		date: "Jeudi 24 Novembre",
		start: {
			latitude: 48.8584,
			longitude: 2.2945,
			title: "Super U",
		},
		end: {
			latitude: 48.8606,
			longitude: 2.3376,
			title: "Chez Auguste",
		},
	};

	return <DetailledTrip data={tripData} />;
}
