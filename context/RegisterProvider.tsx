import React, { createContext, useMemo, useState } from 'react';
import { router } from 'expo-router';
import is from '@sindresorhus/is';
import undefined = is.undefined;

interface RegisterContextType {
	data: FormType;
	setData: React.Dispatch<React.SetStateAction<FormType>>;
	errors: ValidationErrors;
	validatePage: (page: PageNumber) => boolean;
	validateField: (
		field: keyof FormType,
		value: string | number | undefined
	) => void;
	submit: () => void;
	clearErrors: () => void;
	resetData: () => void;
}

type PageNumber = 1 | 2 | 3 | 4 | 5;

type ValidationErrors = { [key in keyof FormType]?: string };

interface FormType {
	firstName: string;
	lastName?: string;
	username: string;
	email: string;
	password: string;
	carName?: string;
	carConsommation?: number;
	carEmission?: number;
	biographie: string;
	profilePicture: string | null;
}

const initialData: FormType = {
	firstName: '',
	lastName: '',
	username: '',
	email: '',
	password: '',
	carName: '',
	carConsommation: 0,
	carEmission: 0,
	biographie: '',
	profilePicture: null,
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
	carName: (value: string) =>
		value.length > 0 ? null : 'Le nom du véhicule est requis',
	carConsommation: (value: number) =>
		value > 0 ? null : 'La consommation doit être supérieure à 0',
	carEmission: (value: number) =>
		value > 0 ? null : 'Les émissions doivent être supérieures à 0',
	biographie: (value: string) =>
		value.length <= 128
			? null
			: 'La biographie ne doit pas dépasser 128 caractères',
};

const PAGE_FIELDS: Record<PageNumber, (keyof FormType)[]> = {
	1: ['username', 'email', 'password'],
	2: ['firstName', 'lastName'],
	3: [],
	4: ['carName', 'carConsommation', 'carEmission'],
	5: ['biographie'],
};

const RegisterContext = createContext<RegisterContextType | null>(null);

export function RegisterProvider({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const [data, setData] = useState<FormType>(initialData);
	const [errors, setErrors] = useState<ValidationErrors>({});

	const validateField = (
		field: keyof FormType,
		value: string | number | undefined
	) => {
		const rule = VALIDATION_RULES[field];
		if (!rule) return;

		const error = rule(value as string);
		setErrors((prev) => ({
			...prev,
			[field]: error,
		}));

		return !error;
	};

	const validatePage = (page: PageNumber): boolean => {
		const fieldsToValidate = PAGE_FIELDS[page];
		let isValid = true;
		const newErrors: ValidationErrors = {};

		fieldsToValidate.forEach((field) => {
			const rule = VALIDATION_RULES[field];
			if (!rule) return;

			const error = rule(data[field] as string);
			if (error) {
				isValid = false;
				newErrors[field] = error;
			}
		});

		setErrors(newErrors);
		return isValid;
	};

	const clearErrors = () => setErrors({});

	const submit = () => {
		const isValid = [1, 2, 4].every((page) => validatePage(page as PageNumber));
		if (isValid) {
			console.log('Form submitted:', data);
			router.push('/');
		}
	};

	const resetData = () => {
		setData(initialData);
		setErrors({});
	}

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
