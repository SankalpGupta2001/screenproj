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
          ...(state.favoriteItems || []), // Ensure state.favoriteItems is an array
          action.payload && action.payload.id ? action.payload : null,
        ].filter(Boolean), // Remove null values from the array
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
