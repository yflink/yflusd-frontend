import { useCallback } from 'react';
import useYflUsd from './useYflUsd';
import { Bank } from '../yflusd';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useRedeem = (bank: Bank) => {
  const yflUsd = useYflUsd();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleRedeem = useCallback(() => {
    handleTransactionReceipt(yflUsd.exit(bank.contract), `Redeem ${bank.contract}`);
  }, [bank, yflUsd, handleTransactionReceipt]);

  return { onRedeem: handleRedeem };
};

export default useRedeem;
