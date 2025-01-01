/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const resetButton = '#d60d0d';
const acceptButton = '#01b301';
const disabledBackground = '#f0f0f0';
const disabledBorder = '#d0d0d0';

export const Colors = {
	light: {
		hidden: '#DCDCDC',
		text: '#11181C',
		primary: '#00570D',
		secondary: '#106EB2',
		accent: '#5bb6c6',
		background: '#FDFFFD',
		inputText: '#616161',
		inputBackground: '#E6E6E6',
		hidden: '#DCDCDC',
		text: '#11181C',
		primary: '#00570D',
		secondary: '#106EB2',
		accent: '#5bb6c6',
		background: '#FDFFFD',
		inputText: '#616161',
		inputBackground: '#E6E6E6',
		resetButton,
		acceptButton,
		deniedButton: resetButton,
		error: '#ff0000',
		disabledBackground,
		disabledBorder,
		accentBackground: '#dedede',
		gray: '#424242',
		grayBackground: '#e0e0e0',
	},
	dark: {
		hidden: '#DCDCDC',
		text: '#FFF',
		primary: '#2980b9',
		secondary: '#27ae60',
		background: '#000',
		inputText: '#ccc',
		inputBackground: '#333',
		accent: '#c0392b',
		resetButton,
		acceptButton,
		deniedButton: resetButton,
		error: '#ff0000',
		disabledBackground,
		disabledBorder,
		gray: '#555555',
		accentBackground: '#515151',
	},
};

export default Colors;
