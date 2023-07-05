/* eslint-disable import/no-extraneous-dependencies */
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Providers } from '@/lib/redux/providers';
import SignIn from '@/app/sign-in/page';
import { setup, Mocks } from './common';

jest.mock('../app/common/utils');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
let mocks: Mocks;
describe('Sign in page', () => {
  beforeEach(() => {
    mocks = setup();
    render(<SignIn />, { wrapper: Providers });
  });

  it('should allow user to sign in', async () => {
    await fireEvent.click(screen.getByRole('button'));
    expect(mocks.mockPush).toHaveBeenCalledWith('/dog-board');
  });
});
