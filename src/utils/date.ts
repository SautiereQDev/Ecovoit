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

export function getHoursAndMinutes(seconds: number): string {
	if (seconds < 3600) {
		const minutes = Math.floor(seconds / 60);
		return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
	} else {
		const hours = (seconds / 3600).toFixed(1);
		return `${hours} heure${parseFloat(hours) !== 1 ? 's' : ''}`;
	}
}
