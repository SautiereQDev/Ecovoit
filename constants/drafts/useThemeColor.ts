import { useColorScheme } from 'react-native';
import { colors } from '@/constants/drafts/Colors';

export function useThemeColor(theme?: 'light' | 'dark') {
	let usedTheme = useColorScheme() ?? 'light';
	if (theme) {
		usedTheme = theme;
	}
	return colors[usedTheme];
}
