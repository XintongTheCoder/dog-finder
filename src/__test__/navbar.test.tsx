/* eslint-disable import/no-extraneous-dependencies */
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Providers } from '@/lib/redux/providers';
import Navbar from '@/app/common/navbar';
import { setup, Mocks } from './common';

jest.mock('../app/common/utils');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
let mocks: Mocks;
describe('Navbar', () => {
  beforeEach(() => {
    mocks = setup();
    render(<Navbar />, { wrapper: Providers });
  });

  it('should render sign-in correctly', () => {
    expect(screen.getAllByText('Sign in')[0]).toBeInTheDocument();
    fireEvent.click(screen.getAllByText('Sign in')[0]);
    expect(mocks.mockPush).toHaveBeenCalledWith('/sign-in');
  });

  it('should not render post button and sign-out button without user signed in', () => {
    expect(screen.queryByText('Sign up')).not.toBeInTheDocument();
    expect(screen.queryByText("I'M A SHELTER OWNER")).not.toBeInTheDocument();
  });
});
