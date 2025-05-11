# Sherpa UX

## Description
Sherpa UX est une application web composée d'un frontend en React.js et d'un backend en Node.js. Elle permet de gérer des fonctionnalités spécifiques pour une interface utilisateur robotique.

## Structure du projet

### Backend
Le dossier `backend` contient le code serveur de l'application. Il est construit avec Node.js et Express.

- `app.js` : Point d'entrée de l'application backend.
- `server.js` : Configuration et démarrage du serveur.
- `controllers/` : Contient les contrôleurs pour gérer les différentes routes et les interactions.
- `models/` : Contient les modèles de données (robot, missions et téléopération).
- `routes/` : Contient les définitions de routes pour accéder à la base de données ou à la WebSocket.

### Frontend
Le dossier `frontend` contient le code client de l'application. Il est construit avec React et Webpack.

- `package.json` : Dépendances et scripts pour le frontend.
- `tsconfig.json` : Configuration TypeScript.
- `webpack.config.ts` : Configuration Webpack.
- `public/` : Contient les fichiers statiques.
- `src/` : Contient le code source de l'application frontend.
- `assets/` : Contient toutes les images de l'application.
- `components/` : Contient les composants réutilisables de l'application, comme le header, le footer, le joystick, etc..
- `pages/` :  Contient les pages de l'application.
- `index.js` : Contient les routes d'accès de l'application.

### Maquettes
Le dossier `maquettes` contient les maquettes graphiques de l'application.

## Utilisation

### Démarrer le backend
1. Naviguez dans le dossier `backend` :
    ```sh
    cd backend
    ```
2. Démarrez le serveur :
    ```sh
    nodemon server
    ```

### Démarrer le frontend
1. Naviguez dans le dossier `frontend` :
    ```sh
    cd frontend
    ```
2. Démarrez l'application :
    ```sh
    npm start
    ```

### Utiliser docker
1. Lancer l'application Docker
    ```sh
    docker-compose up
    ```


### Push to registry

```bash
export CI_REGISTRY=registry-smr.norcan-group.com
export ux_version_tag=dev

export FRONTEND_IMAGE_NAME=$CI_REGISTRY/sherpa.os/sherpa.ux/sherpa.ux:frontend-$ux_version_tag
export BACKEND_IMAGE_NAME=$CI_REGISTRY/sherpa.os/sherpa.ux/sherpa.ux:backend-$ux_version_tag
export BRIDGE_IMAGE_NAME=$CI_REGISTRY/sherpa.os/sherpa.ux/sherpa.ux:bridge-$ux_version_tag

docker build -t $FRONTEND_IMAGE_NAME ./frontend
docker build -t $BACKEND_IMAGE_NAME ./backend
docker build -t $BRIDGE_IMAGE_NAME ./rosbridge

docker push $FRONTEND_IMAGE_NAME
docker push $BACKEND_IMAGE_NAME
docker push $BRIDGE_IMAGE_NAME
```