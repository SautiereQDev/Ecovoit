import { useProfile } from '@/context/ProfileProvider';
import { OPTIONAL_FIELDS, OptionalField } from '@/context/RegisterProvider';

export const useProfileCompletion = () => {
	const { user } = useProfile();

	const getMissingFields = (): OptionalField[] => {
		const missingFields: OptionalField[] = [];

		if (!user?.lastName) missingFields.push('lastName');
		if (!user?.bio) missingFields.push('biographie');
		if (!user?.vehicles?.length) missingFields.push('vehicles');

		return missingFields;
	};

	const getCompletionPercentage = (missingFields: OptionalField[]): number => {
		const totalFields = Object.keys(OPTIONAL_FIELDS).length;
		const completedFields = totalFields - missingFields.length;
		return (completedFields / totalFields) * 100;
	};

	const getFieldRoute = (field: OptionalField): string => {
		return `/profile/completing/${field}`;
	};

	return {
		getMissingFields,
		getCompletionPercentage,
		getFieldRoute,
		getFieldLabel: (field: OptionalField) => OPTIONAL_FIELDS[field],
	};
};
