// Importation du module axios pour effectuer des requêtes HTTP
import axios from "axios";

// Action pour passer une commande
export const placeOrder = (token, subtotal) => (dispatch, getState) => {
    const currentUser = getState().loginReducer.currentUser; // Récupération de l'utilisateur actuel
    const demoItems = getState().cartReducer.cartItems; // Récupération des articles dans le panier

    const cartItems = []; // Initialisation du tableau pour les articles dans le panier

    for (let i = 0; i < demoItems.length; i++) {
        // Création d'un objet pour chaque article
        const item = {
            name: demoItems[i].name,
            quantity: demoItems[i].quantity,
            price: demoItems[i].price,
            _id: demoItems[i]._id
        };

        cartItems.push(item); // Ajout de l'article à la liste des articles du panier
    }

    dispatch({ type: 'PLACE_ORDER_REQUEST' }); // Déclencheur de la requête de commande

    axios.post('/api/orders/placeorder', { token, subtotal, currentUser, cartItems }) // Requête POST pour passer une commande
        .then(res => {
            dispatch({ type: 'PLACE_ORDER_SUCCESS' }); // Dispatch d'une action en cas de succès
            console.log(res); // Affichage de la réponse pour le débogage
        })
        .catch(err => {
            dispatch({ type: 'PLACE_ORDER_FAILED' }); // En cas d'échec de la commande
        });
};

// Action pour obtenir les commandes par ID utilisateur
export const getOrdersByUserId = () => (dispatch, getState) => {
    const userid = getState().loginReducer.currentUser._id; // Récupération de l'ID de l'utilisateur actuel

    dispatch({ type: 'GET_ORDERSBYUSERID_REQUEST' }); // Déclencheur de la requête pour obtenir les commandes par ID utilisateur

    axios.post('/api/orders/getordersbyuserid', { userid: userid }) // Requête POST pour obtenir les commandes par ID utilisateur
        .then(res => {
            dispatch({ type: 'GET_ORDERSBYUSERID_SUCCESS', payload: res.data }); // Dispatch d'une action en cas de succès
            console.log(res.data); // Affichage des données des commandes
        })
        .catch(err => {
            dispatch({ type: 'GET_ORDERSBYUSERID_FAILED', payload: err }); // En cas d'échec pour obtenir les commandes par ID utilisateur
        });
};

// Action pour obtenir une commande par son ID
export const getOrderById = (orderid) => (dispatch, getState) => {
    dispatch({ type: 'GET_ORDERBYID_REQUEST' }); // Déclencheur de la requête pour obtenir une commande par ID

    axios.post('/api/orders/getorderbyid', { orderid: orderid }) // Requête POST pour obtenir une commande par son ID
        .then(res => {
            dispatch({ type: 'GET_ORDERBYID_SUCCESS', payload: res.data }); // Dispatch d'une action en cas de succès
            console.log(res.data); // Affichage des données de la commande
        })
        .catch(err => {
            dispatch({ type: 'GET_ORDERBYID_FAILED', payload: err }); // En cas d'échec pour obtenir une commande par son ID
        });
};

// Action pour obtenir toutes les commandes
export const getAllOrders = () => (dispatch, getState) => {
    dispatch({ type: 'GET_ALLORDERS_REQUEST' }); // Déclencheur de la requête pour obtenir toutes les commandes

    axios.get('/api/orders/getallorders') // Requête GET pour obtenir toutes les commandes
        .then(res => {
            dispatch({ type: 'GET_ALLORDERS_SUCCESS', payload: res.data }); // Dispatch d'une action en cas de succès
            console.log(res.data); // Affichage des données de toutes les commandes
        })
        .catch(err => {
            dispatch({ type: 'GET_ALLORDERS_FAILED', payload: err }); // En cas d'échec pour obtenir toutes les commandes
        });
};
