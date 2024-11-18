import { StyleSheet, View } from "react-native";
import React from "react";
import { TripCardType } from "@/types";
import {TripCard} from "../cards";

type Props = {
	data: TripCardType[];
};

export function ListHistoricTrip({ data }: Readonly<Props>) {
	return (
		<View style={styles.container}>
			{data.map((el, index) => (
				<TripCard
					data={el}
					key={index}
				/>
			))}
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		display: "flex",
		gap: 20,
	},
});

export default ListHistoricTrip;