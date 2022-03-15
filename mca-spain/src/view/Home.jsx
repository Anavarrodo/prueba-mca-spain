import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { url } from '../utils/url';
import BreadCrumbs from '../components/BreadCrumbs';
import Item from '../components/Item';
import Search from '../components/Search';
import Loading from '../components/Loading';
import Text from '../components/Text';
import useResponsive from '../utils/useResponsive';
import Mobile from '../assets/svg/Mobile';
import Lens from '../assets/svg/Lens';
import { DETAIL_PATH } from '../utils/paths';
import useSessionStorage from '../utils/sessionStorage';

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

  if (productsFilter.length === 0) {
    return (
      <ContainerLoading>
        <Loading />
      </ContainerLoading>
    );
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
        {productsFilter.length === 0 && (
          <ContainerMessage>
            <Mobile />
            <Text text={'SIN RESULTADOS DE BÚSQUEDA'} />
            <Text
              text={`NO SE HAN ENCONTRADO RESULTADOS PARA LA BÚSQUEDA: '${value}'`}
            />
          </ContainerMessage>
        )}
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

const ContainerLoading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: calc(100vh - 50px);
`;

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
const ContainerMessage = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: column;
  align-items: center;
`;

const ContainerItem = styled.div`
  display: ${({ mobile }) => (mobile ? 'flex' : 'grid')};
  flex-direction: ${({ mobile }) => (mobile ? 'column' : 'row')};
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
`;
