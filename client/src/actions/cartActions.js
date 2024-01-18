// Déclaration d'une fonction addToCart prenant un produit et une quantité en paramètres
export const addToCart = (product, quantity) => (dispatch, getState) => {
  // Création d'un objet cartItem contenant les détails du produit à ajouter au panier
  const cartItem = {
      name: product.name,
      _id: product._id,
      price: product.price,
      countInStock: product.countInStock,
      quantity: quantity
  };

  // Dispatch d'une action avec le type 'ADD_TO_CART' et les détails du produit en payload
  dispatch({ type: 'ADD_TO_CART', payload: cartItem });

  // Stockage des éléments du panier dans le localStorage en les convertissant en chaîne JSON
  localStorage.setItem('cartItems', JSON.stringify(getState().cartReducer.cartItems));
};

// Déclaration d'une fonction deleteFromCart prenant un élément du panier en paramètre
export const deleteFromCart = (item) => (dispatch, getState) => {
  // Dispatch d'une action avec le type 'DELETE_FROM_CART' et l'élément à supprimer en payload
  dispatch({ type: 'DELETE_FROM_CART', payload: item });

  // Mise à jour des éléments du panier dans le localStorage en les convertissant en chaîne JSON
  localStorage.setItem('cartItems', JSON.stringify(getState().cartReducer.cartItems));
};
