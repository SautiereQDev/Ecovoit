import React, {
	createContext,
	ReactNode,
	useContext,
	useReducer,
	useState,
} from 'react';
import { EVAPI } from '@ecovoit-api/mock-adapter';

interface PostTripContextType {
	trip: EVAPI.TripCreation;
	setVehicle: (vehicle: string) => void;
	setSeats: (seats: number) => void;
	setDescription: (description: string) => void;
	setDatetime: ({ date, time }: any) => void;
	setPoints: (points: EVAPI.PointCreation[]) => void;
	postTrip: () => Promise<void>;
	getStartPoint: () => EVAPI.PointCreation;
	getEndPoint: () => EVAPI.PointCreation;
	resetTrip: () => void;
	setDate: (date: string | undefined) => void;
	setTime: (time: Date | undefined) => void;
	date: string | undefined;
	time: Date | undefined;
	tripIsValid: () => boolean;
}

const PostTripContext = createContext<PostTripContextType | undefined>(
	undefined
);

export const PostTripProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	// UTILS
	const processDatetime = (date: string, time: Date) => {
		const day = new Date(date);
		const hours = time.getHours();
		const minutes = time.getMinutes();
		const datetime = new Date(
			day.getFullYear(),
			day.getMonth(),
			day.getDate(),
			hours,
			minutes
		).getTime();
		return datetime;
	};

	const initialState: EVAPI.TripCreation = {
		vehicle: '',
		seats: 0,
		description: '',
		datetime: 0,
		points: [],
	};

	const [date, setDate] = useState<string>();
	const [time, setTime] = useState<Date>();

	const tripReducer = (
		state: EVAPI.TripCreation,
		action: any
	): EVAPI.TripCreation => {
		switch (action.type) {
			case 'SET_VEHICLE':
				return { ...state, vehicle: action.payload };
			case 'SET_SEATS':
				return { ...state, seats: action.payload };
			case 'SET_DESCRIPTION':
				return { ...state, description: action.payload };
			case 'SET_DATETIME':
				return {
					...state,
					datetime: processDatetime(action.payload.date, action.payload.time),
				};
			case 'SET_POINTS':
				if (action.payload[0].type === 'start') {
					return {
						...state,
						points: [
							...action.payload,
							...state.points.filter((p) => p.type !== 'start'),
						],
					};
				} else if (action.payload[0].type === 'end') {
					return {
						...state,
						points: [
							...state.points.filter((p) => p.type !== 'end'),
							...action.payload,
						],
					};
				} else {
					return state;
				}
			case 'RESET':
				console.log('RESET TRIP'); // DEBUG
				setDate(undefined);
				setTime(undefined);
				return initialState;
			default:
				return state;
		}
	};

	const [trip, dispatch] = useReducer(tripReducer, initialState);

	const setVehicle = (vehicle: string) =>
		dispatch({ type: 'SET_VEHICLE', payload: vehicle });
	const setSeats = (seats: number) =>
		dispatch({ type: 'SET_SEATS', payload: seats });
	const setDescription = (description: string) =>
		dispatch({ type: 'SET_DESCRIPTION', payload: description });
	const setDatetime = ({ date, time }: any) =>
		dispatch({ type: 'SET_DATETIME', payload: { date, time } });
	const setPoints = (points: EVAPI.PointCreation[]) =>
		dispatch({ type: 'SET_POINTS', payload: points });
	const resetTrip = () => {
		dispatch({ type: 'RESET' });
	};

	const getStartPoint = () => {
		return trip.points.filter((p) => p.type === 'start')[0];
	};

	const getEndPoint = () => {
		return trip.points.filter((p) => p.type === 'end')[0];
	};

	const tripIsValid = () => {
		const startPoint = getStartPoint();
		const endPoint = getEndPoint();
		const seats = trip.seats;
		const day = date;
		const hour = time;
		return (startPoint && endPoint && seats > 0 && day && hour) as boolean;
	};

	const postTrip = async () => {
		console.log(trip, null, 2); // DEBUG

		const Kydo = '5877943231581716480';
		const Xibitol = '5877943231555567616';

		const response = await fetch('https://api-ev-qq.pimous.dev/trips', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				// 'Authorization': `Bearer ${localStorage.getItem('token')}`, // TODO: Add token
				// Authorization: `Bearer ${Kydo}`,
				Autorisation: Xibitol,
			},
			body: JSON.stringify(trip),
		});
		const data = await response.json();
		return data;
	};

	const providedContext: PostTripContextType = {
		trip,
		setVehicle,
		setSeats,
		setDescription,
		setDatetime,
		setPoints,
		postTrip,
		getStartPoint,
		getEndPoint,
		resetTrip,
		setDate,
		setTime,
		date,
		time,
		tripIsValid,
	};

	return (
		<PostTripContext.Provider value={providedContext}>
			{children}
		</PostTripContext.Provider>
	);
};

export const usePostTrip = (): PostTripContextType => {
	const context = useContext(PostTripContext);
	if (!context) {
		throw new Error(
			'useRegisterContext must be used within a PostTripProvider'
		);
	}
	return context;
};
