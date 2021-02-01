import { useCallback, useEffect, useState } from 'react';
import useYflUsd from './useYflUsd';
import { TokenStat } from '../yflusd/types';
import config from '../config';

const useBondStats = () => {
  const [stat, setStat] = useState<TokenStat>();
  const yflUsd = useYflUsd();

  const fetchBondPrice = useCallback(async () => {
    setStat(await yflUsd.getBondStat());
  }, [yflUsd, setStat]);

  useEffect(() => {
    fetchBondPrice().catch((err) => console.error(`Failed to fetch bYFL price: ${err.stack}`));
    const refreshInterval = setInterval(fetchBondPrice, config.refreshInterval);
    return () => clearInterval(refreshInterval);
  }, [fetchBondPrice, yflUsd]);

  return stat;
};

export default useBondStats;
