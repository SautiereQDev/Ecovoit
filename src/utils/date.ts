/**
 * Formats the date to a string in the format "DD/MM/YYYY HH:MM".
 * @param {number} timestamp - The timestamp to format.
 * @returns {string} - The formatted date string.
 */
export const formatDate = (timestamp: number): string => {
	const date = new Date(timestamp);
	return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
};

/**
 * Formats the date to a string in the format "DD Month YYYY - HHhMM".
 * @param {number} timestamp - The timestamp to format.
 * @returns {string} - The formatted date string.
 */
export const formatDateReverse = (timestamp: number): string => {
	const date = new Date(timestamp);
	return `${date.toLocaleDateString('fr-FR', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	})} - ${date.getHours()}h${date.getMinutes()}`;
};

export const getHoursAndMinutes = (timestamp: number): string => {
	const date = new Date(timestamp);
	const hours = date.getHours();
	const minutes = date.getMinutes();
	return hours > 0 ? `${hours}h${minutes}` : `${minutes}m`;
};
