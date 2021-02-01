import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import useYflUsd from './useYflUsd';
import { ContractName } from '../yflusd';
import config from '../config';

const useEarnings = (poolName: ContractName) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const yflUsd = useYflUsd();

  const fetchBalance = useCallback(async () => {
    const balance = await yflUsd.earnedFromBank(poolName, yflUsd.myAccount);
    setBalance(balance);
  }, [yflUsd, poolName, setBalance]);

  useEffect(() => {
    if (yflUsd?.isUnlocked) {
      fetchBalance().catch((err) => console.error(err.stack));

      const refreshBalance = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshBalance);
    }
  }, [yflUsd, poolName, fetchBalance]);

  return balance;
};

export default useEarnings;
