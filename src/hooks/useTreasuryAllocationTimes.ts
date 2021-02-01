import { useEffect, useState } from 'react';
import useYflUsd from './useYflUsd';
import { TreasuryAllocationTime } from '../yflusd/types';

const useTreasuryAllocationTimes = () => {
  const [time, setTime] = useState<TreasuryAllocationTime>({
    prevAllocation: new Date(),
    nextAllocation: new Date(),
  });
  const yflUsd = useYflUsd();

  useEffect(() => {
    if (yflUsd) {
      yflUsd.getTreasuryNextAllocationTime().then(setTime);
    }
  }, [yflUsd]);
  return time;
};

export default useTreasuryAllocationTimes;
