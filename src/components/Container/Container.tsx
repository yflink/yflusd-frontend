import React from 'react';
import styled from 'styled-components';

interface ContainerProps {
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const Container: React.FC<ContainerProps> = ({ children, size = 'md' }) => {
  return <StyledContainer width="100%">{children}</StyledContainer>;
};

interface StyledContainerProps {
  width: string;
}

const StyledContainer = styled.div<StyledContainerProps>`
  box-sizing: border-box;
  margin: 0 auto;
  max-width: ${(props) => props.width};
  padding: 1rem;
  width: 100%;
`;

export default Container;
