/* eslint-disable import/no-extraneous-dependencies */
import '@testing-library/jest-dom';
import {
  render,
  screen,
  fireEvent,
  getByRole,
  act,
  waitForElementToBeRemoved,
  within,
  waitFor,
} from '@testing-library/react';
import { Providers } from '@/lib/redux/providers';
import DogBoard from '@/app/dog-board/page';
import Signin from '@/app/signin/page';
import { setup, Mocks, renderWithProviders } from './common';
import { mockBreeds } from './mockDogsData';

jest.mock('../app/common/utils');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
let mocks: Mocks;
describe('Dog board', () => {
  beforeEach(async () => {
    mocks = setup();
    renderWithProviders(<DogBoard />);
    await waitForElementToBeRemoved(() => screen.queryByTestId('spinner'));
  });

  it('should render breeds dropdown memu correctly', async () => {
    const breedFilterElement = screen.getByTestId('breeds-filter');
    fireEvent.mouseDown(getByRole(breedFilterElement, 'button'));
    const breedListItems = await screen.findAllByTestId(/^breed-[0-9]*$/i);
    expect(breedListItems).toHaveLength(mockBreeds.length);
  });

  it('should be able to filter by breeds', async () => {
    const breedFilterElement = screen.getByTestId('breeds-filter');
    fireEvent.mouseDown(getByRole(breedFilterElement, 'button'));
    fireEvent.click(screen.getByTestId('breed-0'));
    fireEvent.click(screen.getByTestId('breed-1'));
    expect(getByRole(breedFilterElement, 'button', { hidden: true })).toHaveTextContent(
      'Chihuahua, Chow'
    );
    await waitFor(() =>
      expect(mocks.mockClient.get).toHaveBeenCalledWith('/dogs/search', {
        params: {
          ageMax: 100,
          ageMin: 0,
          breeds: ['Chihuahua', 'Chow'],
          from: 0,
          size: 25,
          sort: 'breed:asc',
          zipCodes: [],
        },
      })
    );
  });

  it('should be able to filter by zip codes', async () => {
    const zipCodeFilterElement = screen.getByLabelText('Zip Codes');
    fireEvent.change(zipCodeFilterElement, { target: { value: '25275,11962' } });
    await waitFor(() =>
      expect(mocks.mockClient.get).toHaveBeenCalledWith('/dogs/search', {
        params: {
          ageMax: 100,
          ageMin: 0,
          breeds: [],
          from: 0,
          size: 25,
          sort: 'breed:asc',
          zipCodes: ['25275', '11962'],
        },
      })
    );
  });
});
