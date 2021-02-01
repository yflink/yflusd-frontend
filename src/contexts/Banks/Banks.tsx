import React, { useCallback, useEffect, useState } from 'react';
import Context from './context';
import useYflUsd from '../../hooks/useYflUsd';
import { Bank } from '../../yflusd';
import config, { bankDefinitions } from '../../config';

const Banks: React.FC = ({ children }) => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const yflUsd = useYflUsd();

  const fetchPools = useCallback(async () => {
    const banks: Bank[] = [];

    for (const bankInfo of Object.values(bankDefinitions)) {
      if (bankInfo.finished) {
        if (!yflUsd.isUnlocked) continue;

        // only show pools staked by user
        const balance = await yflUsd.stakedBalanceOnBank(bankInfo.contract, yflUsd.myAccount);
        if (balance.lte(0)) {
          continue;
        }
      }
      banks.push({
        ...bankInfo,
        address: config.deployments[bankInfo.contract].address,
        depositToken: yflUsd.externalTokens[bankInfo.depositTokenName],
        earnToken: bankInfo.earnTokenName === 'YFLUSD' ? yflUsd.YFLUSD : yflUsd.SYFL,
      });
    }
    banks.sort((a, b) => (a.sort > b.sort ? 1 : -1));
    setBanks(banks);
  }, [yflUsd, setBanks]);

  useEffect(() => {
    if (yflUsd) {
      fetchPools().catch((err) => console.error(`Failed to fetch pools: ${err.stack}`));
    }
  }, [yflUsd, fetchPools]);

  return <Context.Provider value={{ banks }}>{children}</Context.Provider>;
};

export default Banks;
