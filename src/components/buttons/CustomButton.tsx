import {
	Pressable,
	PressableProps,
	StyleProp,
	StyleSheet,
	ViewStyle,
} from 'react-native';
import React, { ReactNode } from 'react';
import { ThemedText } from '@/components/texts/ThemedText';
import { Colors } from '@/constants/Colors';

type Props = PressableProps & {
	buttonStyle?: StyleProp<ViewStyle>;
	text: string;
	textProps?: {
		type?:
			| 'header1'
			| 'header2'
			| 'header3'
			| 'header4'
			| 'header5'
			| 'header6'
			| 'small'
			| 'italic'
			| 'accent'
			| 'defaultBody'
			| 'bigger';
		color?: keyof typeof Colors.light;
	};
	backgroundColor?: keyof typeof Colors.light;
	size?: 'default' | 'bigger' | 'smaller';
};

/**
 * Composant CustomButton qui rend un bouton pressable avec un texte personnalisable.
 *
 * @param {StyleProp<ViewStyle>} buttonStyle - Style optionnel pour le bouton.
 * @param {string} text - Le texte à afficher à l'intérieur du bouton.
 * @param {Object} textProps - Propriétés optionnelles pour le texte.
 * @param {string} textProps.type - Le type de style de texte.
 * @param {keyof typeof Colors.light} textProps.color - La couleur du texte.
 * @param {keyof typeof Colors.light} backgroundColor - La couleur de fond du bouton.
 * @param {'default' | 'bigger' | 'smaller'} [size] - La taille du bouton.
 * @param {PressableProps} restProps - Props supplémentaires pour le composant Pressable.
 *
 * @returns {JSX.Element} Le composant bouton rendu.
 */
export function CustomButton({
	buttonStyle,
	text,
	textProps = { color: 'text' },
	backgroundColor = 'primary',
	size = 'default',
	...restProps
}: Props): ReactNode {
	return (
		<Pressable
			style={[
				styles.button,
				styles[size], // Appliquer les styles spécifiques à la taille
				buttonStyle,
				{ backgroundColor: Colors.light[backgroundColor] },
			]}
			{...restProps}
		>
			<ThemedText
				type={textProps?.type ?? 'bigger'}
				color={textProps?.color}
				style={[styles.text, { color: Colors.light[textProps?.color] }]}
			>
				{text}
			</ThemedText>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 10,
	},
	text: {
		textAlign: 'center',
	},
	default: {
		paddingVertical: '2%',
		paddingHorizontal: '4%',
		width: '100%',
	},
	bigger: {
		paddingVertical: '4%',
		paddingHorizontal: '8%',
		width: '80%',
	},
	smaller: {
		paddingVertical: '2%',
		paddingHorizontal: '2%',
		width: '70%',
	},
});

export default CustomButton;
