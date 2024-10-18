import {
	ButtonProps,
	StyleProp,
	TouchableOpacity,
	ViewStyle,
} from "react-native";
import React, { ComponentProps } from "react";
import { Colors } from "@/constants/Colors";
import Octicons from "@expo/vector-icons/Octicons";

type OcticonsProps = ComponentProps<typeof Octicons>;

type Props = ButtonProps &
	OcticonsProps & {
		buttonStyle?: StyleProp<ViewStyle>;
		textProps?: {
			type?:
				| "header1"
				| "header2"
				| "header3"
				| "header4"
				| "header5"
				| "small"
				| "italic"
				| "accent"
				| "defaultBody";
			color: keyof typeof Colors.light;
		};
		iconStyle?: StyleProp<ViewStyle>;
	};

/**
 * Ce fichier définit le composant `IconButton`, qui est un bouton personnalisable
 * utilisant l'ensemble d'icônes Octicons de la bibliothèque `@expo/vector-icons`.
 *
 * Props :
 * - `buttonStyle` (optionnel) : Styles personnalisés pour le conteneur du bouton.
 * - `textProps` (optionnel) : Propriétés supplémentaires pour le texte, y compris :
 *   - `type` : Le type de texte (par exemple, header1, header2, etc.).
 *   - `color` : La couleur du texte, qui doit être une clé de `Colors.light`.
 * - `iconStyle` : Styles personnalisés pour l'icône.
 *
 * Attention:
 * Les props `name`, `size` et `color` sont obligatoires.
 * Title est obligatoire mais sa valeure est sans conséquence.
 *
 * Le composant combine les styles et les props pour rendre un `TouchableOpacity`
 * contenant une icône `Octicons`.
 */
export default function IconButton({
	buttonStyle,
	title,
	textProps,
	iconStyle,
	...restProps
}: Props) {
	return (
		<TouchableOpacity
			style={buttonStyle}
			{...restProps}
		>
			<Octicons
				{...restProps}
				style={iconStyle}
			/>
		</TouchableOpacity>
	);
}
