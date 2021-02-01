import React from 'react';
import styled from 'styled-components';

import Button from '../Button';
import Input, { InputProps } from '../Input';
interface TokenInputProps extends InputProps {
  max: number | string;
  symbol: string;
  onSelectMax?: () => void;
}

const TokenInput: React.FC<TokenInputProps> = ({
  max,
  symbol,
  onChange,
  onSelectMax,
  value,
}) => {
  return (
    <StyledTokenInput>
      <StyledMaxText>
        {max.toLocaleString()} {symbol} Available
      </StyledMaxText>
      <Input
        endAdornment={
          <StyledTokenAdornmentWrapper>
            <StyledTokenSymbol>{symbol}</StyledTokenSymbol>
            <div style={{ marginLeft: 10 }}>
              <Button size="sm" text="Max" onClick={onSelectMax} variant="secondary" />
            </div>
          </StyledTokenAdornmentWrapper>
        }
        onChange={onChange}
        placeholder="0"
        value={value}
      />
    </StyledTokenInput>
  );
};

const StyledTokenInput = styled.div``;

const StyledTokenAdornmentWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 0 0 auto;
`;

const StyledMaxText = styled.div`
  align-items: center;
  color: ${(props) => props.theme.color.textSecondary};
  display: flex;
  font-size: 14px;
  height: 44px;
  justify-content: flex-end;
`;

const StyledTokenSymbol = styled.span`
  color: ${(props) => props.theme.color.textTertiary};
`;

export default TokenInput;
