import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { fontType, ThemedText } from '@/components/texts';
import Colors from '@/constants/Colors';

/**
 * Propriétés du composant CircularProgress.
 */
interface CircularProgressProps {
	size?: number; // Taille du cercle
	strokeWidth?: number; // Largeur du trait du cercle
	progress: number; // Progression en pourcentage (0-100)
	color?: string; // Couleur du cercle de progression
	backgroundColor?: string; // Couleur de fond du cercle
	textColor?: keyof typeof Colors.light; // Couleur du texte
	textType?: keyof typeof fontType; // Type de texte
}

/**
 * Composant de barre de progression circulaire avec pourcentage affiché au centre.
 * @param {CircularProgressProps} props - Les propriétés du composant.
 * @returns {ReactNode} Le composant de barre de progression circulaire.
 */
export const CircularProgress: React.FC<CircularProgressProps> = ({
	size = 50,
	strokeWidth = 8,
	progress,
	color = Colors.light.primary,
	backgroundColor = 'background',
	textColor = 'text',
	textType = 'accent',
}: CircularProgressProps): ReactNode => {
	const radius = (size - strokeWidth) / 2;
	const circumference = 2 * Math.PI * radius;
	const strokeDashoffset = circumference - (progress / 100) * circumference;

	return (
		<View style={{ width: size, height: size }}>
			<Svg
				width={size}
				height={size}
			>
				<Circle
					stroke={backgroundColor}
					fill='none'
					cx={size / 2}
					cy={size / 2}
					r={radius}
					strokeWidth={strokeWidth}
				/>
				<Circle
					stroke={color}
					fill='none'
					cx={size / 2}
					cy={size / 2}
					r={radius}
					strokeWidth={strokeWidth}
					strokeDasharray={circumference}
					strokeDashoffset={strokeDashoffset}
					strokeLinecap='round'
				/>
			</Svg>
			<View style={styles.textContainer}>
				<ThemedText
					color={textColor}
					type={textType}
				>{`${progress}%`}</ThemedText>
			</View>
		</View>
	);
};

export default CircularProgress;

/**
 * Styles pour le composant CircularProgress.
 */
const styles = StyleSheet.create({
	textContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
