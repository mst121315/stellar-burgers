import React from 'react';
import { useAppSelector } from '../../services/store';
import { RootState } from '../../services/store';
import { AppHeaderUI } from '@ui';

export const AppHeader = () => {
  const userName = useAppSelector(
    (state: RootState) => state.auth.user?.name || ''
  );

  return <AppHeaderUI userName={userName} />;
};
