import * as Location from 'expo-location';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

interface LocationContextType {
  location: Location.LocationObject | null;
  errorMsg: string | null;
}

const LocationContext = createContext<LocationContextType>({
  location: null,
  errorMsg: null,
});

export function useLocation() {
  const value = useContext(LocationContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useLocation must be used within a LocationProvider');
    }
  }
  return value;
}

export function LocationProvider({ children }: PropsWithChildren): JSX.Element {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const providedContext: LocationContextType = {
    location,
    errorMsg,
  };

  return <LocationContext.Provider value={providedContext}>{children}</LocationContext.Provider>;
}
