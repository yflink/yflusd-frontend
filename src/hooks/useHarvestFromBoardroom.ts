import { useCallback } from 'react';
import useYflUsd from './useYflUsd';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useHarvestFromBoardroom = () => {
  const yflUsd = useYflUsd();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleReward = useCallback(() => {
    handleTransactionReceipt(yflUsd.harvestCashFromBoardroom(), 'Claim YFLUSD from Boardroom');
  }, [yflUsd, handleTransactionReceipt]);

  return { onReward: handleReward };
};

export default useHarvestFromBoardroom;
