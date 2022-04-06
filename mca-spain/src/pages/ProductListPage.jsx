import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import apiServices from '../services/api';
import { BreadCrumbs, Item, Search, Container, Text } from '../components';
import LoadingContainer from '../containers/LoadingContainer';
import FilterContainer from '../containers/FilterContainer';
import useResponsive from '../hooks/useResponsive';
import { PRODUCT_PATH } from '../utils/paths';
import useLocalStorage from '../hooks/localStorage';
import Lens from '../assets/svg/Lens';
import BugContainer from '../containers/BugContainer';
import { getFilter, removeLocalStorage } from '../utils/functions';

const ProductListPage = () => {
  const history = useHistory();
  const location = useLocation();
  const mobile = useResponsive(931);
  const [productsOriginal, setProductsOriginal] = useLocalStorage('products', []);
  const [productsFilter, setProductsFilter] = useLocalStorage('productsFilter', []);
  const [value, setValue] = useLocalStorage('valueFilter', '');
  const [showSearch, setShowSearch] = useLocalStorage('showSearch', false);
  const [showError, setShowError] = useState(false);


  useEffect(() => {
    if (productsOriginal.length === 0) getProducts();
    if (location.state && location.state.access === 'init') {
      setShowSearch(false);
      setValue('');
      setProductsFilter(productsOriginal);
    }
    removeLocalStorage(['currentProduct', 'specifications', 'colorSelected', 'storageSelected', ]);
  }, [location.state]);

  const onChangeSearch = (e) => {
    setValue(e);
    setProductsFilter(getFilter(productsOriginal, e));
  };

  const getProducts = () => {
    apiServices
      .getApiProducts()
      .then((products) => {
        setProductsOriginal(products);
        setProductsFilter(products);
      })
      .catch((e) => {
        if (e.response.status === 500 || e.response.status === 504)
          setShowError(true);
      });
  };

  if (productsOriginal.length === 0 && !showError) {
    return <LoadingContainer />;
  } else {
    return (
      <Container>
        <SubHeader>
          <BreadCrumbs
            selectLastBreadCrumb={true}
            crumbs={[
              {
                title: 'Listado de productos',
              },
            ]}
          />
          {!showError && (
            <ContainerTextSearch onClick={() => setShowSearch(true)}>
              <Lens />
              <TextSearch text='Buscar' />
            </ContainerTextSearch>
          )}
        </SubHeader>

        {showSearch && (
          <Search
            value={value}
            onChange={(e) => {
              onChangeSearch(e);
            }}
          />
        )}
        {productsFilter.length === 0 && !showError && (
          <FilterContainer value={value} />
        )}
        {showError ? (
          <BugContainer />
        ) : (
          <ContainerItem mobile={mobile}>
            {productsFilter.length > 0 &&
              productsFilter.map((product, index) => (
                <Item
                  key={'product' + index}
                  onClick={() =>
                    history.push({
                      pathname: `${PRODUCT_PATH}/${product.id}`,
                      state: { id: product.id },
                    })
                  }
                  urlImg={product.imgUrl}
                  brand={product.brand}
                  model={product.model}
                  price={product.price}
                />
              ))}
          </ContainerItem>
        )}
      </Container>
    );
  }
};

export default ProductListPage;

const SubHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
`;

const ContainerTextSearch = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin: auto 0px;
`;

const TextSearch = styled(Text)`
  margin-left: 8px;
`;

const ContainerItem = styled.div`
  display: ${({ mobile }) => (mobile ? 'flex' : 'grid')};
  flex-direction: ${({ mobile }) => (mobile ? 'column' : 'row')};
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
`;
