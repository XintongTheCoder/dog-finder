/* eslint-disable import/no-extraneous-dependencies */
import '@testing-library/jest-dom';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import SignIn from '@/app/sign-in/page';
import { setup, Mocks, renderWithProviders } from './common';

jest.mock('../app/common/utils');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
let mocks: Mocks;
describe('Sign in page', () => {
  beforeEach(() => {
    mocks = setup();
    renderWithProviders(<SignIn />);
  });

  it('should not allow invalid email to sign in', async () => {
    fireEvent.change(screen.getByLabelText('Email Address *'), { target: { value: 'user@gmail' } });
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeDisabled();
  });

  it('should allow user to sign in', async () => {
    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));
    await waitFor(() => expect(mocks.mockPush).toHaveBeenCalledWith('/dog-board'));
  });
});
