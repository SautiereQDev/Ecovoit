export const formatDuration = (durationInSeconds: number): string => {
	const minutes = Math.floor(durationInSeconds / 60);
	const seconds = durationInSeconds % 60;

	if (minutes >= 60) {
		const hours = Math.floor(minutes / 60);
		const remainingMinutes = minutes % 60;
		return `${hours}h ${remainingMinutes}min`;
	}

	return `${minutes}min`;
};
