import {
	createContext,
	PropsWithChildren,
	useContext,
	useReducer,
} from 'react';

interface TripCreationContextType {
	trip: {
		start: string;
		destination: string;
		date: string;
		time: string;
		availableSeats: number;
	};
	setStart: (start: string) => void;
	setDestination: (destination: string) => void;
	setDate: (date: string) => void;
	setTime: (time: string) => void;
	setAvailableSeats: (availableSeats: number) => void;
}

const TripCreationContext = createContext<TripCreationContextType>({
	trip: {
		start: 'defaultStart',
		destination: 'defaultDestination',
		date: 'defaultDate',
		time: 'defaultTime',
		availableSeats: 0,
	},
	setStart: (start) => {},
	setDestination: (destination) => {},
	setDate: (date: string) => {},
	setTime: (time: string) => {},
	setAvailableSeats: (availableSeats: number) => {},
});

export function useTripCreation() {
	const value = useContext(TripCreationContext);
	if (process.env.NODE_ENV !== 'production') {
		if (!value) {
			throw new Error(
				'useTripCreation must be used within a TripCreationProvider'
			);
		}
	}
	return value;
}

export function TripCreationProvider({
	children,
}: PropsWithChildren): JSX.Element {
	function reducer(state, action) {
		switch (action.type) {
			case 'set_start':
				return {
					...state,
					start: action.start,
				};
			case 'set_destination':
				return {
					...state,
					destination: action.destination,
				};
			case 'set_date':
				return {
					...state,
					date: action.date,
				};
			case 'set_time':
				return {
					...state,
					time: action.time,
				};
			case 'set_available_seats':
				return {
					...state,
					availableSeats: action.availableSeats,
				};
			default:
				throw Error('Unknown action.');
		}
	}

	const [state, dispatch] = useReducer(reducer, {
		start: 'initialStart',
		destination: 'initialDestination',
		date: 'initialDate',
		time: 'initialTime',
		availableSeats: 0,
	});

	const providedContext: TripCreationContextType = {
		trip: state,
		setStart: (start: string) => {
			dispatch({
				type: 'set_start',
				start: start,
			});
		},
		setDestination: (destination: string) => {
			dispatch({
				type: 'set_destination',
				destination: destination,
			});
		},
		setDate: (date: string) => {
			dispatch({
				type: 'set_date',
				date: date,
			});
		},
		setTime: (time: string) => {
			dispatch({
				type: 'set_time',
				time: time,
			});
		},
		setAvailableSeats: (availableSeats: number) => {
			dispatch({
				type: 'set_available_seats',
				availableSeats: availableSeats,
			});
		},
	};

	return (
		<TripCreationContext.Provider value={providedContext}>
			{children}
		</TripCreationContext.Provider>
	);
}
