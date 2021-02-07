import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import ERC20 from '../yflusd/ERC20';
import useYflUsd from './useYflUsd';
import config from '../config';

const useTokenBalance = (token: ERC20) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const yflUsd = useYflUsd();

  const fetchBalance = useCallback(async () => {
    if (typeof yflUsd === 'undefined') {
      return;
    }
    if (typeof yflUsd.myAccount === 'undefined') {
      return;
    }
    setBalance(await token.balanceOf(yflUsd.myAccount));
  }, [yflUsd, token, setBalance]);

  useEffect(() => {
    fetchBalance().catch((err) => console.error(`Failed to fetch token balance: ${err.stack}`));
    let refreshInterval = setInterval(fetchBalance, config.refreshInterval);
    return () => clearInterval(refreshInterval);
  }, [yflUsd, fetchBalance]);

  return balance;
};

export default useTokenBalance;
