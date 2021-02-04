import React from 'react';
import styled from 'styled-components';

import Button from '../../../components/Button';
import TokenSymbol from '../../../components/TokenSymbol';
import Card from '../../../components/Card';
import CardContent from '../../../components/CardContent';
import Label from '../../../components/Label';
import Value from '../../../components/Value';
import CardIcon from '../../../components/CardIcon';
import useHarvestFromBoardroom from '../../../hooks/useHarvestFromBoardroom';
import useEarningsOnBoardroom from '../../../hooks/useEarningsOnBoardroom';
import { getDisplayBalance } from '../../../utils/formatBalance';
import useYflUsd from '../../../hooks/useYflUsd';

const Harvest: React.FC = () => {
  const { onReward } = useHarvestFromBoardroom();
  const earnings = useEarningsOnBoardroom();
  const yflUsd = useYflUsd();
  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon>
              <TokenSymbol symbol="YFLUSD" />
            </CardIcon>
            <Value value={getDisplayBalance(earnings)} />
            <Label text="YFLUSD Earned" />
            {Number(getDisplayBalance(earnings)) > 0 ? (
              <DollarValue>
                (~
                {(
                  Number(getDisplayBalance(earnings)) * yflUsd.tokens.YFLUSD.usd
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
              text="Claim Reward"
              disabled={earnings.eq(0)}
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
