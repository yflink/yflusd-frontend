import { useCallback } from 'react';
import useYflUsd from './useYflUsd';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useRedeemOnBoardroom = (description?: string) => {
  const yflUsd = useYflUsd();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleRedeem = useCallback(() => {
    const alertDesc = description || 'Redeem sYFL from Boardroom';
    handleTransactionReceipt(yflUsd.exitFromBoardroom(), alertDesc);
  }, [yflUsd, description, handleTransactionReceipt]);
  return { onRedeem: handleRedeem };
};

export default useRedeemOnBoardroom;
