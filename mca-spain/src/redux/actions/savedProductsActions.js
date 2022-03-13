export const savedProductsType = {
    SET_SAVED_PRODUCTS: 'SET_SAVED_PRODUCTS',
    REMOVE_SAVED_PRODUCTS: 'REMOVE_SAVED_PRODUCTS'
}

export const setSavedProducts= payload => ({ type: savedProductsType.SET_SAVED_PRODUCTS, payload });
export const removeSavedProducts = () => ({ type: savedProductsType.REMOVE_SAVED_PRODUCTS });
  