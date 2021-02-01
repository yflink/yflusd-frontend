import React from 'react';
import styled from 'styled-components';

const ModalActions: React.FC = ({ children }) => {
  return (
    <StyledModalActions>
      {React.Children.map(children, (child, i) => (
        <>
          <StyledModalAction>{child}</StyledModalAction>
        </>
      ))}
    </StyledModalActions>
  );
};

const StyledModalActions = styled.div`
  align-items: center;
  display: flex;
  margin: 32px 0 0;
  padding: 0;
  flex-wrap: nowrap;
  > * {
    &:nth-child(2) {
      padding: 0 0 0 10px;
    }
  }
`;

const StyledModalAction = styled.div`
  flex: 1;
`;

export default ModalActions;
