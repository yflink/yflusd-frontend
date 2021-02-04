import React from 'react';
import styled from 'styled-components';

import Button from '../../../components/Button';
import Card from '../../../components/Card';
import CardContent from '../../../components/CardContent';
import CardIcon from '../../../components/CardIcon';
import { AddIcon, RemoveIcon } from '../../../components/icons';
import IconButton from '../../../components/IconButton';
import Label from '../../../components/Label';
import Value from '../../../components/Value';

import useApprove, { ApprovalState } from '../../../hooks/useApprove';
import useModal from '../../../hooks/useModal';
import useStake from '../../../hooks/useStake';
import useStakedBalance from '../../../hooks/useStakedBalance';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useWithdraw from '../../../hooks/useWithdraw';

import { getDisplayBalance } from '../../../utils/formatBalance';

import DepositModal from './DepositModal';
import WithdrawModal from './WithdrawModal';
import TokenSymbol from '../../../components/TokenSymbol';
import { Bank } from '../../../yflusd';
import useYflUsd from '../../../hooks/useYflUsd';

interface StakeProps {
  bank: Bank;
}

const Stake: React.FC<StakeProps> = ({ bank }) => {
  const [approveStatus, approve] = useApprove(bank.depositToken, bank.address);

  // TODO: reactive update of token balance
  const tokenBalance = useTokenBalance(bank.depositToken);
  const stakedBalance = useStakedBalance(bank.contract);

  const { onStake } = useStake(bank);
  const { onWithdraw } = useWithdraw(bank);

  const [onPresentDeposit, onDismissDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      decimals={bank.depositToken.decimal}
      onConfirm={(amount) => {
        onStake(amount);
        onDismissDeposit();
      }}
      tokenName={bank.depositTokenName}
    />,
  );

  const [onPresentWithdraw, onDismissWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      decimals={bank.depositToken.decimal}
      onConfirm={(amount) => {
        onWithdraw(amount);
        onDismissWithdraw();
      }}
      tokenName={bank.depositTokenName}
    />,
  );

  const yflUsd = useYflUsd();

  const isLSLP = bank.depositTokenName.includes('LSLP');
  let token;
  let TVL;
  let tokenPrice;
  if (isLSLP) {
    switch (bank.depositTokenName) {
      case 'LINK-YFLUSD-LSLP':
        token = yflUsd.tokens['yflusdLink'];
        break;
      case 'ETH-YFLUSD-LSLP':
        token = yflUsd.tokens['yflusdEth'];
        break;
      case 'ETH-SYFL-LSLP':
        token = yflUsd.tokens['syflEth'];
        break;
      case 'LINK-SYFL-LSLP':
        token = yflUsd.tokens['syflLink'];
        break;
    }
    TVL =
      token.token0.amount * yflUsd.tokens[token.token0.symbol].usd +
      token.token1.amount * yflUsd.tokens[token.token1.symbol].usd;

    tokenPrice = TVL / Number(yflUsd.pools[bank.depositTokenName].totalSupply);
  }

  const stakedBalanceDisplay = getDisplayBalance(stakedBalance, bank.depositToken.decimal);

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          {isLSLP ? (
            <StyledCardHeader>
              <CardIcon pair={true}>
                <TokenSymbol symbol={bank.depositTokenName} size={80} pair={true} />
              </CardIcon>
              <Value value={stakedBalanceDisplay} />
              <Label text={`${bank.depositTokenName} Staked`} />
              {Number(stakedBalanceDisplay) > 0 ? (
                <DollarValue>
                  (~
                  {(Number(stakedBalanceDisplay) * tokenPrice).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })}
                  )
                </DollarValue>
              ) : (
                <DollarValue>($0.00)</DollarValue>
              )}
            </StyledCardHeader>
          ) : (
            <StyledCardHeader>
              <CardIcon>
                <TokenSymbol symbol={bank.depositTokenName} size={76} />
              </CardIcon>
              <Value value={stakedBalanceDisplay} />
              <Label text={`${bank.depositTokenName} Staked`} />
              {Number(stakedBalanceDisplay) > 0 ? (
                <DollarValue>
                  (~
                  {(
                    Number(stakedBalanceDisplay) * yflUsd.tokens[bank.depositTokenName].usd
                  ).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                  )
                </DollarValue>
              ) : (
                <DollarValue>($0.00)</DollarValue>
              )}
            </StyledCardHeader>
          )}

          <StyledCardActions>
            {approveStatus !== ApprovalState.APPROVED ? (
              <Button
                disabled={
                  approveStatus === ApprovalState.PENDING ||
                  approveStatus === ApprovalState.UNKNOWN
                }
                onClick={approve}
                text={`Approve ${bank.depositTokenName}`}
                variant="secondary"
              />
            ) : (
              <>
                <IconButton onClick={onPresentWithdraw}>
                  <RemoveIcon />
                </IconButton>
                <StyledActionSpacer />
                <IconButton
                  disabled={bank.finished}
                  onClick={() => (bank.finished ? null : onPresentDeposit())}
                >
                  <AddIcon />
                </IconButton>
              </>
            )}
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
  margin-top: 24px;
  width: 100%;
`;

const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`;

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export default Stake;
