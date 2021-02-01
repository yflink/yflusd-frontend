import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import Label from '../../../components/Label';
import { TokenStat } from '../../../yflusd/types';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import TokenSymbol from '../../../components/TokenSymbol';
import { commify } from 'ethers/lib/utils';
import config from '../../../config';

interface HomeCardProps {
  title: string;
  symbol: string;
  supplyLabel?: string;
  address: string;
  stat?: TokenStat;
}

const HomeCard: React.FC<HomeCardProps> = ({
  title,
  symbol,
  address,
  supplyLabel = 'Total Supply',
  stat,
}) => {
  const tokenUrl = `${config.etherscanUrl}/token/${address}`;
  return (
    <Wrapper>
      <CardHeader>{title}</CardHeader>
      <StyledCards>
        <TokenWrapper>
          <TokenSymbol symbol={symbol} size={76} />
        </TokenWrapper>
        <div style={{ flex: 1 }}>
          <CardSection>
            {stat ? (
              <StyledValue>
                {(stat.priceInWETH !== '-' ? '$' : '') + stat.priceInWETH}
              </StyledValue>
            ) : (
              <ValueSkeleton />
            )}
            <Label text="Current Price" />
          </CardSection>

          <CardSection>
            {stat ? <StyledValue>{symbol === 'YFLUSD' ? commify(Number(stat.totalSupply) - 43000)  : commify(stat.totalSupply)}</StyledValue> : <ValueSkeleton />}
            <StyledSupplyLabel href={tokenUrl} target="_blank">
              {supplyLabel}
            </StyledSupplyLabel>
          </CardSection>
        </div>
      </StyledCards>
    </Wrapper>
  );
};

const TokenWrapper = styled.div`
  font-size: 36px;
  height: 80px;
  background-color: ${(props) => props.theme.color.white};
  width: 80px;
  border-radius: 50%;
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0 auto 10px;
  flex: 0 0 80px;
  margin: 0 24px 0 0;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 420px;
  padding: 24px;
  background-color: ${(props) => props.theme.color.appBG};
  border-radius: 6px;
  margin: 16px;
  box-sizing: border-box;
`;

const CardHeader = styled.h2`
  color: #fff;
  text-align: center;
  margin: 0 0 20px;
  text-transform: uppercase;
  font-family: 'Formular Light', sans-serif;
  font-weight: 500;
`;

const StyledCards = styled.div`
  min-width: 100%;
  display: flex;
  flex-wrap: nowrap;
  color: ${(props) => props.theme.color.mainTextColor};
`;

const StyledValue = styled.span`
  margin: 10px 0 5px;
  display: inline-block;
  font-size: 20px;
  color: ${(props) => props.theme.color.mainTextColor};
`;

const CardSection = styled.div`
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ValueSkeletonPadding = styled.div`
  padding-top: ${(props) => props.theme.spacing[3]}px;
  padding-bottom: ${(props) => props.theme.spacing[2]}px;
`;

const StyledSupplyLabel = styled.a`
  display: block;
  color: ${(props) => props.theme.color.mainColor};
  text-decoration: none;
  font-size: 0.8rem;

  &:hover,
  &:focus,
  &:active {
    text-decoration: underline;
  }
`;

const ValueSkeleton = () => {
  const theme = useContext(ThemeContext);
  return (
    <SkeletonTheme color={theme.color.grey[700]} highlightColor={theme.color.grey[600]}>
      <ValueSkeletonPadding>
        <Skeleton height={10} />
      </ValueSkeletonPadding>
    </SkeletonTheme>
  );
};

export default HomeCard;
