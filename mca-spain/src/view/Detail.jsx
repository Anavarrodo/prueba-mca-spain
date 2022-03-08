import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCurrentProduct } from '../redux/actions/currentProductActions';
import axios from 'axios';
import { url } from '../utils/url';
import { ROOT_PATH } from "../utils/paths";
import styled from "styled-components";
import BreadCrumbs from "../components/BreadCrumbs";

function Detail({ actions }) {
  const history = useHistory();
  const location = useLocation();
  const { state } = location;

  // const [product, setProduct] = useState( currentProductReducers ?? []);

  useEffect(() => {
    getCurrentProduct(state.id);
  }, []);

  const getCurrentProduct = (id) => {
    axios
      .get(`${url}/api/product/${id}`)
      .then((response) => {
        console.log(response);
        actions.setCurrentProduct(response.data);
      })
      .catch((e) => {
        // MOSTRAR MENSAJE DE ERROR EN LA VISTA 500 y 504
        console.log(e);
      });
  };

  return (
    <Container>
      <BreadCrumbs
        selectLastBreadCrumb={true}
        crumbs={[
          {
            title: "Listado de productos",
            onClick: () => {history.push(ROOT_PATH);
            actions.removeCurrentProduct()},
          },
          { title: "Detalle del producto" },
        ]}
      />
    </Container>
  );
}

const mapStateToProps = ({ currentProductReducers }) => ({ currentProductReducers });
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
