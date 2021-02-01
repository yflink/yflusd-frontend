import { useCallback } from 'react';
import useYflUsd from './useYflUsd';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import { Bank } from '../yflusd';

const useHarvest = (bank: Bank) => {
  const yflUsd = useYflUsd();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleReward = useCallback(() => {
    handleTransactionReceipt(
      yflUsd.harvest(bank.contract),
      `Claim ${bank.earnTokenName} from ${bank.contract}`,
    );
  }, [bank, yflUsd, handleTransactionReceipt]);

  return { onReward: handleReward };
};

export default useHarvest;
