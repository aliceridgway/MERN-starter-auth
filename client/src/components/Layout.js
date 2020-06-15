import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import background from '../images/background.jpg';

// 1. React Components

const Layout = ({ children }) => (
  <OuterContainer>
    {children}
  </OuterContainer>
);

export default Layout;

export const Inner = ({ children }) => (
  <InnerContainer>
    {children}
  </InnerContainer>
);

// 2. PropTypes

Layout.propTypes = {
  children: PropTypes.isRequired,
};

Inner.propTypes = {
  children: PropTypes.isRequired,
};

// 3. Styled Components

export const InnerContainer = styled.div`
    display:block;
    margin:0 auto;
    width:90vw;

    @media (min-width:768px){
        width:80vw;
        max-width:1280px;
    }
`;

const OuterContainer = styled.main`
  width:100vw;
`;
