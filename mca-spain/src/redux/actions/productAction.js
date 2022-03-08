export const productsType = {
    SET_PRODUCTS: 'SET_PRODUCTS',
    REMOVE_PRODUCTS: 'REMOVE_PRODUCTS'
}

export const setProducts= payload => ({ type: productsType.SET_PRODUCTS, payload });
export const removeProducts = () => ({ type: productsType.REMOVE_PRODUCTS });
  