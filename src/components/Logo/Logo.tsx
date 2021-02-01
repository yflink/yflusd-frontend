import React from 'react';
import styled from 'styled-components';

import yflusd from '../../assets/img/yfl.svg';

const Logo: React.FC = () => {
  return (
    <StyledLogo>
      <img alt="YFLINK" src={yflusd} height="30" style={{ marginRight: 8 }} />
      <StyledLink href="https://yflink.io">YFLINK</StyledLink>
    </StyledLogo>
  );
};

const StyledLogo = styled.div`
  align-items: center;
  display: flex;
`;

const StyledLink = styled.a`
  margin: 0px;
  padding: 0px;
  font-family: 'Formular Thin', sans-serif;
  font-size: 24px;
  font-weight: 100;
  letter-spacing: 0.3em;
  color: ${(props) => props.theme.color.mainTextColor};
  text-decoration: none;
  outline: none;

  &:visited,
  &:hover,
  &:focus {
    text-decoration: none;
    outline: none;
    color: ${(props) => props.theme.color.mainTextColor};
  }
`;

export default Logo;
