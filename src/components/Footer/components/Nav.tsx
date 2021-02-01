import React from 'react';
import styled from 'styled-components';

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLink href="https://github.com/yflink" target="_blank">
        GitHub
      </StyledLink>
      <StyledLink href="https://twitter.com/YFLinkio" target="_blank">
        Twitter
      </StyledLink>
      <StyledLink href="https://t.me/YFLinkGroup" target="_blank">
        Telegram
      </StyledLink>
      <StyledLink href="https://discord.gg/VZgeYV2" target="_blank">
        Discord
      </StyledLink>
      <StyledLink href="https://medium.com/yflink/" target="_blank">
        Medium
      </StyledLink>
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`;

const StyledLink = styled.a`
  color: ${(props) => props.theme.color.grey[400]};
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.grey[500]};
  }
`;

export default Nav;
