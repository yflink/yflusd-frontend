import React from 'react';
import styled from 'styled-components';

interface ModalTitleProps {
  text?: string;
}

const ModalTitle: React.FC<ModalTitleProps> = ({ text }) => (
  <StyledModalTitle>{text}</StyledModalTitle>
);

const StyledModalTitle = styled.div`
  color: ${(props) => props.theme.color.mainTextColor};
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 10px;
  padding: 0;
  font-family: 'Formular Light', sans-serif;
  font-weight: 500;
`;

export default ModalTitle;
