import React from 'react';
import styled from 'styled-components';
import CardContent from '../CardContent';

export interface ModalProps {
  onDismiss?: () => void;
}

const Modal: React.FC = ({ children }) => {
  return (
    <ModalContainer>
      <StyledModal>
        <ModalCard>
          <CardContent>{children}</CardContent>
        </ModalCard>
      </StyledModal>
    </ModalContainer>
  );
};

const ModalCard = styled.div`
  background-color: ${(props) => props.theme.color.modalBG};
  border-radius: 6px;
  padding: 16px;
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const StyledModal = styled.div`
  border-radius: 6px;
  box-shadow: 24px 24px 48px -24px ${(props) => props.theme.color.grey[900]};
  position: relative;
`;

const ModalContainer = styled.div`
  box-sizing: border-box;
  margin: 0 auto;
  max-width: 100%;
  padding: 1rem;
  width: 420px;
`;

export default Modal;
