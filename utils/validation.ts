import { FieldValue, PartialUser, Vehicle } from '@/types';

export type ValidationErrors = {
	[K in keyof PartialUser]?: K extends 'vehicles'
		? {
				carName?: string;
				carConsommation?: string;
				carEmission?: string;
			}[]
		: string;
};

export const VALIDATION_RULES: {
	[key: string]: (value: any) => string | null;
} = {
	username: (value: string) =>
		value.length >= 3 ? null : 'Le pseudo doit contenir au moins 3 caractères',

	email: (value: string) =>
		/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : 'Email invalide',

	password: (value: string) =>
		value.length >= 8 &&
		/[A-Z]/.test(value) &&
		/[!@#$%^&*(),.?":{}|<>]/.test(value)
			? null
			: 'Le mot de passe doit contenir au moins 8 caractères, une majuscule et un symbole',

	firstName: (value: string) =>
		value.length > 0 ? null : 'Le prénom est requis',

	lastName: (value: string) => null,

	vehicles: (value: Vehicle[]) => null,

	biographie: (value: string) =>
		value?.length <= 128
			? null
			: 'La biographie ne doit pas dépasser 128 caractères',

	profilePicture: () => null, // Added validation rule for profilePicture
};

export const validateField = (
	field: keyof PartialUser,
	value: FieldValue
): string | null => {
	const rule = VALIDATION_RULES[field as string];
	if (field === 'biographie' && (value === undefined || value === null)) {
		return null; // No error if biographie is undefined or null
	}
	return rule ? rule(value) : null;
};

export const PAGE_FIELDS: Record<number, (keyof PartialUser)[]> = {
	1: ['username', 'email', 'password'],
	2: ['firstName', 'lastName'],
	3: [],
	4: ['vehicles'],
	5: ['biographie'],
};

export type OptionalField =
	| 'lastName'
	| 'biographie'
	| 'profilePicture'
	| 'vehicles';

export const OPTIONAL_FIELDS: Record<OptionalField, string> = {
	lastName: 'Nom',
	biographie: 'Biographie',
	profilePicture: 'Photo de profil',
	vehicles: 'Véhicules',
};
