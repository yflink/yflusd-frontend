import { useContext } from 'react';
import { Context } from '../contexts/YflUsdProvider';

const useYflUsd = () => {
  const { yflUsd } = useContext(Context);
  return yflUsd;
};

export default useYflUsd;
