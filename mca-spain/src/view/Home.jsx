import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import apiServices from '../services/api';
import { BreadCrumbs, Item, Search, Container, Text } from '../components';
import LoadingContainer from '../containers/LoadingContainer';
import FilterContainer from '../containers/FilterContainer';
import useResponsive from '../hooks/useResponsive';
import { PRODUCT_PATH } from '../utils/paths';
import useSessionStorage from '../hooks/sessionStorage';
import Lens from '../assets/svg/Lens';
import BugContainer from '../containers/BugContainer';

const Home = () => {
  const history = useHistory();
  const [productsOriginal, setProductsOriginal] = useSessionStorage(
    'products',
    []
  );
  const [productsFilter, setProductsFilter] = useSessionStorage(
    'productsFilter',
    []
  );
  const [value, setValue] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showError, setShowError] = useState(false);
  const mobile = useResponsive();

  useEffect(() => {
    setValue('');
    setShowSearch(false);
    window.sessionStorage.removeItem('currentProduct');
    window.sessionStorage.removeItem('specifications');
    window.sessionStorage.removeItem('colorSelected');
    window.sessionStorage.removeItem('storageSelected');
    if (productsOriginal.length === 0) getProducts();
  }, []);

  const onChangeSearch = (e) => {
    setValue(e);
    const filtered = productsOriginal.filter(
      (i) =>
        i.model.toLowerCase().includes(e.toLowerCase()) ||
        i.brand.toLowerCase().includes(e.toLowerCase())
    );
    setProductsFilter(filtered);
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
          <Searcher>
            <CustomSearch
              value={value}
              onChange={(e) => {
                onChangeSearch(e);
              }}
            />
          </Searcher>
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

export default Home;

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

const Searcher = styled.div``;
const CustomSearch = styled(Search)`
  z-index: -1;
`;

const ContainerItem = styled.div`
  display: ${({ mobile }) => (mobile ? 'flex' : 'grid')};
  flex-direction: ${({ mobile }) => (mobile ? 'column' : 'row')};
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
`;
