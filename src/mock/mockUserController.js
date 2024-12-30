import { HttpStatusCode } from 'axios';
import { db_user } from './mockDatabase';
import { User } from '@/src/mock/mockUserModel';
import { createJWT, parseJWT } from '@/src/mock/utils/jwtUtils';
import { checkPassword } from '@/src/mock/utils/passwordUtils';

export function user_all(config) {
	// On récupère toutes les entrée de la table user.
	const users = db_user;
	// On retourne la response avec le status code OK
	return [
		HttpStatusCode.Ok,
		{
			data: users,
			total: users.length,
			message: 'Liste des utilisateurs récupérée avec succès.',
		},
		{
			'Content-Type': 'application/json',
		},
	];
}

export function user_getById(config) {
	const id = config.url.match(/https:\/\/ecovoit-api\.com\/user\/(\d+)/)[1];
	const user = db_user.find((user) => user.id === parseInt(id));

	if (!user) {
		return [
			HttpStatusCode.NotFound,
			{ message: 'Utilisateur non trouvé' },
			{
				'Content-Type': 'text/plain',
			},
		];
	} else {
		return [
			HttpStatusCode.Ok,
			{
				user: user,
				total: 1,
				message: 'Utilisateur récupéré avec succès.',
			},
			{
				'Content-Type': 'application/json',
			},
		];
	}
}

export function user_auth(config) {
	// L'utilisateur trouvé dépendra du mode d'authentification : token ou identifiants
	let user;
	// Clef secrète pour l'encodage du JWT
	const jwt_key = process.env.EXPO_PUBLIC_JWT_KEY;
	// On récupère un éventuel token
	const token = config.headers.Authorization?.split(' ')[1];

	// Si il y a un token, on gére l'authentification de cette manière
	if (token) {
		// Vérification du token
		const payload = parseJWT(token, jwt_key);

		// Le token n'est pas valide on retourne une erreur
		if (!payload) {
			return [
				HttpStatusCode.Unauthorized,
				{
					message: 'Le token est expiré ou invalide',
				},
				{
					'Content-Type': 'text/plain',
				},
			];
		}

		// On recherche dans la base de donnée l'utilisateur correspondant à l'id extrait depuis le token
		user = db_user.find((user) => user.id === payload.iss);

		// Sinon on gère l'authentification avec les identifiants
	} else {
		// On récupére les identifiants envoyés par le client
		const { username, password } = JSON.parse(config.data);

		// On vérifie que l'username fourni correspond a un utilisateur de la base de donnée
		user = db_user.find((user) => user.username === username);

		// On retourne une erreur si l'identifiant ou le mot de passe n'est pas valide
		if (!user || user.password !== password) {
			return [
				HttpStatusCode.Unauthorized,
				{
					message: 'Identifiant ou mot de passe incorrect',
				},
				{
					'Content-Type': 'text/plain',
				},
			];
		}
	}

	// On génère un nouveau token pour que le client l'enregistre dans son storage (valide 1h)
	const newToken = createJWT(
		{
			iss: user.id,
		},
		jwt_key,
		'1h'
	);

	return [
		HttpStatusCode.Ok,
		{
			message: 'Authentification réussie',
			user,
			token: newToken,
		},
		{
			'Content-Type': 'application/json',
		},
	];
}

export function user_register(config) {
	const { username, password, ...rest } = JSON.parse(config.data);

	// Vérifier si le username est déjà pris
	const usernameInvalid = db_user.find((user) => user.username === username);

	if (usernameInvalid) {
		return [
			HttpStatusCode.BadRequest,
			{
				message: "Nom d'utilisateur déjà utilisé",
			},
			{
				'Content-Type': 'text/plain',
			},
		];
	}

	/**
	 * Il s'agit d'un mock je ne vais donc pas vérifier de manière rigoureuse le mot de passe. Je vais simplement m'assurer qu'il a une longueur d'au moins 5 caractères.
	 */
	const isValidPassword = checkPassword(password);

	if (!isValidPassword) {
		return [
			HttpStatusCode.BadRequest,
			{
				message: 'Le mot de passe doit contenir au moins 5 caractères.',
			},
			{
				'Content-Type': 'text/plain',
			},
		];
	}

	// Autrement, on créé l'utilisateur et on l'ajoute à la "base de donnée", il faudrait crypter le password mais encore une fois, il s'agit d'un mock.
	const user = new User(username, password, rest);

	// On génère un token pour la reponse Ok.
	const jwt_key = process.env.EXPO_PUBLIC_JWT_KEY;
	const newToken = createJWT(
		{
			iss: user.id,
		},
		jwt_key,
		'1h'
	);

	return [
		HttpStatusCode.Ok,
		{
			user,
			newToken,
		},
		{
			'Content-Type': 'application/json',
		},
	];
}
