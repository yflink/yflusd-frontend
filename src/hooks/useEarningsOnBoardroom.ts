import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import useYflUsd from './useYflUsd';
import config from '../config';

const useEarningsOnBoardroom = () => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const yflUsd = useYflUsd();

  const fetchBalance = useCallback(async () => {
    setBalance(await yflUsd.getEarningsOnBoardroom());
  }, [yflUsd, setBalance]);

  useEffect(() => {
    if (yflUsd?.isUnlocked) {
      fetchBalance().catch((err) => console.error(err.stack));

      const refreshBalance = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshBalance);
    }
  }, [yflUsd, fetchBalance]);

  return balance;
};

export default useEarningsOnBoardroom;
