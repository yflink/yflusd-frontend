import { useCallback } from 'react';
import useYflUsd from './useYflUsd';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useStakeToBoardroom = () => {
  const yflUsd = useYflUsd();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleStake = useCallback(
    (amount: string) => {
      handleTransactionReceipt(
        yflUsd.stakeShareToBoardroom(amount),
        `Stake ${amount} sYFL to the boardroom`,
      );
    },
    [yflUsd, handleTransactionReceipt],
  );
  return { onStake: handleStake };
};

export default useStakeToBoardroom;
