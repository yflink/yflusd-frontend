import React, { createContext, useEffect, useState } from 'react';
import { useWallet } from 'use-wallet';
import YflUsd from '../../yflusd';
import config from '../../config';

export interface YflUsdContext {
  yflUsd?: YflUsd;
}

export const Context = createContext<YflUsdContext>({ yflUsd: null });

export const YflUsdProvider: React.FC = ({ children }) => {
  const { ethereum, account } = useWallet();
  const [yflUsd, setYflUsd] = useState<YflUsd>();

  useEffect(() => {
    if (!yflUsd) {
      const yfl = new YflUsd(config);
      if (account) {
        // wallet was unlocked at initialization
        yfl.unlockWallet(ethereum, account);
      }
      setYflUsd(yfl);
    } else if (account) {
      yflUsd.unlockWallet(ethereum, account);
    }
  }, [account, ethereum, yflUsd]);

  return <Context.Provider value={{ yflUsd }}>{children}</Context.Provider>;
};
