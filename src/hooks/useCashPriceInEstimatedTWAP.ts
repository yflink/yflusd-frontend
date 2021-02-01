import { useCallback, useEffect, useState } from 'react';
import useYflUsd from './useYflUsd';
import { TokenStat } from '../yflusd/types';
import config from '../config';

const useCashPriceInEstimatedTWAP = () => {
  const [stat, setStat] = useState<TokenStat>();
  const yflUsd = useYflUsd();

  const fetchCashPrice = useCallback(async () => {
    setStat(await yflUsd.getCashStatInEstimatedTWAP());
  }, [yflUsd, setStat]);

  useEffect(() => {
    fetchCashPrice().catch((err) => console.error(`Failed to fetch bYFL price: ${err.stack}`));
    const refreshInterval = setInterval(fetchCashPrice, config.refreshInterval);
    return () => clearInterval(refreshInterval);
  }, [fetchCashPrice, yflUsd]);

  return stat;
};

export default useCashPriceInEstimatedTWAP;
