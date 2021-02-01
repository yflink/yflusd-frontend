import React, { useEffect } from 'react';
import styled from 'styled-components';

import { Switch, useParams } from 'react-router-dom';
import { useWallet } from 'use-wallet';

import Button from '../../components/Button';
import PageHeader from '../../components/PageHeader';
import Spacer from '../../components/Spacer';
import Harvest from './components/Harvest';
import Stake from './components/Stake';
import useBank from '../../hooks/useBank';
import useRedeem from '../../hooks/useRedeem';
import { Bank as BankEntity } from '../../yflusd';
import config from '../../config';
import Page from '../../components/Page';
import LaunchCountdown from '../../components/LaunchCountdown';

const Bank: React.FC = () => {
  useEffect(() => window.scrollTo(0, 0));

  const { bankId } = useParams();
  const bank = useBank(bankId);

  console.log(bank);

  const { account } = useWallet();
  const { onRedeem } = useRedeem(bank);
  const isLaunched = Date.now() >= config.baseLaunchDate.getTime();
  if (!isLaunched) {
    return (
      <Switch>
        <Page>
          <LaunchCountdown
            deadline={config.baseLaunchDate}
            description="How do the pools work?"
            descriptionLink="https://learn.yflink.io/mechanisms/pools"
          />
        </Page>
      </Switch>
    );
  }
  return account && bank ? (
    <>
      <PageHeader
        subtitle={`Deposit ${bank?.depositTokenName} and earn ${bank?.earnTokenName}`}
        title={bank?.name}
      />
      <StyledBank>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <Harvest bank={bank} />
          </StyledCardWrapper>
          <StyledCardWrapper>
            <Stake bank={bank} />
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg" />
        {bank.depositTokenName.includes('LP') ? (
          <LPTokenHelpText bank={bank} />
        ) : (
          <TokenHelpText bank={bank} />
        )}
        <Spacer size="lg" />
        <div>
          <Button onClick={onRedeem} text="Claim & Withdraw" variant="secondary" />
        </div>
        <Spacer size="lg" />
      </StyledBank>
    </>
  ) : !bank ? (
    <BankNotFound />
  ) : (
    <UnlockWallet />
  );
};

const LPTokenHelpText: React.FC<{ bank: BankEntity }> = ({ bank }) => {
  let pairName: string;
  let linkswapUrl: string;
  if (bank.depositTokenName.includes('YFLUSD')) {
    if (bank.depositTokenName.includes('ETH')) {
      pairName = 'YFLUSD-ETH pair';
      linkswapUrl = 'https://linkswap.app/#/add/ETH/0x7b760D06E401f85545F3B50c44bf5B05308b7b62';
    } else {
      pairName = 'YFLUSD-LINK pair';
      linkswapUrl =
        'https://linkswap.app/#/add/0x514910771af9ca656af840dff83e8264ecf986ca/0x7b760D06E401f85545F3B50c44bf5B05308b7b62';
    }
  } else {
    if (bank.depositTokenName.includes('ETH')) {
      pairName = 'sYFL-ETH pair';
      linkswapUrl = 'https://linkswap.app/#/add/ETH/0x8282df223AC402d04B2097d16f758Af4F70e7Db0';
    } else {
      pairName = 'sYFL-LINK pair';
      linkswapUrl =
        'https://linkswap.app/#/add/0x514910771af9ca656af840dff83e8264ecf986ca/0x8282df223AC402d04B2097d16f758Af4F70e7Db0';
    }
  }
  return (
    <Button
      href={linkswapUrl}
      variant="inline"
      target="_blank"
      text={`Provide liquidity to ${pairName} on LINKSWAP`}
    />
  );
};

const TokenHelpText: React.FC<{ bank: BankEntity }> = ({ bank }) => {
  let linkswapUrl: string = 'https://linkswap.app/#/swap/ETH/';
  switch (bank.depositTokenName) {
    case 'YFL':
      linkswapUrl += '0x28cb7e841ee97947a86b06fa4090c8451f64c0be';
      break;
    case 'LINK':
      linkswapUrl += '0x514910771af9ca656af840dff83e8264ecf986ca';
      break;
    case 'MASQ':
      linkswapUrl += '0x06f3c323f0238c72bf35011071f2b5b7f43a054c';
      break;
    case 'BONK':
      linkswapUrl += '0x6d6506e6f438ede269877a0a720026559110b7d5';
      break;
    case 'DOKI':
      linkswapUrl += '0x9ceb84f92a0561fa3cc4132ab9c0b76a59787544';
      break;
    default:
      linkswapUrl += '0xb1dc9124c395c1e97773ab855d66e879f053a289';
  }
  if (bank.depositTokenName === 'SYAX') {
    return (
      <>
        <Button
          href={linkswapUrl}
          variant="inline"
          target="_blank"
          text={`Get YAX on LINKSWAP`}
        />
        <br />
        <StyledLink href="https://yaxis.io/stake" target="_blank">
          And stake it for sYAX at yaxis.io
        </StyledLink>
      </>
    );
  } else {
    return (
      <Button
        href={linkswapUrl}
        variant="inline"
        target="_blank"
        text={`Get ${bank.depositTokenName} on LINKSWAP`}
      />
    );
  }
};

const BankNotFound = () => {
  return (
    <Center>
      <PageHeader title="Not Found" subtitle="It's over." />
    </Center>
  );
};

const UnlockWallet = () => {
  const { connect } = useWallet();
  return (
    <Center>
      <Button onClick={() => connect('injected')} text="Unlock Wallet" variant="secondary" />
    </Center>
  );
};

const StyledBank = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledLink = styled.a`
  font-weight: 400;
  text-decoration: none;
  color: ${(props) => props.theme.color.primary.main};

  &:hover,
  &:focus,
  &:active {
    text-decoration: underline;
  }
`;

const StyledCardsWrapper = styled.div`
  display: flex;
  flex: 0 0 100%;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
`;

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 0 0 100%;
  width: 100%;
  max-width: 420px;
  margin: 16px;
  flex-direction: column;
`;

const Center = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default Bank;
