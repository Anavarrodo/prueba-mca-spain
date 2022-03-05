import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Search = ({ value, onChange }) => {
  const [valueInput, setValueInput] = useState(value);

  useEffect(() => {
    setValueInput(value);
  }, [value]);

  const eventChange = (e) => {
    setValueInput(e.target.value);
    onChange && onChange(e.target.value);
  };

  return (
    <Container>
      <InputCustom
        placeholder="Buscar"
        value={valueInput || ""}
        onChange={(e) => eventChange(e)}
      />
    </Container>
  );
};

export default Search;

const Container = styled.div`
  max-width: 300px;
  position: relative;
`;

const InputCustom = styled.input`
  width: 100%;
  height: 42px;
  background: #ffffff;
  border: 1px solid #ebebeb;
  box-sizing: border-box;
  border-radius: 6px;
  color: #333333;
  padding-left: 12px;
  &:focus {
    outline: none;
  }
`;
