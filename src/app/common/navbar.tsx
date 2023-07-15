'use client';

import { useState, MouseEvent, ReactElement } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import PetsIcon from '@mui/icons-material/Pets';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/navigation';
import { updateUserLogin } from '@/lib/redux/slices/userSlice';
import { client } from './utils';

interface Props {
  setPostDialogOpen?: (open: boolean) => void;
}

export default function Navbar({ setPostDialogOpen }: Props): ReactElement {
  const { isLoggedIn } = useAppSelector((state) => state.user);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSigninSignout = async () => {
    if (isLoggedIn) {
      await client.post('/auth/logout');
      dispatch(updateUserLogin(false));
      router.push('/');
    } else {
      router.push('/sign-in');
    }
  };

  const handlePost = () => {
    setPostDialogOpen && setPostDialogOpen(true);
  };

  return (
    <AppBar position="static" color="primary">
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <PetsIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} fontSize="large" />
          <Typography
            variant="h4"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Dog Finder
          </Typography>

          <PetsIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Dog Finder
          </Typography>
          <Box
            sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
            display="flex"
            justifyContent="right"
            alignItems="center"
          >
            {isLoggedIn && (
              <Button
                key="shelter-owner"
                size="large"
                variant="outlined"
                sx={{ my: 2, color: 'white', display: 'block' }}
                onClick={handlePost}
              >
                I'm a shelter owner
              </Button>
            )}
            <Button
              key="sign-in-out"
              size="large"
              variant="outlined"
              sx={{ my: 2, color: 'white', display: 'block' }}
              onClick={handleSigninSignout}
            >
              {isLoggedIn ? 'Sign out' : 'Sign in'}
            </Button>
          </Box>

          <Box
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            display="flex"
            justifyContent="right"
            alignItems="center"
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={(event: MouseEvent<HTMLElement>) => {
                setAnchorElNav(event.currentTarget);
              }}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={() => {
                setAnchorElNav(null);
              }}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {isLoggedIn && (
                <MenuItem key="shelter-owner" onClick={handlePost}>
                  <Typography textAlign="center">I'm a shelter owner</Typography>
                </MenuItem>
              )}
              <MenuItem key="sign-in-out" onClick={handleSigninSignout}>
                <Typography textAlign="center">{isLoggedIn ? 'Sign out' : 'Sign in'}</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
