import React from 'react';
import { SafeAreaView } from 'react-native';
import { useRegister } from '@/context/RegisterProvider';
import { globalStyle, handleBack } from './index';
import CreateVehicle from '@/components/forms/CreateVehicle';
import ReturnButton from '@/components/buttons/ReturnButton';
import { CustomButton } from '@/components';

const Vehicle = () => {
	const { data, setData, errors, validatePage, validateField } = useRegister();

	const handleSubmit = (): void => {};

	return (
		<SafeAreaView style={globalStyle.container}>
			<ReturnButton handleBack={handleBack} />
			<CreateVehicle
				errors={errors}
				data={data}
				setData={setData}
				handleNext={handleSubmit}
				validateField={validateField}
			/>
			<CustomButton
				text={'Valider'}
				onPress={handleSubmit}
				buttonStyle={globalStyle.buttonNext}
			/>
		</SafeAreaView>
	);
};

export default Vehicle;
