import React from 'react';
import styled from 'styled-components';

interface PageHeaderProps {
  subtitle?: string;
  title?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ subtitle, title }) => {
  return (
    <StyledPageHeader>
      <StyledTitle>{title}</StyledTitle>
      <StyledSubtitle>{subtitle}</StyledSubtitle>
    </StyledPageHeader>
  );
};

const StyledPageHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding-bottom: ${(props) => props.theme.spacing[6]}px;
  padding-top: ${(props) => props.theme.spacing[6]}px;
  max-width: 512px;
  width: 100%;
  margin: 0 auto;
`;

const StyledTitle = styled.h1`
  color: ${(props) => props.theme.color.mainTextColor};
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 10px;
  padding: 0;
  font-family: 'Formular Light', sans-serif;
  font-weight: 500;
  text-transform: uppercase;
`;

const StyledSubtitle = styled.h3`
  color: ${(props) => props.theme.color.textSecondary};
  font-weight: 400;
  font-size: 16px;
  margin: 0;
  padding: 0;
  text-align: center;
`;

export default PageHeader;
