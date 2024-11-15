# Contextes

Cette documentation présente les composants fournisseurs de contexte utilisés dans notre application. Ces composants jouent un rôle crucial en permettant de partager l'état et des fonctionnalités entre les différents composants sans avoir à passer des props manuellement à chaque niveau de la hiérarchie.

Le contexte est particulièrement utile pour gérer des états globaux tels que l'authentification des utilisateurs, les préférences de l'application ou des services partagés. Les deux principaux fournisseurs de contexte que nous utilisons sont le `SessionProvider`, qui gère l'état de la session utilisateur, et le `MockServiceProvider`, qui fournit un contexte pour un service de simulation de requêtes vers une API afin de ne pas dépendre du back-end durant le développement.

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
import { SessionProvider } from "./SessionProvider";

function App() {
  return (
    <SessionProvider>
      <ChildComponent />
    </SessionProvider>
  );
}
```

## `MockServiceProvider`

Le composant `MockServiceProvider` fournit un contexte pour le service de simulation. Il exécute le service de simulation lors du premier rendu.

### Props

- `children`: Les composants enfants à rendre à l'intérieur du `MockServiceProvider`.

### Effets

Lors du premier rendu, le composant exécute la fonction `mockService` pour initialiser le service.

### Contexte

Le composant crée un contexte `MockServiceContext` avec une valeur par défaut de `null`.

### Exemple d'utilisation

```jsx
import { MockServiceProvider } from "./MockServiceProvider";

function App() {
  return (
    <MockServiceProvider>
      <ChildComponent />
    </MockServiceProvider>
  );
}
```
