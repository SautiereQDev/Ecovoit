// Description: Les couleurs utilisées dans l'application.
export const colors = {
	// Thème clair
	light: {
		'primary-1': '#64B610',
		'primary-2': '#49A00F',
		'primary-3': '#207E16',
		'primary-4': '#136918',
		'primary-5': '#0D641B',
		'secondary-1': '#002F36',
		'secondary-2': '#9DC3CA',
		'background-1': '#FFFFFF',
		'background-2': '#EEEEEE',
		'text-primary': '#212121',
		'text-secondary': '#F5F5F5',
		'text-muted': '#b0b0b0',
		'success-1': '#A5D6A7',
		'success-2': '#388E3C',
		'error-1': '#FFCDD2',
		'error-2': '#D32F2F',
		'warning-1': '#FFF9C4',
		'warning-2': '#FFA000',
		'info-1': '#BBDEFB',
		'info-2': '#1976D2',
	},

	// Thème sombre
	dark: {
		'primary-1': '#64B610',
		'primary-2': '#49A00F',
		'primary-3': '#207E16',
		'primary-4': '#136918',
		'primary-5': '#0D641B',
		'secondary-1': '#002F36',
		'secondary-2': '#9DC3CA',
		'background-1': '#212121',
		'background-2': '#333333',
		'text-primary': '#F5F5F5',
		'text-secondary': '#212121',
		'text-muted': '#757575',
		'success-1': '#A5D6A7',
		'success-2': '#388E3C',
		'error-1': '#FFCDD2',
		'error-2': '#D32F2F',
		'warning-1': '#FFF9C4',
		'warning-2': '#FFA000',
		'info-1': '#BBDEFB',
		'info-2': '#1976D2',
	},
};

export type EVColor = {
	'primary-1': string;
	'primary-2': string;
	'primary-3': string;
	'primary-4': string;
	'primary-5': string;
	'secondary-1': string;
	'secondary-2': string;
	'background-1': string;
	'background-2': string;
	'text-primary': string;
	'text-secondary': string;
	'text-muted': string;
	'success-1': string;
	'success-2': string;
	'error-1': string;
	'error-2': string;
	'warning-1': string;
	'warning-2': string;
	'info-1': string;
	'info-2': string;
};

export type EVColorTheme = {
	light: EVColor;
	dark: EVColor;
};

export type EVColors = {
	[key: string]: EVColorTheme;
};
