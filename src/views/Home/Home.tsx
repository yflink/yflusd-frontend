import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Page from '../../components/Page';
import HomeCard from './components/HomeCard';
import { OverviewData } from './types';
import useYflUsd from '../../hooks/useYflUsd';
import config from '../../config';

const Home: React.FC = () => {
  const yflUsd = useYflUsd();

  const [{ cash, bond, share }, setStats] = useState<OverviewData>({});
  const fetchStats = useCallback(async () => {
    const [cash, bond, share] = await Promise.all([
      yflUsd.getCashStatFromLinkswap(),
      yflUsd.getBondStat(),
      yflUsd.getShareStat(),
    ]);
    if (Date.now() < config.bondLaunchesAt.getTime()) {
      bond.priceInWETH = '-';
    }
    setStats({ cash, bond, share });
  }, [yflUsd, setStats]);

  useEffect(() => {
    if (yflUsd) {
      fetchStats().catch((err) => console.error(err.stack));
    }
  }, [yflUsd, fetchStats]);

  const cashAddr = useMemo(() => yflUsd?.YFLUSD.address, [yflUsd]);
  const shareAddr = useMemo(() => yflUsd?.SYFL.address, [yflUsd]);
  const bondAddr = useMemo(() => yflUsd?.BYFL.address, [yflUsd]);

  return (
    <Page>
      <CardWrapper>
        <HomeCard
          title="YFLUSD"
          symbol="YFLUSD"
          supplyLabel="Circulating Supply"
          address={cashAddr}
          stat={cash}
        />
        <HomeCard title="YFLink Synthetic" symbol="sYFL" address={shareAddr} stat={share} />
        <HomeCard title="YFLink Bond" symbol="bYFL" address={bondAddr} stat={bond} />
      </CardWrapper>
    </Page>
  );
};

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  @media (max-width: 920px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

export default Home;
