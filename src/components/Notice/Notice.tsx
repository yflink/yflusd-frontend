import React from 'react';
import styled from 'styled-components';
import { Info } from 'react-feather';

type NoticeProps = {
  color?: 'blue' | 'grey' | 'green' | 'red';
};

const Notice: React.FC<NoticeProps> = ({ color = 'grey', children }) => {
  return (
    <StyledPanel color={color}>
      <StyledCardContentInner>
        <StyledIcon>
          <Info size={16} />
        </StyledIcon>
        <StyledTextWrapper>
          <StyledText>{children}</StyledText>
        </StyledTextWrapper>
      </StyledCardContentInner>
    </StyledPanel>
  );
};

const StyledPanel = styled.div<NoticeProps>`
  width: 100%;
  background: ${({ color, theme }) =>
    color === 'grey'
      ? theme.color.grey[900]
      : color === 'blue'
      ? theme.color.blue[700]
      : theme.color.blue[400]};
  color: ${({ color, theme }) =>
    color === 'grey'
      ? theme.color.grey[400]
      : color === 'blue'
      ? theme.color.blue[200]
      : theme.color.blue[400]};
  border-radius: 4px;
`;

const StyledText = styled.span``;

const StyledIcon = styled.span`
  margin-top: 2px;
  margin-right: 10px;
`;

const StyledTextWrapper = styled.span`
  display: flex;
  flex-direction: column;
`;

const StyledCardContentInner = styled.div`
  display: flex;
  align-items: start;
  flex-direction: row;
  padding: ${(props) => props.theme.spacing[3]}px;
`;

export default Notice;
