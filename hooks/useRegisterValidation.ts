export function useRegisterValidation() {
	const validateField = useCallback(
		(field: keyof FormType, value: FieldValue): string | null => {
			const rule = VALIDATION_RULES[field];
			if (!rule) return null;
			return rule(value);
		},
		[]
	);

	const validatePage = useCallback(
		(page: PageNumber, form: FormType): boolean => {
			const fieldsToValidate = PAGE_FIELDS[page];
			return fieldsToValidate.every(
				(field) => !validateField(field, form[field])
			);
		},
		[validateField]
	);

	return { validateField, validatePage };
}
