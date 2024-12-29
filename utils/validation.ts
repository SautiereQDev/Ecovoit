import { FieldValue, PageNumber, PartialUser, Vehicle } from '@/types';

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
	/**
	 * Validation rule for username.
	 * @param {string} value - The username to validate.
	 * @returns {string | null} - Error message or null if valid.
	 */
	username: (value: string): string | null =>
		value.length >= 3 ? null : 'Le pseudo doit contenir au moins 3 caractères',

	/**
	 * Validation rule for email.
	 * @param {string} value - The email to validate.
	 * @returns {string | null} - Error message or null if valid.
	 */
	email: (value: string): string | null =>
		/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : 'Email invalide',

	/**
	 * Validation rule for password.
	 * @param {string} value - The password to validate.
	 * @returns {string | null} - Error message or null if valid.
	 */
	password: (value: string): string | null =>
		value.length >= 8 &&
		/[A-Z]/.test(value) &&
		/[!@#$%^&*(),.?":{}|<>]/.test(value)
			? null
			: 'Le mot de passe doit contenir au moins 8 caractères, une majuscule et un symbole',

	/**
	 * Validation rule for first name.
	 * @param {string} value - The first name to validate.
	 * @returns {string | null} - Error message or null if valid.
	 */
	firstName: (value: string): string | null =>
		value.length > 0 ? null : 'Le prénom est requis',

	/**
	 * Validation rule for last name.
	 * @param {string} value - The last name to validate.
	 * @returns {string | null} - Error message or null if valid.
	 */
	lastName: (value: string) => null,

	/**
	 * Validation rule for vehicles.
	 * @param {Vehicle[]} value - The vehicles to validate.
	 * @returns {string | null} - Error message or null if valid.
	 */
	vehicles: (value: Vehicle[]): string | null => null,

	/**
	 * Validation rule for biography.
	 * @param {string} value - The biography to validate.
	 * @returns {string | null} - Error message or null if valid.
	 */
	bio: (value: string): string | null =>
		value?.length <= 128
			? null
			: 'La biographie ne doit pas dépasser 128 caractères',

	/**
	 * Validation rule for profile picture.
	 * @returns {string | null} - Error message or null if valid.
	 */
	profilePicture: () => null,
};

/**
 * Validates a field based on its validation rule.
 * @param {keyof PartialUser} field - The field to validate.
 * @param {FieldValue} value - The value of the field.
 * @returns {string | null} - Error message or null if valid.
 */
export const validateField = (
	field: keyof PartialUser,
	value: FieldValue
): string | null => {
	const rule = VALIDATION_RULES[field as string];
	if (field === 'bio' && (value === undefined || value === null)) {
		return null; // No error if biographie is undefined or null
	}
	return rule ? rule(value) : null;
};

/**
 * Validates all fields on a specific page of the registration form.
 * @param {PageNumber} page - The page number to validate.
 * @param {PartialUser} form - The current form data.
 * @returns {boolean} - True if all fields on the page are valid, false otherwise.
 */
export const validatePage = (page: PageNumber, form: PartialUser): boolean => {
	const fieldsToValidate = PAGE_FIELDS[page];
	return fieldsToValidate.every(
		(field) => !validateField(field, form[field] as FieldValue),
	);
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
