/**
 * Définition du type User correspondant au modèle de l'API.
 */
type User = {
	id: number; // Primary key
	firstName: string;
	lastName: string; // Nullable
	username: string; // Unique
	email: string;
	password: string;
	bio: string; // Nullable
	rank: string; // TODO: Je n'ai pas compris ce champ (voir avec Axel et Cody)
	verified: boolean;
};

/**
 * Quelques utilisateurs pour commencer à construire les pages de profil
 */
export const users: User[] = [
	{
		id: 1,
		firstName: "Alice",
		lastName: "Smith",
		username: "alice_smith",
		email: "alice@example.com",
		password: "password123",
		bio: "Lover of art and music.",
		rank: "User",
		verified: true,
	},
	{
		id: 2,
		firstName: "Bob",
		lastName: "Johnson",
		username: "bob_johnson",
		email: "bob@example.com",
		password: "password456",
		bio: "Tech enthusiast and gamer.",
		rank: "User",
		verified: false,
	},
	{
		id: 3,
		firstName: "Charlie",
		lastName: "Brown",
		username: "charlie_brown",
		email: "charlie@example.com",
		password: "password789",
		bio: "Writer and coffee lover.",
		rank: "Admin",
		verified: true,
	},
	{
		id: 4,
		firstName: "Diana",
		lastName: "Prince",
		username: "diana_prince",
		email: "diana@example.com",
		password: "securepass",
		bio: "Adventurer and activist.",
		rank: "User",
		verified: true,
	},
	{
		id: 5,
		firstName: "Edward",
		lastName: "Cullen",
		username: "edward_cullen",
		email: "edward@example.com",
		password: "mypassword",
		bio: "Vampire with a love for the night.",
		rank: "User",
		verified: false,
	},
];
