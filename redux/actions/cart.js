// redux/actions/cart.js
export const addToCart = (product) => ({
    type: 'ADD_TO_CART',
    payload: product,
  });

  export const removeFromCart = (productId) => ({
    type: 'REMOVE_FROM_CART',
    payload: productId,
  });

  export const updateQty = (productId, qty) => ({
    type: 'UPDATE_QTY',
    payload: { productId, qty },
  });
  
  
export const initiatePurchase = (cartItems) => ({
  type: 'INITIATE_PURCHASE',
  payload: cartItems,
});
  // Add other actions as needed
  