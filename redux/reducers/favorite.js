// reducers/favorite.js

const initialState = {
  favoriteItems: [],
};

const favoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_FAVORITES':
      return {
        ...state,
        favoriteItems: [
          ...(state.favoriteItems || []), 
          action.payload && action.payload.id ? action.payload : null,
        ].filter(Boolean), 
      };

    case 'REMOVE_FROM_FAVORITES':
      return {
        ...state,
        favoriteItems: state.favoriteItems.filter(item => item.id !== action.payload),
      };

    default:
      return state;
  }
};

export default favoriteReducer;
