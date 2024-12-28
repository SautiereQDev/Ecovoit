import { FormType, Vehicle, FieldValue } from '@/types';

export type OptionalField = 'lastName' | 'biographie' | 'profilePicture';

export type ValidationErrors = {
	[K in keyof FormType]?: K extends 'vehicles'
		? {
				carName?: string;
				carConsommation?: string;
				carEmission?: string;
			}[]
		: string;
};

export const VALIDATION_RULES = {
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

	lastName: () => null,

	vehicles: (value: Vehicle[]) =>
		value.length > 0 ? null : 'Au moins un véhicule est requis',

	biographie: (value: string) =>
		value?.length <= 128
			? null
			: 'La biographie ne doit pas dépasser 128 caractères',
};

export const validateField = (
	field: keyof FormType,
	value: FieldValue
): string | null => {
	const rule = VALIDATION_RULES[field];
	return rule ? rule(value) : null;
};

export const PAGE_FIELDS: Record<number, (keyof FormType)[]> = {
	1: ['username', 'email', 'password'],
	2: ['firstName', 'lastName'],
	3: [],
	4: ['vehicles'],
	5: ['biographie'],
};
