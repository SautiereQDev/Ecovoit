import { Tabs } from "expo-router";

export default function TabsLayout() {
  // console.warn("-- render TabsLayout");

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Accueil",
          tabBarHideOnKeyboard: true,
        }}
      />
      <Tabs.Screen
        name="searchTrip"
        options={{
          title: "Rechercher",
          tabBarHideOnKeyboard: true,
        }}
      />

      <Tabs.Screen
        name="postTrip"
        options={{
          title: "Publier",
          tabBarHideOnKeyboard: true,
        }}
      />

      <Tabs.Screen
        name="user"
        options={{
          title: "Profil",
          tabBarHideOnKeyboard: true,
        }}
      />
      <Tabs.Screen name="tests" />
    </Tabs>
  );
}
