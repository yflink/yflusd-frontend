import { useCallback, useEffect, useState } from 'react';
import useYflUsd from './useYflUsd';
import config from '../config';
import { BigNumber } from 'ethers';

const useBondOraclePriceInLastTWAP = () => {
  const [price, setPrice] = useState<BigNumber>(BigNumber.from(0));
  const yflUsd = useYflUsd();

  const fetchCashPrice = useCallback(async () => {
    if (typeof yflUsd === 'undefined') {
      return;
    }
    if (typeof yflUsd.myAccount === 'undefined') {
      return;
    }
    setPrice(await yflUsd.getBondOraclePriceInLastTWAP());
  }, [yflUsd, setPrice]);

  useEffect(() => {
    fetchCashPrice().catch((err) => console.error(`Failed to fetch bYFL price: ${err.stack}`));
    const refreshInterval = setInterval(fetchCashPrice, config.refreshInterval);
    return () => clearInterval(refreshInterval);
  }, [fetchCashPrice, yflUsd]);

  return price;
};

export default useBondOraclePriceInLastTWAP;
