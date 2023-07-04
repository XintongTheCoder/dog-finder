/* eslint-disable import/no-extraneous-dependencies */
import '@testing-library/jest-dom';
import { AxiosInstance } from 'axios';
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
    if (url === 'auth/login') {
      return Promise.resolve({
        status: 200,
      });
    }
    if (url === '/dogs') {
      return Promise.resolve({
        data: mockDogs,
      });
    }
    return Promise.reject(new Error('Mock axios POST failed: invalid url'));
  });
  return { mockClient, mockUseRouter, mockPush };
}
