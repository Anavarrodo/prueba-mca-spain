import React from "react";
import styled from "styled-components";
import Buy from "../assets/svg/Buy";
import Text from "./Text";

const Header = ({ brand, onClick }) => {
  return (
    <Container>
      <Link onClick={() => onClick && onClick()}>
        <Brand text={brand} />
      </Link>
      <Buy />
    </Container>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
  background-color: #333333;
  height: 50px;
  box-sizing: border-box;
  justify-content: space-between;
  padding: 0px 42px;
`;

const Link = styled.div`
  display: flex;
  cursor: pointer;
`;

const Brand = styled(Text)`
  color: #d7d7d7;
  margin: auto;
`;
