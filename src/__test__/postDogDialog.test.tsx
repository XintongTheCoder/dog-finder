/* eslint-disable import/no-extraneous-dependencies */
import '@testing-library/jest-dom';
import { screen, fireEvent, waitForElementToBeRemoved, waitFor } from '@testing-library/react';
import { setup, Mocks, renderWithProviders } from './common';
import DogBoard from '@/app/dog-board/page';
import SignIn from '@/app/sign-in/page';

jest.mock('../app/common/utils');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
let mocks: Mocks;
describe('Dog board', () => {
  beforeEach(async () => {
    mocks = setup();
    renderWithProviders(
      <>
        <SignIn />
        <DogBoard />
      </>
    );
    fireEvent.click(screen.getByTestId('sign-in-btn'));
    await waitForElementToBeRemoved(() => screen.queryByTestId('spinner'));
    fireEvent.click(screen.getAllByText(/I'm a shelter owner/i)[0]);
  });

  it('should disable post button when the dog form data is not complete or valid', async () => {
    await waitFor(() => expect(screen.getByRole('button', { name: 'Post' })).toBeDisabled());
  });

  it('should enable post button when the dog form data is complete and valid', async () => {
    fireEvent.change(screen.getByLabelText('Dog name *'), { target: { value: 'Huahua' } });
    fireEvent.mouseDown(screen.getByLabelText('Breed *'));
    fireEvent.click(screen.getByTestId('breed-0'));
    fireEvent.change(screen.getByLabelText('Age *'), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText('Image *'), { target: { value: 'https://someurl' } });
    fireEvent.change(screen.getByLabelText('Zip Code *'), { target: { value: '12345' } });
    await waitFor(() => expect(screen.getByRole('button', { name: 'Post' })).not.toBeDisabled());
  });
});
