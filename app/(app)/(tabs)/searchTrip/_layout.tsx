import { Stack } from "expo-router";

export default function SearchTripLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="search" />
    </Stack>
  );
}
