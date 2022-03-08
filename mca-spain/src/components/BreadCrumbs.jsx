import React, { Fragment } from 'react';
import styled from 'styled-components';
import ArrowNavegation from '../assets/svg/ArrowNavegation';
import Text from './Text';

const BreadCrumbs = ({ crumbs, selectLastBreadCrumb }) => {
  return (
    <Container>
      {crumbs.map((element, index) => {
        return (
          <Fragment key={'crumb' + index}>
            {index === 0 ? (
              <>
                <CrumbLeft onClick={() => element.onClick && element.onClick()}>
                  <InitialCrumb
                    text={element.title}
                    hover={crumbs.length > 1}
                  />
                </CrumbLeft>
                <ArrowNavegation />
              </>
            ) : (
              <CrumbRight onClick={() => element.onClick && element.onClick()}>
                <Crumb
                  text={element.title}
                  selected={index === crumbs.length - 1 && selectLastBreadCrumb}
                />
              </CrumbRight>
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
`;

const CrumbLeft = styled.div`
  height: 18px;
  margin: -5px -2px 0px 0px;
  width: auto;
`;

const CrumbRight = styled(CrumbLeft)`
  width: auto;
`;

const InitialCrumb = styled(Text)`
  &:hover {
    ${({ hover }) =>
      hover &&
      `text-decoration: underline #333333;
        cursor: pointer;
    `}
  }
`;

const Crumb = styled(Text)`
  height: 18px;
  color: ${({ selected }) => (selected ? '#06c' : '333333')};
  cursor: ${({ selected }) => (selected ? 'default' : 'pointer')};
`;
