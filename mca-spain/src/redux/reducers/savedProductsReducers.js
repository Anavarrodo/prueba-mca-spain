import { savedProductsType } from '../actions/savedProductsActions';
const SAVED_PRODUCTS_KEY = 'SAVED_PRODUCTS';
let initialSavedProducts = [];

if (typeof Storage !== 'undefined') {
  let savedSProducts = localStorage.getItem(SAVED_PRODUCTS_KEY);
  if (savedSProducts) {
    savedSProducts = JSON.parse(savedSProducts);
    initialSavedProducts = savedSProducts;
  }
} else {
  console.warn('Your browser doesn\'t support localstorage')
}

const reducer = (state = initialSavedProducts, action) => {
  let savedProducts;
  switch (action.type) {
    case savedProductsType.SET_SAVED_PRODUCTS: {
      savedProducts = {...state, ...action.payload};
      localStorage.setItem(SAVED_PRODUCTS_KEY, JSON.stringify(savedProducts));
      return savedProducts;
    }
    case savedProductsType.REMOVE_SAVED_PRODUCTS: {
        localStorage.removeItem(SAVED_PRODUCTS_KEY);
        return [];
      }
    default: {
      return state;
    }
  }
}

export default reducer;
