import React, { useMemo } from 'react';
import styled from 'styled-components';
import useTokenBalance from '../../../hooks/useTokenBalance';
import { getDisplayBalance } from '../../../utils/formatBalance';
import Button from '../../Button';
import Modal, { ModalProps } from '../../Modal';
import ModalTitle from '../../ModalTitle';
import useYflUsd from '../../../hooks/useYflUsd';
import TokenSymbol from '../../TokenSymbol';
import ModalActions from '../../ModalActions';

const AccountModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const yflUsd = useYflUsd();

  const yflUsdBalance = useTokenBalance(yflUsd.YFLUSD);
  const displayYflUsdBalance = useMemo(() => getDisplayBalance(yflUsdBalance), [yflUsdBalance]);

  const sYflBalance = useTokenBalance(yflUsd.SYFL);
  const displaySyflBalance = useMemo(() => getDisplayBalance(sYflBalance), [sYflBalance]);

  const bYflBalance = useTokenBalance(yflUsd.BYFL);
  const displayByflBalance = useMemo(() => getDisplayBalance(bYflBalance), [bYflBalance]);

  return (
    <Modal>
      <ModalTitle text="My Wallet" />

      <Balances>
        <StyledBalanceWrapper>
          <TokenSymbol symbol="YFLUSD" size={40} />
          <StyledValue>{displayYflUsdBalance} YFLUSD</StyledValue>
        </StyledBalanceWrapper>

        <StyledBalanceWrapper>
          <TokenSymbol symbol="sYFL" size={40} />
          <StyledValue>{displaySyflBalance} sYFL</StyledValue>
        </StyledBalanceWrapper>

        <StyledBalanceWrapper>
          <TokenSymbol symbol="bYFL" size={40} />
          <StyledValue>{displayByflBalance} bYFL</StyledValue>
        </StyledBalanceWrapper>
      </Balances>

      <ModalActions>
        <Button text="Close" onClick={onDismiss} variant="secondary" />
      </ModalActions>
    </Modal>
  );
};

const StyledValue = styled.div`
  margin: 10px;
  font-size: 20px;
  color: ${(props) => props.theme.color.mainTextColor};
`;

const Balances = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
`;

const StyledBalanceWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  margin: 10px 0;
  flex: 0 0 100%;
`;

export default AccountModal;
