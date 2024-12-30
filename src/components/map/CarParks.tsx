import { useOpenDataLR } from '@/src/hooks/useOpenData';
import { StyleSheet, View } from 'react-native';
import { CarParksRecord } from '@/src/types/OpenData';
import { Marker } from 'react-native-maps';

interface CarParksProps {}

export default function CarParks({}: CarParksProps) {
	const { error, isLoading, openData } = useOpenDataLR<CarParksRecord[]>(
		'lieux_de_stationnement_sur_la_rochelle'
	);

	return (
		<View style={styles.container}>
			{openData?.records.map((record, index) => (
				<Marker
					key={index}
					coordinate={{
						latitude: parseFloat(record.fields.ylat),
						longitude: parseFloat(record.fields.xlong),
					}}
					title={record.fields.nom}
				/>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		width: '100%',
		height: '100%',
	},
	calloutContainer: {
		position: 'relative',
	},
	marker: {},
	shadow: {
		textShadowColor: 'rgba(0, 0, 0, 0.3)',
		textShadowOffset: { width: 2, height: 2 },
		textShadowRadius: 4,
	},
	indicator: {
		zIndex: 3,
	},
});
