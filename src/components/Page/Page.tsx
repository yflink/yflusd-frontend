import React from 'react';
import styled from 'styled-components';

import TopBar from '../TopBar';

const Page: React.FC = ({ children }) => (
  <StyledPage>
    <TopBar />
    <StyledMain>{children}</StyledMain>
  </StyledPage>
);

const StyledPage = styled.div`
  width: 100%;
  max-width: 2100px;
  margin: 0 auto;
`;

const StyledMain = styled.div`
  padding: 80px 0;
  align-items: center;
  display: flex;
  flex-direction: column;
  padding-bottom: ${(props) => props.theme.spacing[5]}px;

  @media (max-width: 920px) {
    padding-top: 0;
    min-height: 100vh;
  }
`;

export default Page;
