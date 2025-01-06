# Parcourir le projet Ecovoit

## Ouverture de l'app :

- Affichage du _splashscreen_ pendant le chargement.
- On vérifie dans le `SecureStorage` si un _Token de session_ est présent.

> Si **non** : soit il n'est pas _inscrit_ (a), soit il est _inscrit_ mais s'est préalablement _déconnecté_ (b).

> Si **oui** : alors il est _inscrit_ et toujours _connecté_ (sa session est toujours active) (c).

## Processus d'authentification

### (a) L'utilisateur n'est pas inscrit :

- Il se dirige vers le groupe `(auth)` à `/register` et effectue son processus d'inscription qui commence par la page `index.tsx` et termine par `pictureBio.tsx`. Celui-ci aboutit à un `POST /users`. En cas de succès, l'utilisateur est maintenant _connecté_. Il me semble pertinent de le rediriger vers `(app)/(tabs)/index.tsx` (la page d'accueil). Afin de maintenir sa session active côté client, son _id_ (faisant office de Token pour interagir avec l'API) est stocké localement dans le `SecureStorage`; cela lui évite de se reconnecter à chaque fois qu'il utilise l'application. J'entends que ce n'est pas la meilleure approche car il n'est pas possible de définir une période de validité à la session. Tant que l'utilisateur ne se _déconnecte_ pas il reste donc _connecté_. Cela dit, à mon sens cela me paraît plutôt naturel.

### (b) L'utilisateur est inscrit et déconnecté :

- Il se dirige vers le groupe `(auth)` à `/connexion` et effectue son processus de connexion avec identifiant (username ou email) et mot de passe. En théorie, cela devrait aboutir à un `GET /auth` (à priori cela n'est pas implémenté). En cas de succès, l'utilisateur est à présent _connecté_ et sa session est active (stockage de son _id_ dans le `SecureStorage`). De même que pour le cas (a), il est redirigé vers la page d'accueil.

### (c) L'utilisateur est connecté (sa session est toujours active) :

- Il est directement redirigé vers la page d'accueil.

## L'utilisateur est maintenant connecté :

- L'utilisateur peut naviguer entre les onglets `(app)/(tabs)` :

  - `index.tsx` : page d'accueil.
  - `/searchTrip/search.tsx` : recherche d'un trajets en tant que _passager_.
  - `/profile` : profil de l'utilisateur, il peut le modifier, gérer ses véhicules, gérer ses trajets et se déconnecter.
  - `/post-trip` : publication d'un trajet en tant que _conducteur_.

## Déconnexion

- L'utilisateur peut se déconnecter à tout moment en cliquant sur le bouton prévu à cet effet dans son profil. Cela a pour effet de supprimer le _Token de session_ du `SecureStorage` et de le rediriger vers la page `(auth)/connexion`.

## Création d'un trajet

- L'utilisateur peut publier un trajet en tant que _conducteur_ en se rendant sur la page `/post-trip`. Il doit renseigner les informations nécessaires à la publication de son trajet. Cela aboutit à un `POST /trips`.
  En cas de succès, le trajet est ajouté à la base de donnée et l'utilisateur est redirigé vers la page d'accueil.

## Recherche d'un trajet

- L'utilisateur peut rechercher un trajet en tant que _passager_ en se rendant sur la page `/searchTrip/search.tsx`. Il doit renseigner les informations nécessaires à la recherche de son trajet. Cela aboutit à un `GET /trips?from=...&to=...&date=...`.
  En cas de succès, les trajets correspondants à la recherche sont affichés.

## Profil

- L'utilisateur peut consulter son profil en se rendant sur la page `/profile`. Il peut le modifier, gérer ses véhicules, gérer ses trajets et se déconnecter.

## Gestion des véhicules

- L'utilisateur peut gérer ses véhicules en se rendant sur la page `/profile/vehicles`. Il peut ajouter, modifier ou supprimer un véhicule.

## Gestion des trajets

- L'utilisateur peut gérer ses trajets en se rendant sur la page `/profile/trips`. Il peut consulter, modifier ou supprimer un trajet.

- En tant que _conducteur_, il peut consulter ses trajets via `GET /trips/{id}`.

- En tant que _passager_, il peut consulter ses trajets via `GET /users/me`
