import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
	// const [authenticated, setAuthenticated] = useState(false);

	// POST /user/?email=hfhfghfh&password=hfhgfghvhgv
	// GET /users

	// 501 -> error -> fuck -> login
	// 200 -> Token -> Storage -> Home

	// Token ? Home : Login

	// response = {
	// 	header: "",
	// 	body: {
	// 		auth: {
	// 			token: "vjhghjghvjhvjvj"
	// 		},
	// 		data: {
	// 			username:
	// 			pssword
	// 		}

	// 	}
	// }

	return (
		<GestureHandlerRootView style={styles.container}>
			<Stack>
				<Stack.Screen
					name='(tabs)'
					options={{ headerShown: false }}
				/>
			</Stack>
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
