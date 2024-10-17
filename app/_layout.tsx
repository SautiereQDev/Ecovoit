import { Stack } from "expo-router";
import Login from "./login.js";
import { users } from "@/tests/User.js";

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
		<Stack>
			{/* Utilisateur authentifié ???? */}
			{/* OUI */}

			{/* NON */}

			<Stack.Screen
				name='(tabs)'
				options={{ headerShown: false }}
			/>
		</Stack>
	);
}
