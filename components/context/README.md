# Contextes

Cette documentation présente les composants fournisseurs de contexte utilisés dans notre application. Ces composants jouent un rôle crucial en permettant de partager l'état et des fonctionnalités entre les différents composants sans avoir à passer des props manuellement à chaque niveau de la hiérarchie.

Chaque fournisseur de contexte est accompagné d'exemples d'utilisation pour faciliter leur intégration.

## `SessionProvider`

Le composant `SessionProvider` est un fournisseur de contexte pour gérer l'état de la session utilisateur. Il gère l'authentification, la connexion et la déconnexion des utilisateurs.

### Props

- `children`: Les composants enfants à rendre à l'intérieur du `SessionProvider`.

### État

Le composant maintient trois états :

- `currentUser`: Contient les informations de l'utilisateur actuellement connecté.
- `isAuthenticated`: Un booléen qui indique si l'utilisateur est authentifié (`true`) ou non (`false`).
- `isLoading`: Un booléen qui indique si une opération de chargement est en cours (`true`) ou non (`false`).

### Effets

Lors du premier rendu, le composant effectue les opérations suivantes :

- Vérifie la présence d'un token dans le `SecureStore`.
- Si un token est trouvé, l'état d'authentification est mis à jour.

### Méthodes

#### `onSignIn(credentials: CredentialsType)`

- **Description**: Tente de connecter l'utilisateur avec les identifiants fournis.
- **Paramètres**:
  - `credentials`: Un objet contenant `username` et `password`.
- **Effets**: Met à jour l'état `isAuthenticated` et `currentUser` en cas de succès.

#### `onSignOut()`

- **Description**: Déconnecte l'utilisateur actuel.
- **Effets**: Met à jour l'état `isAuthenticated` pour indiquer que l'utilisateur n'est plus connecté.

**TODO:** Mettre à jour `currentUser` avec une valeur nulle.

### Contexte

Le composant fournit un contexte `SessionContext` avec les valeurs suivantes :

- `currentUser`: Les informations de l'utilisateur actuellement connecté.
- `isAuthenticated`: Indique si l'utilisateur est authentifié.
- `isLoading`: Indique si une opération est en cours.
- `signIn`: Fonction pour tenter une connexion avec des identifiants.
- `signOut`: Fonction pour déconnecter l'utilisateur.
- `signUp`: Fonction non implémentée pour l'inscription.

### Exemple d'utilisation

```jsx
import { SessionProvider } from './SessionProvider';

function App() {
	return (
		<SessionProvider>
			<ChildComponent />
		</SessionProvider>
	);
}
```
