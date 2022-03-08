import { currentProductType } from '../actions/currentProductActions';
const CURRENT_PRODUCT_KEY = 'CURRENT_PRODUCT';
let initialCurrentProduct = [];

if (typeof Storage !== 'undefined') {
  let savedCurrentProduct = localStorage.getItem(CURRENT_PRODUCT_KEY);
  if (savedCurrentProduct) {
    savedCurrentProduct = JSON.parse(savedCurrentProduct);
    initialCurrentProduct = savedCurrentProduct;
  }
} else {
  console.warn('Your browser doesn\'t support localstorage')
}

const reducer = (state = initialCurrentProduct, action) => {
  let currentProduct;
  switch (action.type) {
    case currentProductType.SET_CURRENT_PRODUCT: {
      currentProduct = {...state, ...action.payload};
      localStorage.setItem(CURRENT_PRODUCT_KEY, JSON.stringify(currentProduct));
      return currentProduct;
    }
    case currentProductType.REMOVE_CURRENT_PRODUCT: {
        localStorage.removeItem(CURRENT_PRODUCT_KEY);
        return [];
      }
    default: {
      return state;
    }
  }
}

export default reducer;
