import { useCallback, useEffect, useState } from 'react';
import useYflUsd from './useYflUsd';
import config from '../config';
import { BigNumber } from 'ethers';

const useCashPriceInLastTWAP = () => {
  const [price, setPrice] = useState<BigNumber>(BigNumber.from(0));
  const yflUsd = useYflUsd();

  const fetchCashPrice = useCallback(async () => {
    setPrice(await yflUsd.getCashPriceInLastTWAP());
  }, [yflUsd]);

  useEffect(() => {
    fetchCashPrice().catch((err) => console.error(`Failed to fetch BAC price: ${err.stack}`));
    const refreshInterval = setInterval(fetchCashPrice, config.refreshInterval);
    return () => clearInterval(refreshInterval);
  }, [setPrice, yflUsd]);

  return price;
};

export default useCashPriceInLastTWAP;
