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
 * IconButton component that renders a button with an icon.
 *
 * @param {StyleProp<ViewStyle>} buttonStyle - Custom style for the button.
 * @param {string} title - Title of the button.
 * @param {object} textProps - Properties for the text inside the button.
 * @param {StyleProp<ViewStyle>} iconStyle - Custom style for the icon.
 * @param {Props} restProps - Other properties passed to the button.
 *
 * @returns {JSX.Element} A TouchableOpacity component with an icon.
 */
export function IconButton({
  buttonStyle,
  title,
  textProps,
  iconStyle,
  ...restProps
}: Props) {
  return (
    <TouchableOpacity style={buttonStyle} {...restProps}>
      <Octicons {...restProps} style={iconStyle} />
    </TouchableOpacity>
  );
}

export default IconButton;
