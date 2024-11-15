import { useSession } from "@/components/context/SessionProvider";
import { Redirect, Stack } from "expo-router";

export default function AppLayout() {
  // console.warn("-- render AppLayout");

  const { isAuthenticated } = useSession();

  if (!isAuthenticated) {
    return <Redirect href="/signin" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
