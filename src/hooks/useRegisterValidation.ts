import { useCallback } from 'react';
import { FieldValue, PageNumber, PartialUser } from '@/src/types';
import { PAGE_FIELDS, VALIDATION_RULES } from '@/src/utils';

/**
 * Custom hook for validating registration form fields and pages.
 * @returns {object} An object containing validation functions.
 */
export function useRegisterValidation() {
	/**
	 * Validates a specific field in the registration form.
	 * @param {keyof PartialUser} field - The field to validate.
	 * @param {FieldValue} value - The value of the field.
	 * @returns {string | null} - The validation error message, or null if valid.
	 */
	const validateField = useCallback(
		(field: keyof PartialUser, value: FieldValue): string | null => {
			const rule = VALIDATION_RULES[field as string];
			if (!rule) return null;
			return rule(value);
		},
		[]
	);

	/**
	 * Validates all fields on a specific page of the registration form.
	 * @param {PageNumber} page - The page number to validate.
	 * @param {PartialUser} form - The current form data.
	 * @returns {boolean} - True if all fields on the page are valid, false otherwise.
	 */
	const validatePage = useCallback(
		(page: PageNumber, form: PartialUser): boolean => {
			const fieldsToValidate = PAGE_FIELDS[page];
			return fieldsToValidate.every(
				(field) => !validateField(field, form[field] as FieldValue)
			);
		},
		[validateField]
	);

	return { validateField, validatePage };
}
