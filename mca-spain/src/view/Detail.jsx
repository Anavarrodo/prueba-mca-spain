import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCurrentProduct } from '../redux/actions/currentProductActions';
import axios from 'axios';
import { url } from '../utils/url';
import { ROOT_PATH } from '../utils/paths';
import styled from 'styled-components';
import BreadCrumbs from '../components/BreadCrumbs';
import Image from '../components/Image';
import DescriptionProduct from '../components/DescriptionProduct';
import Text from '../components/Text';
import useResponsive from '../utils/useResponsive';
import Loading from '../components/Loading';
import ContainerColors from '../components/ContainerColors';
import ContainerStorage from '../components/ContainerStorage';
import Button from '../components/Button';

function Detail({ actions, currentProductReducers }) {
  const history = useHistory();
  const location = useLocation();
  const { state } = location;
  const mobile = useResponsive(931);
  const [product, setProduct] = useState(currentProductReducers.product ?? []);
  const [dataDescription, setDataDescription] = useState(
    currentProductReducers.specifications ?? []
  );
  const [colorSelected, setColorSelected] = useState('');
  const [storageSelected, setStorageSelected] = useState('');
  console.log(colorSelected);
  console.log(storageSelected);

  useEffect(() => {
    if (Object.keys(currentProductReducers).length === 0)
      getCurrentProduct(state.id);
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
        actions.setCurrentProduct({
          product: response.data,
          specifications: specifications,
        });
      })
      .catch((e) => {
        // MOSTRAR MENSAJE DE ERROR EN LA VISTA 500 y 504
        console.log(e);
      });
  };

  const handleChangeColor = (code) => {
    // GUARDAR COLOR SELECCIONADO
    setColorSelected(code);
  };

  const handleChangeStorage = (code) => {
    // GUARDAR COLOR SELECCIONADO
    setStorageSelected(code);
  };

  if (Object.keys(currentProductReducers).length === 0) {
    return (
      <ContainerLoading>
        <Loading />
      </ContainerLoading>
    );
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
            <DescriptionProduct
              nameProduct={`Compra un ${product.brand} ${product.model}`}
              dataDescription={dataDescription}
            />
            <RowActions>
              <Title mobile={mobile} text='Acciones' />
              <ContainerActions mobile={mobile}>
                <CustomContainerColors
                  mobile={mobile}
                  onClick={(e) => handleChangeColor(e)}
                  colors={product.options.colors}
                  title='Elige un acabado'
                />
                <CustomContainerStorage
                  mobile={mobile}
                  onClick={(e) => handleChangeStorage(e)}
                  title='Elige la capacidad'
                  storages={product.options.storages}
                />
              </ContainerActions>
            </RowActions>
            <ContainerButton mobile={mobile}>
              <Button
                text='Añadir al carrito'
                disabled={colorSelected === '' || storageSelected === ''}
                onClick={() => console.log('clcik')}
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

const mapStateToProps = ({ currentProductReducers }) => ({
  currentProductReducers,
});
const matchDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ setCurrentProduct }, dispatch),
});
export default connect(mapStateToProps, matchDispatchToProps)(Detail);

const Container = styled.section`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin: 0 auto;
  padding: 24px 42px;
`;

const ContainerLoading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: calc(100vh - 50px);
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
  width: 80%;
  ${({ mobile }) => mobile && 'margin: auto;'};
`;

const RowActions = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const Title = styled(Text)`
color: #06c;
  margin: ${({ mobile }) => (mobile ? 'auto' : '17px')};
`;
const ContainerActions = styled.div`
  display: flex;
  ${({ mobile }) => mobile && `flex-direction: column;`}
`;

const CustomContainerColors = styled(ContainerColors)`
  ${({ mobile }) =>
    mobile &&
    `    
      display: flex;
      flex-direction: column;
      align-items: center;
    `}
`;

const CustomContainerStorage = styled(ContainerStorage)`
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
