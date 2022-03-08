export const currentProductType = {
    SET_CURRENT_PRODUCT: 'SET_CURRENT_PRODUCT',
    REMOVE_CURRENT_PRODUCT: 'REMOVE_CURRENT_PRODUCT'
}

export const setCurrentProduct= payload => ({ type: currentProductType.SET_CURRENT_PRODUCT, payload });
export const removeCurrentProduct = () => ({ type: currentProductType.REMOVE_CURRENT_PRODUCT });
  