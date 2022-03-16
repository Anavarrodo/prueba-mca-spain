import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { url } from '../utils/url';
import BreadCrumbs from '../components/BreadCrumbs';
import Item from '../components/Item';
import Search from '../components/Search';
import LoadingContainer from '../containers/LoadingContainer';
import Text from '../components/Text';
import useResponsive from '../utils/useResponsive';
import Lens from '../assets/svg/Lens';
import { DETAIL_PATH } from '../utils/paths';
import useSessionStorage from '../utils/sessionStorage';
import FilterContainer from '../containers/FilterContainer';
function Home() {
  const history = useHistory();
  const [productsOriginal, setProductsOriginal] = useSessionStorage(
    'products',
    []
  );
  const [productsFilter, setProductsFilter] = useSessionStorage('products', []);
  const [value, setValue] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const mobile = useResponsive();

  useEffect(() => {
    setValue('');
    setShowSearch(false);
    window.sessionStorage.removeItem('currentProduct');
    window.sessionStorage.removeItem('specifications');
    window.sessionStorage.removeItem('colorSelected');
    window.sessionStorage.removeItem('storageSelected');
    if (productsOriginal.length === 0) getApiProduct();
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

  const getApiProduct = () => {
    axios
      .get(`${url}/api/product`)
      .then((response) => {
        setProductsOriginal(response.data);
        setProductsFilter(response.data);
      })
      .catch((e) => {
        // MOSTRAR MENSAJE DE ERROR EN LA VISTA 500 y 504
        console.log(e);
      });
  };

  if (productsOriginal.length === 0) {
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
          <ContainerTextSearch onClick={() => setShowSearch(true)}>
            <Lens />
            <TextSearch text='Buscar' />
          </ContainerTextSearch>
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
        {productsFilter.length === 0 && <FilterContainer value={value} />}
        <ContainerItem mobile={mobile}>
          {productsFilter.length > 0 &&
            productsFilter.map((product, index) => (
              <Item
                key={'product' + index}
                onClick={() =>
                  history.push({
                    pathname: `${DETAIL_PATH}/${product.id}`,
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
      </Container>
    );
  }
}

export default Home;

const Container = styled.section`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin: 0 auto;
  padding: 24px 42px;
`;

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
const CustomSearch = styled(Search)``;
const ContainerItem = styled.div`
  display: ${({ mobile }) => (mobile ? 'flex' : 'grid')};
  flex-direction: ${({ mobile }) => (mobile ? 'column' : 'row')};
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
`;
