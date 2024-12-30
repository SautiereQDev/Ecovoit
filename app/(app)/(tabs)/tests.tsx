import { CustomButton } from '@/components';
import { router } from 'expo-router';

export default function Tests() {
	return (
		<CustomButton
			text={'Inscritpion'}
			onPress={() => {
				router.push('/register');
			}}
		/>
	);
}
