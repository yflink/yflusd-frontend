import React from 'react';
import styled from 'styled-components';
import { Bank } from '../../yflusd';
import Button from '../../components/Button';
import Card from '../../components/Card';
import CardContent from '../../components/CardContent';
import CardIcon from '../../components/CardIcon';
import useBanks from '../../hooks/useBanks';
import TokenSymbol from '../../components/TokenSymbol';
import Notice from '../../components/Notice';
import useYflUsd from '../../hooks/useYflUsd';
import Countdown from '../../components/Countdown';
import { useCountdown } from '../../components/Countdown/useCountdown';

const BankCards: React.FC = () => {
  const [banks] = useBanks();

  const activeBanks = banks.filter((bank) => !bank.finished);
  const inactiveBanks = banks.filter((bank) => bank.finished);

  let finishedFirstRow = false;
  const inactiveRows = inactiveBanks.reduce<Bank[][]>(
    (bankRows, bank) => {
      const newBankRows = [...bankRows];
      if (newBankRows[newBankRows.length - 1].length === (finishedFirstRow ? 2 : 3)) {
        newBankRows.push([bank]);
        finishedFirstRow = true;
      } else {
        newBankRows[newBankRows.length - 1].push(bank);
      }
      return newBankRows;
    },
    [[]],
  );

  return (
    <StyledCards>
      {inactiveRows[0].length > 0 && (
        <StyledInactiveNoticeContainer>
          <Notice color="grey">
            <b>You have Pools where the mining has finished.</b>
            <br />
            Please withdraw and claim your stakes.
          </Notice>
        </StyledInactiveNoticeContainer>
      )}
      <StyledRow>
        {activeBanks.map((bank, i) => (
          <React.Fragment key={bank.name}>
            <BankCard bank={bank} />
          </React.Fragment>
        ))}
      </StyledRow>
      {inactiveRows[0].length > 0 && (
        <>
          <StyledInactiveBankTitle>Inactive Banks</StyledInactiveBankTitle>
          {inactiveRows.map((bankRow, i) => (
            <StyledRow key={i}>
              {bankRow.map((bank, j) => (
                <React.Fragment key={j}>
                  <BankCard bank={bank} />
                </React.Fragment>
              ))}
            </StyledRow>
          ))}
        </>
      )}
    </StyledCards>
  );
};

interface BankCardProps {
  bank: Bank;
}

const BankCard: React.FC<BankCardProps> = ({ bank }) => {
  const isLSLP = bank.depositTokenName.includes('LSLP');
  const isYFLUSD = bank.depositTokenName.includes('YFLUSD');
  const yflUsd = useYflUsd();
  let apy;
  let pool;
  let token;
  let TVL;
  let yearlyRateUSD;
  let perDepositedDollarYearlyReward;

  pool = yflUsd.pools[bank.depositTokenName];
  yearlyRateUSD = yflUsd.tokens[pool.rewardToken].usd * pool.rewardRate;
  const remaining = useCountdown(pool.periodFinish);
  const hasEnded = remaining <= 0 && pool.periodFinish !== false;

  if (isLSLP) {
    switch (bank.depositTokenName) {
      case 'LINK-YFLUSD-LSLP':
        break;
      case 'ETH-YFLUSD-LSLP':
      case 'ETH-SYFL-LSLP':
      case 'LINK-SYFL-LSLP':
        return null;
    }

    apy = 0;
  } else {
    TVL = Number(pool.totalSupply) * yflUsd.tokens[bank.depositTokenName].usd;
    perDepositedDollarYearlyReward = yearlyRateUSD / TVL;
    apy = perDepositedDollarYearlyReward * 100;
  }

  return (
    <StyledCardWrapper width={isYFLUSD ? '100%' : '420px'}>
      {!hasEnded && apy > 0 && <APYIndicator>APY: ~{apy.toFixed(2)}%</APYIndicator>}
      <Card highlight={bank.depositTokenName.includes('LSLP')}>
        <CardContent>
          <StyledContent>
            {!isLSLP ? (
              <>
                <CardIcon>
                  <TokenSymbol symbol={bank.depositTokenName} size={76} />
                </CardIcon>
                <StyledTitle>{bank.name}</StyledTitle>
                <StyledDetails>
                  <StyledDetail>Deposit {bank.depositTokenName}</StyledDetail>
                  <StyledDetail>Earn {bank.earnTokenName}</StyledDetail>
                </StyledDetails>
                <Button text="Select" to={`/bank/${bank.contract}`} />
                {pool.periodFinish !== false && (
                  <Countdown ends={pool.periodFinish} format="DD[d] HH[h] mm[m] ss[s]" />
                )}
              </>
            ) : (
              <>
                <StyledTitle>Earn sYFL</StyledTitle>
                <StyledDetails>
                  <StyledDetail>Please use the staking interface on LINKSWAP!</StyledDetail>
                  <StyledDetail>
                    You'll find all standard pools (ETH|YFLUSD, LINK|YFLUSD, ETH|sYFL and
                    LINK|sYFL) there
                  </StyledDetail>
                  <StyledDetail>
                    Check periodically for other reward pools, that distribute sYFL
                  </StyledDetail>
                </StyledDetails>
                <Button
                  variant="inline"
                  text="LINKSWAP Staking"
                  href="https://linkswap.app/#/stake"
                />
              </>
            )}
          </StyledContent>
        </CardContent>
      </Card>
    </StyledCardWrapper>
  );
};

const StyledCards = styled.div`
  display: flex;
  width: 100%;
`;

const APYIndicator = styled.div`
  position: absolute;
  right: 30px;
  top: 30px;
  font-size: 15px;
  color: ${(props) => props.theme.color.mainTextColor};
`;

const StyledRow = styled.div`
  display: flex;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
  width: 100%;
  flex: 0 0 100%;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledCardWrapper = styled.div<{ width?: string }>`
  display: flex;
  width: ${({ width }) => width};
  max-width: 100%;
  position: relative;
`;

const StyledTitle = styled.h4`
  color: ${(props) => props.theme.color.mainTextColor};
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 10px;
  padding: 0;
  font-family: 'Formular Light', sans-serif;
  font-weight: 500;
`;

const StyledContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const StyledDetails = styled.div`
  margin-bottom: ${(props) => props.theme.spacing[6]}px;
  margin-top: ${(props) => props.theme.spacing[2]}px;
  text-align: center;
`;

const StyledDetail = styled.div`
  color: ${(props) => props.theme.color.textSecondary};
  font-weight: 400;
  font-size: 16px;
  margin: 0;
  padding: 0;
  text-align: center;
`;

const StyledInactiveNoticeContainer = styled.div`
  width: 598px;
  margin-bottom: ${(props) => props.theme.spacing[6]}px;
`;

const StyledInactiveBankTitle = styled.p`
  font-size: 24px;
  font-weight: 600;
  color: ${(props) => props.theme.color.grey[400]};
  margin-top: ${(props) => props.theme.spacing[5]}px;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
`;

export default BankCards;
