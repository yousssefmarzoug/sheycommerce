// Importation du module axios pour effectuer des requêtes HTTP
import axios from "axios";

// Action pour récupérer tous les produits
export const getAllProducts = () => (dispatch) => {
  dispatch({ type: "GET_PRODUCTS_REQUEST" }); // Déclencheur de la requête

  axios
    .get("/api/products/getallproducts") // Requête GET pour obtenir tous les produits
    .then((res) => {
      console.log(res); // Affichage de la réponse pour le débogage

      // Dispatch d'une action pour indiquer le succès et envoi des données des produits
      dispatch({ type: "GET_PRODUCTS_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      console.log(err); // Affichage de l'erreur en cas d'échec
      dispatch({ type: "GET_PRODUCTS_FAILED", payload: err });
    });
};

// Action pour récupérer un produit par son ID
export const getProductById = (productid) => (dispatch) => {
  dispatch({ type: "GET_PRODUCTBYID_REQUEST" }); // Déclencheur de la requête

  axios
    .post("/api/products/getproductbyid", { productid }) // Requête POST pour obtenir un produit par son ID
    .then((res) => {
      console.log(res); // Affichage de la réponse pour le débogage

      // Dispatch d'une action pour indiquer le succès et envoi des données du produit
      dispatch({ type: "GET_PRODUCTBYID_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      console.log(err); // Affichage de l'erreur en cas d'échec
      dispatch({ type: "GET_PRODUCTBYID_FAILED", payload: err });
    });
};

// Action pour filtrer les produits en fonction de la recherche, du tri et de la catégorie
export const filterProducts = (searchKey, sortKey, category) => (dispatch) => {
  var filteredproducts;
  dispatch({ type: 'GET_PRODUCTS_REQUEST' }); // Déclencheur de la requête

  axios.get('/api/products/getallproducts').then(res => {
    filteredproducts = res.data; // Récupération de tous les produits

    // Filtrage par mot-clé de recherche
    if (searchKey) {
      filteredproducts = res.data.filter(product => {
        return product.name.toLowerCase().includes(searchKey);
      });
    }

    // Tri par prix ou popularité
    if (sortKey !== 'popular') {
      if (sortKey === 'htl') {
        // Tri du plus élevé au plus bas prix
        filteredproducts = res.data.sort((a, b) => {
          return -a.price + b.price;
        });
      } else {
        // Tri du plus bas au plus élevé prix
        filteredproducts = res.data.sort((a, b) => {
          return a.price - b.price;
        });
      }
    }

    // Filtrage par catégorie
    if (category !== 'all') {
      filteredproducts = res.data.filter(product => {
        return product.category.toLowerCase().includes(category);
      });
    }

    // Dispatch d'une action avec les produits filtrés
    dispatch({ type: 'GET_PRODUCTS_SUCCESS', payload: filteredproducts });
  }).catch(err => {
    dispatch({ type: 'GET_PRODUCTS_FAILED' }); // En cas d'échec de la requête
  });
};

// Action pour ajouter un avis sur un produit
export const addProductReview = (review, productid) => (dispatch, getState) => {
  dispatch({ type: 'ADD_PRODUCT_REVIEW_REQUEST' }); // Déclencheur de la requête

  // Récupération de l'utilisateur actuel via le state
  const currentUser = getState().loginReducer.currentUser;

  // Requête POST pour ajouter un avis sur un produit
  axios.post('/api/products/addreview', { review, productid, currentUser }).then(res => {
    console.log(res); // Affichage de la réponse pour le débogage

    // Dispatch d'une action pour indiquer le succès de l'ajout de l'avis
    dispatch({ type: 'ADD_PRODUCT_REVIEW_SUCCESS' });
    alert('Votre avis a été soumis avec succès');
    window.location.reload(); // Rechargement de la page
  }).catch(err => {
    dispatch({ type: 'ADD_PRODUCT_REVIEW_FAILED' }); // En cas d'échec de la requête
  });
};

// Action pour supprimer un produit
export const deleteProduct = (productid) => (dispatch) => {
  dispatch({ type: 'DELETE_PRODUCT_REQUEST' }); // Déclencheur de la requête

  // Requête POST pour supprimer un produit
  axios.post('/api/products/deleteproduct', { productid }).then(res => {
    dispatch({ type: 'DELETE_PRODUCT_SUCCESS', payload: res.data }); // Dispatch d'une action en cas de succès
    alert('Produit supprimé avec succès');
    window.location.reload(); // Rechargement de la page
  }).catch(err => {
    dispatch({ type: 'DELETE_PRODUCT_FAILED', payload: err }); // En cas d'échec de la requête
  });
};

// Action pour ajouter un produit
export const addProduct = (product) => (dispatch) => {
  dispatch({ type: 'ADD_PRODUCT_REQUEST' }); // Déclencheur de la requête

  // Requête POST pour ajouter un produit
  axios.post('/api/products/addproduct', { product }).then(res => {
    console.log(res); // Affichage de la réponse pour le débogage
    dispatch({ type: 'ADD_PRODUCT_SUCCESS' }); // Dispatch d'une action en cas de succès
    window.location.reload(); // Rechargement de la page
  }).catch(err => {
    dispatch({ type: 'ADD_PRODUCT_FAILED' }); // En cas d'échec de la requête
  });
};

// Action pour mettre à jour un produit
export const updateProduct = (productid, updatedproduct) => (dispatch) => {
  dispatch({ type: 'UPDATE_PRODUCT_REQUEST' }); // Déclencheur de la requête

  // Requête POST pour mettre à jour un produit
  axios.post('/api/products/updateproduct', { productid, updatedproduct }).then(res => {
    console.log(res); // Affichage de la réponse pour le débogage
    dispatch({ type: 'UPDATE_PRODUCT_SUCCESS' }); // Dispatch d'une action en cas de succès
    window.location.href = '/admin/productslist'; // Redirection vers la liste des produits
  }).catch(err => {
    dispatch({ type: 'UPDATE_PRODUCT_FAILED' }); // En cas d'échec de la requête
  });
};
