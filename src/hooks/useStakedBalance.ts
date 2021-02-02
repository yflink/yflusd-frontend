import { useCallback, useEffect, useState } from 'react';

import { BigNumber } from 'ethers';
import useYflUsd from './useYflUsd';
import { ContractName } from '../yflusd';
import config from '../config';

const useStakedBalance = (poolName: ContractName) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const yflUsd = useYflUsd();

  const fetchBalance = useCallback(async () => {
    if(typeof(yflUsd.myAccount) === 'undefined') {
      return
    }
    const balance = await yflUsd.stakedBalanceOnBank(poolName, yflUsd.myAccount);
    setBalance(balance);
  }, [yflUsd, poolName, setBalance]);

  useEffect(() => {
      fetchBalance().catch((err) => console.error(err.stack));

      const refreshBalance = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshBalance);
  }, [yflUsd, fetchBalance]);

  return balance;
};

export default useStakedBalance;
