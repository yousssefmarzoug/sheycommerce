// Importation du module axios pour effectuer des requêtes HTTP
import axios from "axios";

// Action pour enregistrer un nouvel utilisateur
export const registerNewUser = (user) => (dispatch) => {
    dispatch({ type: 'USER_REGISTER_REQUEST' }); // Déclencheur de la requête d'enregistrement

    axios
        .post("/api/users/register", user) // Requête POST pour enregistrer un nouvel utilisateur
        .then(res => {
            dispatch({ type: 'USER_REGISTER_SUCCESS' }); // Dispatch d'une action en cas de succès
            console.log(res); // Affichage de la réponse pour le débogage
        })
        .catch(err => {
            dispatch({ type: 'USER_REGISTER_FAILED', payload: err }); // En cas d'échec de la requête
            console.log(err); // Affichage de l'erreur
        });
};

// Action pour connecter un utilisateur
export const loginUser = (user) => (dispatch) => {
    dispatch({ type: 'USER_LOGIN_REQUEST' }); // Déclencheur de la requête de connexion

    axios
        .post("/api/users/login", user) // Requête POST pour connecter un utilisateur
        .then(res => {
            dispatch({ type: 'USER_LOGIN_SUCCESS' }); // Dispatch d'une action en cas de succès de connexion
            localStorage.setItem('currentUser', JSON.stringify(res.data)); // Stockage des données de l'utilisateur connecté
            window.location.href = '/'; // Redirection vers la page principale
        })
        .catch(err => {
            dispatch({ type: 'USER_LOGIN_FAILED', payload: err }); // En cas d'échec de la connexion
            console.log(err); // Affichage de l'erreur
        });
};

// Action pour déconnecter un utilisateur
export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('currentUser'); // Suppression des données de l'utilisateur actuel
    localStorage.removeItem('cartItems'); // Suppression des articles dans le panier

    dispatch({ type: 'USER_LOGOUT' }); // Dispatch d'une action de déconnexion
    window.location.href = '/login'; // Redirection vers la page de connexion
};

// Action pour mettre à jour les informations d'un utilisateur
export const updateUser = (userid, updateduser) => (dispatch) => {
    dispatch({ type: 'USER_UPDATE_REQUEST' }); // Déclencheur de la requête de mise à jour

    axios
        .post("/api/users/update", { userid: userid, updateduser: updateduser }) // Requête POST pour mettre à jour un utilisateur
        .then(res => {
            dispatch({ type: 'USER_UPDATE_SUCCESS' }); // Dispatch d'une action en cas de succès de la mise à jour
            console.log(res); // Affichage de la réponse pour le débogage
            window.location.reload(); // Rechargement de la page
        })
        .catch(err => {
            dispatch({ type: 'USER_UPDATE_FAILED', payload: err }); // En cas d'échec de la mise à jour
            console.log(err); // Affichage de l'erreur
        });
};

// Action pour obtenir tous les utilisateurs
export const getAllUsers = () => (dispatch) => {
    dispatch({ type: 'GET_ALLUSERS_REQUEST' }); // Déclencheur de la requête pour obtenir tous les utilisateurs

    axios.get('/api/users/getallusers').then(res => {
        dispatch({ type: 'GET_ALLUSERS_SUCCESS', payload: res.data }); // Dispatch d'une action en cas de succès pour obtenir tous les utilisateurs
    }).catch(err => {
        dispatch({ type: 'GET_ALLUSERS_FAILED', payload: err }); // En cas d'échec pour obtenir tous les utilisateurs
    });
};

// Action pour supprimer un utilisateur
export const deleteUser = (userid) => (dispatch) => {
    dispatch({ type: 'DELETE_USER_REQUEST' }); // Déclencheur de la requête pour supprimer un utilisateur

    axios.post('/api/users/deleteuser', { userid }).then(res => {
        dispatch({ type: 'DELETE_USER_SUCCESS', payload: res.data }); // Dispatch d'une action en cas de succès de suppression
        alert('Utilisateur supprimé avec succès'); // Alerte de suppression réussie
        window.location.reload(); // Rechargement de la page
    }).catch(err => {
        dispatch({ type: 'DELETE_USER_FAILED', payload: err }); // En cas d'échec de la suppression
    });
};
