import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import apiServices from '../services/api';
import { ROOT_PATH } from '../utils/paths';
import styled from 'styled-components';
import { BreadCrumbs, Image, Container, Text, Button } from '../components';
import DescriptionProductContainer from '../containers/DescriptionProductContainer';

import useResponsive from '../hooks/useResponsive';
import LoadingContainer from '../containers/LoadingContainer';
import ColorsContainer from '../containers/ColorsContainer';
import StoragesContainer from '../containers/StoragesContainer';
import BugContainer from '../containers/BugContainer';

import useSessionStorage from '../hooks/sessionStorage';
import { Context } from '../utils/context';

function Detail() {
  const history = useHistory();
  const location = useLocation();
  const { state } = location;
  const mobile = useResponsive(931);
  const [product, setProduct] = useSessionStorage('currentProduct', []);
  const { addToCart } = useContext(Context);
  const [dataDescription, setDataDescription] = useSessionStorage(
    'specifications',
    []
  );
  const [colorSelected, setColorSelected] = useSessionStorage(
    'colorSelected',
    ''
  );
  const [storageSelected, setStorageSelected] = useSessionStorage(
    'storageSelected',
    ''
  );
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (Object.keys(product).length === 0) getCurrentProduct();
  }, []);

  const getCurrentProduct = () => {
    apiServices
      .getApiDetailsProduct(state.id)
      .then((details) => {
        let specifications = [
          details.cpu,
          details.ram,
          details.os,
          details.displayResolution,
          details.battery,
          details.primaryCamera,
          details.dimentions,
          details.weight + ' gr',
        ];
        setProduct(details);
        setDataDescription(specifications);
        if (details.options.colors.length === 1)
          setColorSelected(details.options.colors[0].code);
        if (details.options.storages.length === 1)
          setStorageSelected(details.options.storages[0].code);
      })
      .catch((e) => {
        if (e.response.status === 500 || e.response.status === 504)
          setShowError(true);
      });
  };

  const handleChangeColor = (code) => {
    setColorSelected(code);
  };

  const handleChangeStorage = (code) => {
    setStorageSelected(code);
  };

  const submit = () => {
    let body = {
      id: product.id,
      colorCode: colorSelected,
      storageCode: storageSelected,
    };
    apiServices
      .getApiCart(body)
      .then((response) => {
        addToCart(response.count);
        history.push(ROOT_PATH);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  if (product.length === 0 && !showError) {
    return <LoadingContainer />;
  } else {
    return (
      <Container>
        <BreadCrumbs
          selectLastBreadCrumb={true}
          crumbs={[
            {
              title: 'Listado de productos',
              onClick: () => {
                history.push(ROOT_PATH);
              },
            },
            { title: 'Detalle del producto' },
          ]}
        />
        {showError ? (
          <BugContainer />
        ) : (
          <>
            <ProductInfo mobile={mobile}>
              <CustomText
                text={`${product.brand} ${product.model}`}
                mobile={mobile}
              />
              {product.price !== '' && (
                <CustomText text={`${product.price} EUR`} mobile={mobile} />
              )}
            </ProductInfo>
            <Columns mobile={mobile}>
              <FirstColumn>
                <Image src={product.imgUrl} />
              </FirstColumn>
              <SecondColumn mobile={mobile}>
                <Title
                  text={`Compra un ${product.brand} ${product.model}`}
                  mobile={mobile}
                />
                <Subtitle mobile={mobile} text='Especificaciones' />
                <DescriptionProductContainer
                  dataDescription={dataDescription}
                />
                <RowActions>
                  <Subtitle mobile={mobile} text='Acciones' />
                  <ContainerActions mobile={mobile}>
                    <CustomColorsContainer
                      mobile={mobile}
                      defaultSelect={colorSelected}
                      onClick={(e) => handleChangeColor(e)}
                      seleccion={colorSelected}
                      colors={product.options.colors}
                      title='Elige un acabado'
                    />
                    <CustomStoragesContainer
                      mobile={mobile}
                      onClick={(e) => handleChangeStorage(e)}
                      title='Elige la capacidad'
                      seleccion={storageSelected}
                      storages={product.options.storages}
                    />
                  </ContainerActions>
                </RowActions>
                <ContainerButton mobile={mobile}>
                  <Button
                    text='Añadir al carrito'
                    disabled={colorSelected === '' || storageSelected === ''}
                    onClick={() => submit()}
                  />
                </ContainerButton>
              </SecondColumn>
            </Columns>
          </>
        )}
      </Container>
    );
  }
}

// function TestComponent() {
//   const testRef = useRef(null);
//   const scrollToElement = () => testRef.current.scrollIntoView();
//   // Once the scrollToElement function is run, the scroll will show the element
//   return (
//     <>
//       <div ref={testRef}>Element you want to view</div>
//       <button onClick={scrollToElement}>Trigger the scroll</button>
//     </>
//   );
// }
export default Detail;

const ProductInfo = styled.div`
  height: ${({ mobile }) => (mobile ? '25px' : '42px')};
  border-bottom: 1px solid #333333;
  display: flex;
  padding-bottom: 18px;
  flex-direction: row;
  justify-content: space-between;
`;

const CustomText = styled(Text)`
  font-size: ${({ mobile }) => !mobile && '18px'};
`;

const Columns = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: ${({ mobile }) => (mobile ? 'column' : 'row')};
  padding: ${({ mobile }) => !mobile && '42px 120px'};
`;

const FirstColumn = styled.div`
  margin: auto;
`;

const SecondColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: ${({ mobile }) => (mobile ? '20px auto' : 'margin: auto')};
`;

const RowActions = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const Title = styled(Text)`
  margin: 17px;
  font-size: ${({ mobile }) => !mobile && '40px'};
  font-family: Montserrat-Bold;
  text-align: ${({ mobile }) => mobile && 'center'};
`;

const Subtitle = styled(Text)`
  color: #06c;
  margin: ${({ mobile }) => (mobile ? 'auto' : '17px')};
`;
const ContainerActions = styled.div`
  display: flex;
  ${({ mobile }) => mobile && `flex-direction: column;`}
`;

const CustomColorsContainer = styled(ColorsContainer)`
  ${({ mobile }) =>
    mobile &&
    `    
      display: flex;
      flex-direction: column;
      align-items: center;
    `}
`;

const CustomStoragesContainer = styled(StoragesContainer)`
  ${({ mobile }) =>
    mobile &&
    `    
      display: flex;
      flex-direction: column;
      align-items: center; 
      margin-top: 24px;
    `};
`;

const ContainerButton = styled.div`
  ${({ mobile }) => mobile && 'display: flex;'}
`;
