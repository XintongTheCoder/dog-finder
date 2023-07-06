/* eslint-disable import/no-extraneous-dependencies */
import React, { ReactElement, PropsWithChildren } from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { AxiosInstance } from 'axios';
import type { RenderOptions } from '@testing-library/react';
import type { PreloadedState } from '@reduxjs/toolkit';
import { AppStore, RootState, setupStore } from '@/lib/redux/store';
import { Provider } from 'react-redux';
import { useRouter } from 'next/navigation';
import { client } from '../app/common/utils';
import { mockBreeds, mockDogIds, mockDogs } from './mockDogsData';

export interface Mocks {
  mockClient: jest.Mocked<AxiosInstance>;
  mockUseRouter: jest.Mock<any, any, any>;
  mockPush: jest.Mock<any, any, any>;
}

export function setup() {
  const mockUseRouter = useRouter as jest.Mock;
  const mockPush = jest.fn();
  mockUseRouter.mockReturnValue({
    push: mockPush,
  });

  // const mockAxios = axios as jest.Mocked<typeof axios>;
  const mockClient = client as jest.Mocked<AxiosInstance>;

  mockClient.get.mockImplementation((url) => {
    if (url === '/dogs/breeds') {
      return Promise.resolve({
        data: mockBreeds,
      });
    }
    if (url === '/dogs/search') {
      return Promise.resolve({
        data: mockDogIds,
      });
    }
    return Promise.reject(new Error('Mock axios GET failed: invalid url'));
  });

  mockClient.post.mockImplementation((url) => {
    if (url === '/auth/login') {
      return Promise.resolve({
        status: 200,
      });
    }
    if (url === '/dogs') {
      return Promise.resolve({
        data: mockDogs,
      });
    }
    if (url === '/dogs/match') {
      return Promise.resolve({ status: 200, data: { match: mockDogIds.resultIds[1] } });
    }
    return Promise.reject(new Error('Mock axios POST failed: invalid url'));
  });
  return { mockClient, mockUseRouter, mockPush };
}

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): React.JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
