import {
	ActivityIndicator,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { useSession } from '@/context/SessionProvider';
import { Redirect } from 'expo-router';
import ButtonTest from '@/components/drafts/ButtonTest';

export default function Signin() {
	const { signIn, isAuthenticated, isLoading } = useSession();

	if (isLoading) {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<ActivityIndicator
					size={'small'}
					animating
				/>
				<Text>Loading...</Text>
			</View>
		);
	}

	if (isAuthenticated) {
		return <Redirect href='/(app)/(tabs)' />;
	}

	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Pressable onPress={() => signIn('mchasleslr', 'my_fake_password')}>
				<Text>SignIn</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({});
