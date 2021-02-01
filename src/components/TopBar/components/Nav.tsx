import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLink exact activeClassName="active" to="/">
        YFLUSD
      </StyledLink>
      <StyledLink exact activeClassName="active" to="/bank">
        Pools
      </StyledLink>
      <StyledLink exact activeClassName="active" to="/bonds">
        Bonds
      </StyledLink>
      <StyledLink exact activeClassName="active" to="/boardroom">
        Boardroom
      </StyledLink>
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  display: flex;

  @media (max-width: 800px) {
    padding: 10px 0;
    order: 3;
    flex: 0 0 100%;
    justify-content: center;
    max-width: 100vw;
    flex-wrap: wrap;
  }
`;

const StyledLink = styled(NavLink)`
  margin: 0 0 0 24px;
  font-family: 'Work Sans Thin', sans-serif;
  text-transform: uppercase;
  font-size: 18px;
  font-weight: 400;
  letter-spacing: 0.06em;
  padding: 4px 0px;
  border-bottom: 2px solid transparent;
  text-decoration: none;
  color: ${(props) => props.theme.color.mainTextColor};
  &:hover {
    color: ${(props) => props.theme.color.mainTextColor};
    border-bottom: 2px solid ${(props) => props.theme.color.mainTextColor};
  }
  &.active {
    border-bottom: 2px solid ${(props) => props.theme.color.mainTextColor};
  }

  @media (max-width: 800px) {
    margin: 0 0 10px 24px;
  }
`;

export default Nav;
