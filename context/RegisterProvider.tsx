import React, { createContext, useCallback, useMemo, useState } from 'react';
import { router } from 'expo-router';
import { StyleProp, ViewStyle } from 'react-native';

export type FieldValue = string | PageNumber | Vehicle[] | undefined | null;
type PageNumber = 1 | 2 | 3 | 4 | 5;

interface RegisterContextType {
	data: FormType;
	setData: React.Dispatch<React.SetStateAction<FormType>>;
	errors: ValidationErrors;
	validatePage: (page: PageNumber) => boolean;
	validateField: (field: keyof FormType, value: FieldValue) => void;
	submit: () => void;
	clearErrors: () => void;
	resetData: () => void;
}

export interface Vehicle {
	carName: string;
	carConsommation: number;
	carEmission: number;
}

export interface FormType {
	firstName: string;
	lastName?: string;
	username: string;
	email: string;
	password: string;
	vehicles: Vehicle[];
	biographie?: string;
	profilePicture: string | null;
}

export const OPTIONAL_FIELDS = {
	lastName: 'Nom de famille',
	biographie: 'Biographie',
	vehicles: 'Véhicule',
	profilePicture: 'Photo de profil',

} as const;

export type OptionalField = keyof typeof OPTIONAL_FIELDS;

export type ValidationErrors = {
	[K in keyof FormType]?: K extends 'vehicles'
		? {
				carName?: string;
				carConsommation?: string;
				carEmission?: string;
			}[]
		: string;
};
const initialData: FormType = {
	firstName: 'John',
	lastName: undefined,
	username: 'JoJo',
	email: 'johndoe@gmail.com',
	password: 'Jjoj@123dsd',
	vehicles: [],
	biographie: undefined,
	profilePicture: null,
};

export interface CreateVehicleProps {
	setData: React.Dispatch<React.SetStateAction<FormType>>;
	errors: ValidationErrors;
	validateField: (field: keyof FormType, value: FieldValue) => void;
	handleSubmit: (vehicle: Vehicle) => void;
	buttonStyle?: StyleProp<ViewStyle>;
}

const VALIDATION_RULES: {
	[key in keyof FormType]: (value: any) => string | null;
} = {
	profilePicture(value: any): string | null {
		return null;
	},
	username: (value: string) =>
		value.length >= 3 ? null : 'Le pseudo doit contenir au moins 3 caractères',
	email: (value: string) =>
		/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : 'Email invalide',
	password: (value: string) =>
		value.length >= 8 &&
		/[A-Z]/.test(value) &&
		/[!@#$%^&*(),.?":{}|<>]/.test(value)
			? null
			: 'Le mot de passe doit contenir au moins 8 caractères, une majuscule et un symbole',
	firstName: (value: string) =>
		value.length > 0 ? null : 'Le prénom est requis',
	lastName: () => null,
	vehicles: (value: Vehicle[]) =>
		value.length > 0 ? null : 'Au moins un véhicule est requis',
	biographie: (value: string) =>
		value.length <= 128
			? null
			: 'La biographie ne doit pas dépasser 128 caractères',
};

const PAGE_FIELDS: Record<PageNumber, (keyof FormType)[]> = {
	1: ['username', 'email', 'password'],
	2: ['firstName', 'lastName'],
	3: [],
	4: ['vehicles'],
	5: ['biographie'],
};

const RegisterContext = createContext<RegisterContextType | null>(null);

export function RegisterProvider({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const [data, setData] = useState<FormType>(initialData);
	const [errors, setErrors] = useState<ValidationErrors>({});

	const validateField = (field: keyof FormType, value: FieldValue) => {
		const rule = VALIDATION_RULES[field];
		if (!rule) return;

		const error = rule(value);
		setErrors((prev) => ({
			...prev,
			[field]: error,
		}));
	};

	const validatePage = useCallback(
		(page: PageNumber): boolean => {
			const fieldsToValidate = PAGE_FIELDS[page];
			let isValid = true;
			const newErrors: ValidationErrors = {};

			fieldsToValidate.forEach((field) => {
				const rule = VALIDATION_RULES[field];
				if (!rule) return;

				const error = rule(data[field] as string);
				if (error) {
					isValid = false;
					if (field === 'vehicles') {
						newErrors[field] = [];
					} else {
						newErrors[field] = error;
					}
				}
			});

			setErrors(newErrors);
			return isValid;
		},
		[data]
	);

	const clearErrors = () => setErrors({});

	const submit = useCallback(() => {
		const isValid = [1, 2, 4].every((page) => validatePage(page as PageNumber));
		if (isValid) {
			console.log('Form submitted:', data);
			router.push('/');
		}
	}, [data, validatePage]);

	const resetData = () => {
		setData(initialData);
		setErrors({});
	};

	const value = useMemo(
		() => ({
			data,
			setData,
			errors,
			validatePage,
			validateField,
			submit,
			clearErrors,
			resetData,
		}),
		[data, errors, submit, validatePage]
	);

	return (
		<RegisterContext.Provider value={value}>
			{children}
		</RegisterContext.Provider>
	);
}

export const useRegister = () => {
	const context = React.useContext(RegisterContext);
	if (!context) {
		throw new Error('useRegister must be used within a RegisterProvider');
	}
	return context;
};
