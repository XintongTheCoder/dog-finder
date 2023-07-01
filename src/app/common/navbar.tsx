'use client';

import { useState, MouseEvent } from 'react';
import { useAppSelector } from '@/lib/redux/hooks';
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

export default function Navbar() {
  const { isLoggedIn } = useAppSelector((state) => state.user);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <PetsIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
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
            <Button
              key="signin-out"
              href={isLoggedIn ? '/' : '/dog-board'}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {isLoggedIn ? 'Sign out' : 'Signin'}
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
              <MenuItem key="signin-out" href={isLoggedIn ? '/' : 'dog-board'}>
                <Typography textAlign="center">{isLoggedIn ? 'Sign out' : 'Sign in'}</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
