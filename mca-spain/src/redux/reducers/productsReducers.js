import { productsType } from '../actions/productsActions';

const PRODUCTS_KEY = 'PRODUCTS';

let initialProducts = [];

if (typeof Storage !== 'undefined') {
  let savedProducts = localStorage.getItem(PRODUCTS_KEY);
  if (savedProducts) {
    savedProducts = JSON.parse(savedProducts);
    initialProducts = savedProducts;
  }
} else {
  console.warn('Your browser doesn\'t support localstorage')
}

const reducer = (state = initialProducts, action) => {
  switch (action.type) {
    case productsType.SET_PRODUCTS: {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(action.payload[0]));
      return action.payload[0];
    }
    case productsType.REMOVE_PRODUCTS: {
        localStorage.removeItem(PRODUCTS_KEY);
        return [];
      }
    default: {
      return state;
    }
  }
}

export default reducer;
