import React from 'react';
import styled from 'styled-components';

interface CardIconProps {
  children?: React.ReactNode;
  pair?: boolean;
}

const CardIcon: React.FC<CardIconProps> = ({ children, pair }) => (
  <StyledCardIcon pair={pair}>{children}</StyledCardIcon>
);

const StyledCardIcon = styled.div<{ pair?: boolean }>`
  font-size: 36px;
  height: 80px;
  background-color: ${({ pair, theme }) => (pair ? 'transparent' : theme.color.white)};
  width: ${({ pair }) => (pair ? 'auto' : '80px')};
  border-radius: ${({ pair }) => (pair ? '0' : '50%')};
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0 auto 10px;
`;

export default CardIcon;
