import React from 'react';
import styled from 'styled-components';

import Button from '../../../components/Button';
import Card from '../../../components/Card';
import CardContent from '../../../components/CardContent';
import useYflUsd from '../../../hooks/useYflUsd';
import Label from '../../../components/Label';
import TokenSymbol from '../../../components/TokenSymbol';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import useModal from '../../../hooks/useModal';
import ExchangeModal from './ExchangeModal';
import ERC20 from '../../../yflusd/ERC20';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useApprove, { ApprovalState } from '../../../hooks/useApprove';
import useCatchError from '../../../hooks/useCatchError';

interface ExchangeCardProps {
  action: string;
  headline?: string;
  fromToken: ERC20;
  fromTokenName: string;
  toToken: ERC20;
  toTokenName: string;
  priceDesc: string;
  onExchange: (amount: string) => void;
  disabled?: boolean;
}

const ExchangeCard: React.FC<ExchangeCardProps> = ({
  headline,
  action,
  fromToken,
  fromTokenName,
  toToken,
  toTokenName,
  priceDesc,
  onExchange,
  disabled = false,
}) => {
  const catchError = useCatchError();
  const yflUsd = useYflUsd();
  const [approveStatus, approve] = useApprove(fromToken, yflUsd.contracts.Treasury.address);
  const bondsAvailible =
    yflUsd.treasury.bondsCap - yflUsd.treasury.totalSupply < 0
      ? 0
      : yflUsd.treasury.bondsCap - yflUsd.treasury.totalSupply;

  const balance = useTokenBalance(fromToken);
  const [onPresent, onDismiss] = useModal(
    <ExchangeModal
      title={action}
      description={priceDesc}
      max={balance}
      onConfirm={(value) => {
        onExchange(value);
        onDismiss();
      }}
      action={action}
      tokenName={fromTokenName}
    />,
  );
  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardTitle>{headline ? headline : `${action} ${toTokenName}`}</StyledCardTitle>
          <StyledExchanger>
            <StyledToken>
              <StyledCardIcon>
                <TokenSymbol symbol={fromToken.symbol} size={76} />
              </StyledCardIcon>
              <Label text={fromTokenName} variant="normal" />
            </StyledToken>
            <StyledExchangeArrow>
              <FontAwesomeIcon icon={faArrowRight} />
            </StyledExchangeArrow>
            <StyledToken>
              <StyledCardIcon>
                <TokenSymbol symbol={toToken.symbol} size={76} />
              </StyledCardIcon>
              <Label text={toTokenName} variant="normal" />
            </StyledToken>
          </StyledExchanger>
          <StyledDesc>{priceDesc}</StyledDesc>
          <StyledCardActions>
            {approveStatus !== ApprovalState.APPROVED && !disabled ? (
              <Button
                disabled={
                  approveStatus === ApprovalState.PENDING ||
                  approveStatus === ApprovalState.UNKNOWN
                }
                onClick={() => catchError(approve(), `Unable to approve ${fromTokenName}`)}
                text={`Approve ${fromTokenName}`}
                variant="secondary"
              />
            ) : (
              <>
                {action === 'Purchase' && bondsAvailible === 0 ? (
                  <Button text="Current cap reached" onClick={onPresent} disabled={true} />
                ) : (
                  <>
                    <Button text={action} onClick={onPresent} disabled={disabled} />
                  </>
                )}
              </>
            )}
          </StyledCardActions>
          {action === 'Purchase' && <StyledDesc>Bonds Available: {bondsAvailible}</StyledDesc>}
        </StyledCardContentInner>
      </CardContent>
    </Card>
  );
};

const StyledCardTitle = styled.div`
  color: ${(props) => props.theme.color.mainTextColor};
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 10px;
  padding: 0;
  font-family: 'Formular Light', sans-serif;
  font-weight: 500;
  text-transform: uppercase;
`;

const StyledCardIcon = styled.div`
  background-color: ${(props) => props.theme.color.mainTextColor};
  width: 80px;
  height: 80px;
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const StyledExchanger = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: ${(props) => props.theme.spacing[5]}px;
`;

const StyledExchangeArrow = styled.div`
  font-size: 20px;
  color: ${(props) => props.theme.color.grey[300]};
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  padding-bottom: ${(props) => props.theme.spacing[4]}px;
`;

const StyledToken = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-weight: 600;
`;

const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin: 16px 0 0;
  width: 100%;
`;

const StyledDesc = styled.span`
  color: ${(props) => props.theme.color.grey[300]};
  font-size: 14px;
  margin: 12px 0 0 0;
`;

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export default ExchangeCard;
