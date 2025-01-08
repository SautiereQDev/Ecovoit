import { OPTIONAL_FIELDS, OptionalField } from '@/utils/validation';
import { useUser } from '@/providers';

/**
 * Custom hook for managing profile completion.
 * @returns {object} An object containing functions to get missing fields, completion percentage, field route, and field label.
 */
export const useProfileCompletion = () => {
	const { state } = useUser();
	const { user, loading } = state;

	/**
	 * Gets the list of missing optional fields in the user's profile.
	 * @returns {OptionalField[]} An array of missing optional fields.
	 */
	const getMissingFields = (): OptionalField[] => {
		const missingFields: OptionalField[] = [];

		if (!user?.lastName) missingFields.push('lastName');
		if (!user?.bio) missingFields.push('bio');
		if (!user?.profilePicture) missingFields.push('bio');
		if (!user?.vehicles?.length) missingFields.push('vehicles');

		return missingFields;
	};

	/**
	 * Calculates the profile completion percentage based on the missing fields.
	 * @param {OptionalField[]} missingFields - An array of missing optional fields.
	 * @returns {number} The profile completion percentage.
	 */
	const getCompletionPercentage = (missingFields: OptionalField[]): number => {
		const totalFields = Object.keys(OPTIONAL_FIELDS).length;
		return ((totalFields - missingFields.length) / totalFields) * 40 + 60; // 60% is the minimum completion percentage
	};

	/**
	 * Gets the route for completing a specific field in the profile.
	 * @param {OptionalField} field - The field to complete.
	 * @returns {string} The route for completing the field.
	 */
	const getFieldRoute = (field: OptionalField): string => {
		return `/profile/completing/${field}`;
	};

	return {
		getMissingFields,
		getCompletionPercentage,
		getFieldRoute,
		/**
		 * Gets the label for a specific optional field.
		 * @param {OptionalField} field - The field to get the label for.
		 * @returns {string} The label of the field.
		 */
		getFieldLabel: (field: OptionalField): string => OPTIONAL_FIELDS[field],
	};
};
