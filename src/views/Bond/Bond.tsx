import React, { useCallback, useMemo } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { useWallet } from 'use-wallet';

import Button from '../../components/Button';
import Page from '../../components/Page';
import ExchangeCard from './components/ExchangeCard';
import styled from 'styled-components';
import useBondStats from '../../hooks/useBondStats';
import useYflUsd from '../../hooks/useYflUsd';
import useBondOraclePriceInLastTWAP from '../../hooks/useBondOraclePriceInLastTWAP';
import { useTransactionAdder } from '../../state/transactions/hooks';
import config from '../../config';
import LaunchCountdown from '../../components/LaunchCountdown';
import ExchangeStat from './components/ExchangeStat';
import useTokenBalance from '../../hooks/useTokenBalance';
import { getDisplayBalance } from '../../utils/formatBalance';

const Bond: React.FC = () => {
  const { path } = useRouteMatch();
  const { account, connect } = useWallet();
  const yflUsd = useYflUsd();
  const addTransaction = useTransactionAdder();
  const bondStat = useBondStats();
  const cashPrice = useBondOraclePriceInLastTWAP();

  const bondBalance = useTokenBalance(yflUsd?.BYFL);

  const handleBuyBonds = useCallback(
    async (amount: string) => {
      const tx = await yflUsd.buyBonds(amount);
      const bondAmount = Number(amount) / Number(getDisplayBalance(cashPrice));
      addTransaction(tx, {
        summary: `Buy ${bondAmount.toFixed(2)} bYFL with ${amount} YFLUSD`,
      });
    },
    [yflUsd, addTransaction, cashPrice],
  );

  const handleRedeemBonds = useCallback(
    async (amount: string) => {
      const tx = await yflUsd.redeemBonds(amount);
      addTransaction(tx, { summary: `Redeem ${amount} bYFL` });
    },
    [yflUsd, addTransaction],
  );
  const cashIsOverpriced = useMemo(() => cashPrice.gt(1.0), [cashPrice]);
  const cashIsUnderPriced = useMemo(() => Number(bondStat?.priceInWETH) < 1.0, [bondStat]);

  const isLaunched = Date.now() >= config.bondLaunchesAt.getTime();
  if (!isLaunched) {
    return (
      <Switch>
        <Page>
          <LaunchCountdown
            deadline={config.bondLaunchesAt}
            description="How does YFLink Bond work?"
            descriptionLink="https://learn.yflink.io/mechanisms/stabilization-mechanism"
          />
        </Page>
      </Switch>
    );
  }
  return (
    <Switch>
      <Page>
        {!!account ? (
          <>
            <Route exact path={path}></Route>
            <StyledBond>
              <StyledCardWrapper>
                <ExchangeCard
                  action="Purchase"
                  fromToken={yflUsd.YFLUSD}
                  fromTokenName="YFLUSD"
                  toToken={yflUsd.BYFL}
                  toTokenName="bYFL"
                  priceDesc={
                    cashIsOverpriced
                      ? 'YFLUSD is over $1'
                      : cashIsUnderPriced
                      ? `${Math.floor(
                          100 / Number(bondStat.priceInWETH) - 100,
                        )}% return when YFLUSD > $1`
                      : '-'
                  }
                  onExchange={handleBuyBonds}
                  disabled={!bondStat || cashIsOverpriced}
                />
              </StyledCardWrapper>
              <StyledStatsWrapper>
                <ExchangeStat
                  tokenName="YFLUSD"
                  description="Base Price (Last-Day TWAP)"
                  price={getDisplayBalance(cashPrice, 18, 2)}
                />
                <ExchangeStat
                  tokenName="bYFL"
                  description="Current Price: (YFLUSD)^2"
                  price={bondStat?.priceInWETH || '-'}
                />
              </StyledStatsWrapper>
              <StyledCardWrapper>
                <ExchangeCard
                  action="Redeem"
                  fromToken={yflUsd.BYFL}
                  fromTokenName="bYFL"
                  toToken={yflUsd.YFLUSD}
                  toTokenName="YFLUSD"
                  priceDesc={`${getDisplayBalance(bondBalance)} bYFL Available`}
                  onExchange={handleRedeemBonds}
                  disabled={!bondStat || bondBalance.eq(0) || cashIsUnderPriced}
                />
              </StyledCardWrapper>
            </StyledBond>
          </>
        ) : (
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <Button
              onClick={() => connect('injected')}
              text="Unlock Wallet"
              variant="secondary"
            />
          </div>
        )}
      </Page>
    </Switch>
  );
};

const StyledBond = styled.div`
  display: flex;
  width: 900px;
  @media (max-width: 940px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 940px) {
    width: 80%;
  }
`;

const StyledStatsWrapper = styled.div`
  display: flex;
  flex: 0.8;
  flex-direction: column;

  @media (max-width: 940px) {
    width: 80%;
    margin: 16px 0;
  }
`;

export default Bond;
