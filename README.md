# ECOVOIT

Application web de covoiturage dédiée aux habitants de La Rochelle. L'application facilitera la mise en relation pour le partage de trajets, la réservation de places, et le calcul des émissions de CO2, favorisant ainsi une mobilité durable dans la ville.
Ce dépot contient le front-end et necessite la partie backend dont le code est disponible [ici](https://gitlab.univ-lr.fr/projets-l2-2024/quantum-quartet/covoiturage-la-rochelle/EcovoitAPI)
## Licence
[![License: LGPL v3](https://img.shields.io/badge/License-LGPL_v3-orange.svg)](LICENSE.MD)

## Installation et Démarrage

### Prérequis

Assurez-vous d'avoir installé les outils suivants sur votre machine :

- [Node.js](https://nodejs.org/fr) (version 22.13 ou supérieure)
- npm
- [Android Studio](https://developer.android.com/studio?hl=fr) with SDK 35 android device setuped

### Cloner le projet

Commencez par cloner le dépôt :

```bash
git clone [https://gitlab.univ-lr.fr/projets-l2-2024/quantum-quartet/covoiturage-la-rochelle/ecovoit.git](https://github.com/SautiereQDev/Ecovoit.git)
```

```bash
cd ecovoit
```

### Installer les dépendances

Installez les dépendances du projet en exécutant :

```bash
npm install
```

### Démarrer le projet

Pour lancer le projet, ouvrer une emulation d'android et exécutez la commande suivante :

```bash
npm run android
```

## Fabriqué avec

- [React Native](https://reactnative.dev/) - Framework d'applications mobiles (front-end)
- [Expo](https://expo.dev/) - Outil permettant de développer des applications mobiles natives universelles

## Dépendances externes

- [react-hook-form](https://react-hook-form.com/) - Librairie de gestion de formulaires
- [zod](https://zod.dev/) - Librairie de validation de données
- [fuse.js](https://fusejs.io/) - Librairie de recherche
- [axios](https://axios-http.com/) - Librairie de requêtes HTTP
- [react-query](https://react-query.tanstack.com/) - Librairie de gestion de données

## Versions
[**1.0.0**](https://github.com/SautiereQDev/Ecovoit/releases/tag/1.0.0) - Definitive

## Auteurs
- **Quentin Sautière** _alias_ [@qsautier](https://gitlab.univ-lr.fr/qsautier): Designer, Programmer, Maintainer
- **Axel Pelleray-Guilhem** _alias_ [@xibitol](https://gitlab.univ-lr.fr/xibitol): Maintener, Programmer
- **Maxime Chasles** _alias_ [@mchasles](https://gitlab.univ-lr.fr/mchasles): Programmer
- **Cody Six** _alias_ [@csix](https://gitlab.univ-lr.fr/csix): Programmer
