/* eslint-disable import/no-extraneous-dependencies */
import '@testing-library/jest-dom';
import {
  screen,
  fireEvent,
  getByRole,
  waitForElementToBeRemoved,
  waitFor,
} from '@testing-library/react';
import DogBoard from '@/app/dog-board/page';
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

  it('should be able to filter by ages', async () => {
    const ageMinFilterElement = screen.getByLabelText('Age Min');
    fireEvent.change(ageMinFilterElement, { target: { value: 2 } });
    const ageMaxFilterElement = screen.getByLabelText('Age Max');
    fireEvent.change(ageMaxFilterElement, { target: { value: 3 } });
    await waitFor(() =>
      expect(mocks.mockClient.get).toHaveBeenCalledWith('/dogs/search', {
        params: {
          ageMax: 3,
          ageMin: 2,
          breeds: [],
          from: 0,
          size: 25,
          sort: 'breed:asc',
          zipCodes: [],
        },
      })
    );
  });

  it('should be able to sort', async () => {
    const sortByElement = screen.getByTestId('sort-by');
    fireEvent.mouseDown(getByRole(sortByElement, 'button'));
    fireEvent.click(screen.getByTestId('breed-desc'));
    await waitFor(() =>
      expect(mocks.mockClient.get).toHaveBeenCalledWith('/dogs/search', {
        params: {
          ageMax: 100,
          ageMin: 0,
          breeds: [],
          from: 0,
          size: 25,
          sort: 'breed:desc',
          zipCodes: [],
        },
      })
    );
  });

  it('should be able to select favorite dogs and request a match', async () => {
    const favoriteBtnElements = screen.getAllByTestId(/^fav-btn-.*$/i);
    fireEvent.click(favoriteBtnElements[1]);
    fireEvent.click(favoriteBtnElements[2]);
    fireEvent.click(screen.getByTestId('match-btn'));
    await waitFor(() =>
      expect(mocks.mockClient.post).toHaveBeenCalledWith('/dogs/match', [
        'V3GFTIcBOvEgQ5OCx40W',
        'WHGFTIcBOvEgQ5OCx40W',
      ])
    );
  });
});
