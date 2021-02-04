import React from 'react';
import styled from 'styled-components';
import Button from '../../../components/Button';
import Card from '../../../components/Card';
import CardContent from '../../../components/CardContent';
import CardIcon from '../../../components/CardIcon';
import Label from '../../../components/Label';
import Value from '../../../components/Value';

import useEarnings from '../../../hooks/useEarnings';
import useHarvest from '../../../hooks/useHarvest';

import { getDisplayBalance } from '../../../utils/formatBalance';
import TokenSymbol from '../../../components/TokenSymbol';
import { Bank } from '../../../yflusd';
import useYflUsd from '../../../hooks/useYflUsd';

interface HarvestProps {
  bank: Bank;
}

const Harvest: React.FC<HarvestProps> = ({ bank }) => {
  const earnings = useEarnings(bank.contract);
  const { onReward } = useHarvest(bank);
  const yflUsd = useYflUsd();
  const tokenName = bank.earnTokenName;
  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon>
              <TokenSymbol symbol={bank.earnToken.symbol} />
            </CardIcon>
            <Value value={getDisplayBalance(earnings)} />
            <Label text={`${tokenName} Earned`} />
            {Number(getDisplayBalance(earnings)) > 0 ? (
              <DollarValue>
                (~
                {(
                  Number(getDisplayBalance(earnings)) * yflUsd.tokens[tokenName].usd
                ).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                )
              </DollarValue>
            ) : (
              <DollarValue>($0.00)</DollarValue>
            )}
          </StyledCardHeader>
          <StyledCardActions>
            <Button
              onClick={onReward}
              disabled={earnings.eq(0)}
              text="Claim"
              variant="secondary"
            />
          </StyledCardActions>
        </StyledCardContentInner>
      </CardContent>
    </Card>
  );
};

const DollarValue = styled.div`
  margin: 3px 0;
  display: flex;
  justify-content: center;
  color: ${(props) => props.theme.color.grey[600]};
`;

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[6]}px;
  width: 100%;
`;
const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export default Harvest;
