'use client';

import React from 'react';
/* Core */
import { Provider } from 'react-redux';

/* Instruments */
import store from '@/lib/redux/store';

export function Providers(props: React.PropsWithChildren) {
  const { children } = props;
  return <Provider store={store}>{children}</Provider>;
}
