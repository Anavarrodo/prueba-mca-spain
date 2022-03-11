import React from 'react';
import styled from 'styled-components';

const Text = ({ text, className }) => {
    return <Message className={className}>{text}</Message>;
}

export default Text;

const Message = styled.span`
    font-size: 12px;
    font-family: Montserrat-Regular;
    color: #333333;
`;