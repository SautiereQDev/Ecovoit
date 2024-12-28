import { useProfile } from '@/context/ProfileProvider';
import { OPTIONAL_FIELDS, OptionalField } from '@/utils/validation';

export const useProfileCompletion = () => {
	const { user } = useProfile();

	const getMissingFields = (): OptionalField[] => {
		const missingFields: OptionalField[] = [];

		if (!user?.lastName) missingFields.push('lastName');
		if (!user?.bio) missingFields.push('biographie');
		if (!user?.profilePicture) missingFields.push('biographie');
		if (!user?.vehicles?.length) missingFields.push('vehicles');

		return missingFields;
	};

	const getCompletionPercentage = (missingFields: OptionalField[]): number => {
		const totalFields = Object.keys(OPTIONAL_FIELDS).length;
		return ((totalFields - missingFields.length) / totalFields) * 40 + 60; // 60% is the minimum completion percentage
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
