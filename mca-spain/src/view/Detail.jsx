import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import { url } from '../utils/url';
import { ROOT_PATH } from '../utils/paths';
import styled from 'styled-components';
import BreadCrumbs from '../components/BreadCrumbs';
import Image from '../components/Image';
import DescriptionProductContainer from '../containers/DescriptionProductContainer';
import Text from '../components/Text';
import useResponsive from '../utils/useResponsive';
import LoadingContainer from '../containers/LoadingContainer';
import ColorsContainer from '../containers/ColorsContainer';
import StoragesContainer from '../containers/StoragesContainer';
import Button from '../components/Button';
import useSessionStorage from '../utils/sessionStorage';

function Detail() {
  const history = useHistory();
  const location = useLocation();
  const { state } = location;
  const mobile = useResponsive(931);
  const [product, setProduct] = useSessionStorage('currentProduct', []);
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

  useEffect(() => {
    if (Object.keys(product).length === 0) getCurrentProduct(state.id);
  }, []);

  const getCurrentProduct = (id) => {
    axios
      .get(`${url}/api/product/${id}`)
      .then((response) => {
        let specifications = [
          response.data.cpu,
          response.data.ram,
          response.data.os,
          response.data.displayResolution,
          response.data.battery,
          response.data.primaryCamera,
          response.data.dimentions,
          response.data.weight + ' gr',
        ];
        setProduct(response.data);
        setDataDescription(specifications);
        if (response.data.options.colors.length === 1)
          setColorSelected(response.data.options.colors[0].code);
        if (response.data.options.storages.length === 1)
          setStorageSelected(response.data.options.storages[0].code);
      })
      .catch((e) => {
        // MOSTRAR MENSAJE DE ERROR EN LA VISTA 500 y 504
        console.log(e);
      });
  };

  const handleChangeColor = (code) => {
    setColorSelected(code);
  };

  const handleChangeStorage = (code) => {
    setStorageSelected(code);
  };

  const submit = () => {
    axios
      .post(`${url}/api/cart`, {
        id: product.id,
        colorCode: colorSelected,
        storageCode: storageSelected,
      })
      .then(
        (response) => {
          if (response.status === 200) {
            history.push(ROOT_PATH);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };

  if (product.length === 0) {
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
            <DescriptionProductContainer dataDescription={dataDescription} />
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

const Container = styled.section`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin: 0 auto;
  padding: 24px 42px;
`;

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
