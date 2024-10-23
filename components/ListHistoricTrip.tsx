import { StyleSheet, View } from "react-native";
import React from "react";
import { TripCardType } from "@/types.ts";
import TripCard from "./TripCard";

type Props = {
	data: TripCardType[];
};

export default function ListHistoricTrip({ data }: Readonly<Props>) {
	return (
		<View>
			{data.map((el, index) => (
				<TripCard
					data={el}
					key={index}
				/>
			))}
		</View>
	);
}
const styles = StyleSheet.create({});
