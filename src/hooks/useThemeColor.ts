import { useColorScheme } from 'react-native';
import { Colors } from '@/constants';

export function useThemeColor(theme?: 'light' | 'dark') {
	let usedTheme = useColorScheme() ?? 'light';
	usedTheme = 'light'; // Dev only
	if (theme) {
		usedTheme = theme;
	}
	return Colors[usedTheme];
}
