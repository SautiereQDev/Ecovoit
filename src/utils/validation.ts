import { FieldValue, PageNumber, PartialUser, User, Vehicle } from '@/types';

/**
 * Type representing validation errors for each field in PartialUser.
 */
export type ValidationErrors = {
	[K in keyof PartialUser]?: K extends 'vehicles'
		? {
				carName?: string;
				carConsommation?: string;
				carEmission?: string;
			}[]
		: string;
};

/**
 * Validation rules for various fields.
 */
export const VALIDATION_RULES: {
	[key: string]: (value: any) => string | null;
} = {
	username: (value: string): string | null =>
		value && value.length >= 3
			? null
			: 'Le pseudo doit contenir au moins 3 caractères',

	email: (value: string): string | null =>
		value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : 'Email invalide',

	password: (value: string): string | null =>
		value &&
		value.length >= 8 &&
		/[A-Z]/.test(value) &&
		/[!@#$%^&*(),.?":{}|<>]/.test(value)
			? null
			: 'Le mot de passe doit contenir au moins 8 caractères, une majuscule et un symbole',

	firstName: (value: string): string | null =>
		value && value.length > 0 ? null : 'Le prénom est requis',

	lastName: (value?: string): null => null,

	vehicles: (value?: Vehicle[]): string | null => null,

	bio: (value: string): string | null =>
		value && value.length <= 128
			? null
			: 'La biographie ne doit pas dépasser 128 caractères',

	profilePicture: (value?: string | null): null => null,
};

export const getPageFields = (page: PageNumber): (keyof User)[] => {
	switch (page) {
		case 1:
			return ['username', 'email', 'password'];
		case 2:
			return ['firstName', 'lastName'];
		case 3:
			return ['bio'];
		case 4:
			return ['vehicles'];
		default:
			return [];
	}
};

/**
 * Validates a field based on its validation rule.
 * @param {keyof PartialUser} field - The field to validate.
 * @param {FieldValue} value - The value of the field.
 * @returns {string | null} - Error message or null if valid.
 */
export const validateField = (field: keyof User, value: FieldValue): string | null => {
	const rule = VALIDATION_RULES[field];
	if (!rule) {
		console.warn(`No validation rule found for field: ${field}`);
		return null;
	}
	return rule(value);
};

export const validatePage = (
	page: PageNumber
): Record<keyof typeof PAGE_FIELDS, string | null> => {
	const errors: Record<keyof typeof PAGE_FIELDS, string | null> = {} as Record<
		keyof typeof PAGE_FIELDS,
		string | null
	>;

	PAGE_FIELDS[page].forEach((field) => {
		const error = validateField(field, null); // Replace `null` with the actual value to validate
		if (error) {
			errors[field as unknown as keyof typeof PAGE_FIELDS] = error;
		}
	});

	return errors;
};
/**
 * Fields for each page in the form.
 */
export const PAGE_FIELDS: Record<number, (keyof PartialUser)[]> = {
	1: ['username', 'email', 'password'],
	2: ['firstName', 'lastName'],
	3: [],
	4: ['vehicles'],
	5: ['bio'],
};

/**
 * Type representing optional fields in the form.
 */
export type OptionalField = 'lastName' | 'bio' | 'profilePicture' | 'vehicles';

/**
 * Labels for optional fields.
 */
export const OPTIONAL_FIELDS: Record<OptionalField, string> = {
	lastName: 'Nom',
	bio: 'Biographie',
	profilePicture: 'Photo de profil',
	vehicles: 'Véhicules',
};
