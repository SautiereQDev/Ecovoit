import { Point, Trip } from "@/types/Ecovoit";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useReducer,
} from "react";

interface TripCreationContextType {
  trip: Trip | null;
}

const TripCreationContext = createContext<TripCreationContextType>({
  trip: null,
});

export function useTripCreation() {
  const value = useContext(TripCreationContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error(
        "useTripCreation must be used within a TripCreationProvider"
      );
    }
  }
  return value;
}

type TripReducerActions = {
  type: "a" | "b" | "c" | null;
};

function tripReducer(state: Trip, action: TripReducerActions): Trip {
  switch (action.type) {
    case "a": {
      return {
        ...state,
        // TO DO
      };
    }
    case "b": {
      return {
        ...state,
        // TO DO
      };
    }
    case "c": {
      return {
        ...state,
        // TO DO
      };
    }
    default:
      throw new Error("Unknown action: " + action.type);
  }
}

export function TripCreationProvider({
  children,
}: PropsWithChildren): JSX.Element {
  const initialTrip: Trip = {
    vehicle: null,
    seats: null,
    datetime: null,
    points: [],
  };

  const [state, dispatch] = useReducer(tripReducer, initialTrip);

  const providedContext: TripCreationContextType = {
    trip: state,
  };

  return (
    <TripCreationContext.Provider value={providedContext}>
      {children}
    </TripCreationContext.Provider>
  );
}
