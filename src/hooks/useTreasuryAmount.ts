import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import useYflUsd from './useYflUsd';

const useTreasuryAmount = () => {
  const [amount, setAmount] = useState(BigNumber.from(0));
  const yflUsd = useYflUsd();

  useEffect(() => {
    if (yflUsd) {
      const { Treasury } = yflUsd.contracts;
      yflUsd.YFLUSD.balanceOf(Treasury.address).then(setAmount);
    }
  }, [yflUsd]);
  return amount;
};

export default useTreasuryAmount;
