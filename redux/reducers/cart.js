const initialState = {
    cartItems: [],
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const updatedCartItems = state.cartItems.map(item =>
                (action.payload && action.payload.id && item.id === action.payload.id)
                    ? { ...item, qty: item.qty + 1 }
                    : item
            );

            if (!state.cartItems.some(item => item.id === action.payload.id)) {
                updatedCartItems.push({ ...action.payload });
            }

            return {
                ...state,
                cartItems: updatedCartItems,
            };


        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.id !== action.payload),
            };
            case 'UPDATE_QTY':
                const { productId, qty } = action.payload;
                return {
                  ...state,
                  cartItems: state.cartItems.map(item =>
                    item.id === productId ? { ...item, qty: qty } : item
                  ),
                };
              

        case 'INITIATE_PURCHASE':
            return {
                ...state,
                cartItems: [],
            };


        default:
            return state;
    }
};

export default cartReducer;
