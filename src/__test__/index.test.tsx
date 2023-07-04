/* eslint-disable import/no-extraneous-dependencies */
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import { Providers } from '@/lib/redux/providers';
import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks';
import { useRouter } from 'next/navigation';
import Home from '../app/page';
import { mockBreeds, mockDogIds, mockDogs } from './mockDogsData';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;
mockAxios.get.mockImplementation((url) => {
  if (url === 'dogs/breeds') {
    return Promise.resolve({
      data: mockBreeds,
    });
  }
  if (url === '/dogs/search') {
    return Promise.resolve({
      data: mockDogIds,
    });
  }
  return Promise.reject(new Error('Mock axios GET failed: wrong url'));
});

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
const mockUseRouter = useRouter as jest.Mock;
const mockPush = jest.fn();
mockUseRouter.mockReturnValue({
  push: mockPush,
});

describe('Landing page', () => {
  beforeEach(() => {
    render(
      <Providers>
        <Home />
      </Providers>
    );
  });

  it('renders a heading', () => {
    render(<Home />);

    const heading = screen.getByText('Dog Finder');

    expect(heading).toBeInTheDocument();
  });
});
