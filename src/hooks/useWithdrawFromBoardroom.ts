import { useCallback } from 'react';
import useYflUsd from './useYflUsd';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useWithdrawFromBoardroom = () => {
  const yflUsd = useYflUsd();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleWithdraw = useCallback(
    (amount: string) => {
      handleTransactionReceipt(
        yflUsd.withdrawShareFromBoardroom(amount),
        `Withdraw ${amount} sYFL from the boardroom`,
      );
    },
    [yflUsd, handleTransactionReceipt],
  );
  return { onWithdraw: handleWithdraw };
};

export default useWithdrawFromBoardroom;
