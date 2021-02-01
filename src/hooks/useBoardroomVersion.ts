import { useCallback, useEffect, useState } from 'react';
import useYflUsd from './useYflUsd';

const useBoardroomVersion = () => {
  const [boardroomVersion, setBoardroomVersion] = useState('latest');
  const yflUsd = useYflUsd();

  const updateState = useCallback(async () => {
    setBoardroomVersion(await yflUsd.fetchBoardroomVersionOfUser());
  }, [yflUsd, setBoardroomVersion]);

  useEffect(() => {
    if (yflUsd?.isUnlocked) {
      updateState().catch((err) => console.error(err.stack));
    }
  }, [yflUsd, updateState]);

  return boardroomVersion;
};

export default useBoardroomVersion;
