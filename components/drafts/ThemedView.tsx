import { View, type ViewProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {};

export function ThemedView({ style, ...otherProps }: ThemedViewProps) {
	const colors = useThemeColor();

	return (
		<View
			style={[{ backgroundColor: colors['background-1'] }, style]}
			{...otherProps}
		/>
	);
}
