import React, { Fragment } from 'react';
import styled from 'styled-components';
import ArrowNavegation from '../assets/svg/ArrowNavegation';

const BreadCrumbs = ({ crumbs, selectLastBreadCrumb }) => {
  return (
    <Container>
      {crumbs.map((element, index) => {
        return (
          <Fragment key={'crumb' + index}>
            {index === 0 ? (
              <>
                <InitialCrumb
                  onClick={() => element.onClick && element.onClick()}
                  hover={crumbs.length > 1}
                >
                  {element.title}
                </InitialCrumb>
                <ArrowNavegation />
              </>
            ) : (
              <Crumb
                onClick={() => element.onClick && element.onClick()}
                selected={index === crumbs.length - 1 && selectLastBreadCrumb}
              >
                {element.title}
              </Crumb>
            )}
          </Fragment>
        );
      })}
    </Container>
  );
};

export default BreadCrumbs;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  height: 18px;
`;

const InitialCrumb = styled.p`
  font-size: 16px;
  height: 21px;
  font-family: Montserrat-Regular;
  width: 24px;
  margin: 0px 20px 0px 0px;
  &:hover {
    ${({ hover }) =>
      hover &&
      `
        font-size: 17px;
        cursor: pointer;
        height: 23px;
    `}
  }
`;

const Crumb = styled.p`
  font-size: 16px;
  height: 21px;
  font-family: Montserrat-Regular;
  color: ${({ selected }) => (selected ? '#06c' : 'rgba(0, 0, 0, 0.28)')};
  cursor: ${({ selected }) => (selected ? 'default' : 'pointer')};
`;
