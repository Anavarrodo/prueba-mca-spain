import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Cross from '../assets/svg/Cross';

const Search = ({ value, onChange, className }) => {
  const [valueInput, setValueInput] = useState(value);
  const autoFocus = useCallback((i) => (i ? i.focus() : null), []);

  useEffect(() => {
    setValueInput(value);
  }, [value]);

  const eventChange = (e) => {
    setValueInput(e.target.value);
    onChange && onChange(e.target.value);
  };

  const reset = () => {
    setValueInput('');
    onChange && onChange('');
  };

  return (
    <Container className={className}>
      <InputCustom
        ref={autoFocus}
        placeholder='Buscar'
        value={valueInput || ''}
        onChange={(e) => eventChange(e)}
      />
      <Icon onClick={() => reset()}>
        <Cross />
      </Icon>
    </Container>
  );
};

export default Search;

const Container = styled.div`
  position: relative;
`;

const InputCustom = styled.input`
  width: 100%;
  height: 42px;
  background: #ffffff;
  border-bottom: 1px solid #333333;
  border-right: none;
  border-left: none;
  border-top: none;
  box-sizing: border-box;
  color: #333333;
  padding-left: 12px;
  &:focus {
    outline: none;
  }
  ::placeholder {
    font-family: Montserrat-Regular;
    font-size: 12px;
    color: #333333;
  }
`;

const Icon = styled.div`
  && > svg {
    position: absolute;
    right: 22px;
    top: 16px;
    cursor: pointer;
    pointer-events: all;
  }
`;

Search.propTypes = {
  /**
   * Texto introducido en el buscador
   */
  value: PropTypes.string,
  /**
   * Función onChange
   */
  onChange: PropTypes.func,
};
