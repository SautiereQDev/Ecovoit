import { User } from '@/types/Ecovoit';
import {
	createContext,
	PropsWithChildren,
	useContext,
	useReducer,
} from 'react';

// {
//   "vehicle": "Foo Bar Car",
//   "seats": 7, // Nombre de place initial
//   "datetime": 1729843200,
//   "points": [
//     {
//       "type": "start",
//       "locationName": "Les Minimes"
//     },
//     {
//       "type": "end",
//       "locationName": "La Préfecture - Verdun - Saintes Claires"
//     }
//   ]
// }

interface TripCreationContextType {
	trip: {
		start: string;
		destination: string;
		date: string;
		time: string;
		initialSeats: number;
	};
	setStart: (start: string) => void;
	setDestination: (destination: string) => void;
	setDate: (date: string) => void;
	setTime: (time: string) => void;
	setInitialSeats: (initialSeats: number) => void;
}

const TripCreationContext = createContext<TripCreationContextType>({
	trip: {
		start: 'defaultStart',
		destination: 'defaultDestination',
		date: 'defaultDate',
		time: 'defaultTime',
		initialSeats: 0,
	},
	setStart: (start) => {},
	setDestination: (destination) => {},
	setDate: (date: string) => {},
	setTime: (time: string) => {},
	setInitialSeats: (initialSeats: number) => {},
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
					start: action.payload,
				};
			case 'set_destination':
				return {
					...state,
					destination: action.payload,
				};
			case 'set_date':
				return {
					...state,
					date: action.payload,
				};
			case 'set_time':
				return {
					...state,
					time: action.payload,
				};
			case 'set_available_seats':
				return {
					...state,
					initialSeats: action.payload,
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
		initialSeats: 0,
	});

	const providedContext: TripCreationContextType = {
		trip: state,
		setStart: (start: string) => {
			dispatch({
				type: 'set_start',
				payload: start,
			});
		},
		setDestination: (destination: string) => {
			dispatch({
				type: 'set_destination',
				payload: destination,
			});
		},
		setDate: (date: string) => {
			dispatch({
				type: 'set_date',
				payload: date,
			});
		},
		setTime: (time: string) => {
			dispatch({
				type: 'set_time',
				payload: time,
			});
		},
		setInitialSeats: (initialSeats: number) => {
			dispatch({
				type: 'set_available_seats',
				payload: initialSeats,
			});
		},
	};

	return (
		<TripCreationContext.Provider value={providedContext}>
			{children}
		</TripCreationContext.Provider>
	);
}
