'use client';

import React from 'react';
/* Core */
import { Provider } from 'react-redux';

/* Instruments */
import { setupStore } from '@/lib/redux/store';

const store = setupStore();

export function Providers(props: React.PropsWithChildren) {
  const { children } = props;
  return <Provider store={store}>{children}</Provider>;
}
