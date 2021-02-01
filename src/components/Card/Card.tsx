import React from 'react';
import styled from 'styled-components';

interface ICardProps {
  children?: React.ReactNode;
  highlight?: boolean;
}

const Card: React.FC<ICardProps> = ({ children, highlight }) => (
  <StyledCard highlight={highlight}>{children}</StyledCard>
);

interface StyledCardProps {
  highlight?: boolean;
}

const StyledCard = styled.div<StyledCardProps>`
  background-color: ${(props) => props.theme.color.modalBG};
  border: ${(props) => (props.highlight ? `1px solid ${props.theme.color.mainColor}` : 'none')};
  border-radius: 6px;
  padding: 16px;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 16px;
`;

export default Card;
