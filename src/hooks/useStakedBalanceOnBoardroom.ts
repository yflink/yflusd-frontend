import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import useYflUsd from './useYflUsd';
import config from '../config';

const useStakedBalanceOnBoardroom = () => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const yflUsd = useYflUsd();

  const fetchBalance = useCallback(async () => {
    if (typeof yflUsd === 'undefined') {
      return;
    }
    setBalance(await yflUsd.getStakedSharesOnBoardroom());
  }, [yflUsd, setBalance]);

  useEffect(() => {
    fetchBalance().catch((err) => console.error(err.stack));

    const refreshBalance = setInterval(fetchBalance, config.refreshInterval);
    return () => clearInterval(refreshBalance);
  }, [yflUsd, fetchBalance]);

  return balance;
};

export default useStakedBalanceOnBoardroom;
