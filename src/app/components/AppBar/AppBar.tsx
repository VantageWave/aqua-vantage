'use client';
import React, { useState, useMemo } from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Avatar,
  Tooltip,
} from '@mui/material';
import { Page } from './types';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { useThemeModeContext } from '@/providers/useThemeMode';

const pages: Page[] = [
  {
    page: 'Home',
    path: '/',
  },
  {
    page: 'Catalogs',
    path: '/catalogs',
  },
  {
    page: 'Map',
    path: '/map',
  },
];

function CustomAppBar() {
  const router = useRouter();
  const { toggleColorMode } = useThemeModeContext();

  const theme = useTheme();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const logOut = () => {
    signOut({ redirect: false, callbackUrl: '/login' }).then(({ url }) =>
      router.push(url)
    );
  };

  const settings = useMemo(
    () => [
      {
        label: 'Profile',
      },
      { label: 'Account' },
      { label: 'Dashboard' },
      { label: 'Logout', action: logOut },
    ],
    []
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" style={{ borderBottom: "1px solid rgba(120, 120, 120,0.95)", backgroundColor: "black"}}>
      <Container maxWidth="xl" style={{ padding:"8px 20px"}}>
        <Toolbar disableGutters>
          <Image src="/wwlogo.png" alt="wwlogo" width={36} height={36} style={{ marginRight: "20px"}}/>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 10,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 500,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            waterwatch
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
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
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map(({ path, page }) => (
                <MenuItem
                  key={page}
                  onClick={() => {
                    router.push(path);
                    handleCloseNavMenu();
                  }}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
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
            VWave
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map(({ path, page }) => (
              <Link href={path} key={page}>
                <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                  <Typography textAlign="center">{page}</Typography>
                </Button>
              </Link>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                <Avatar alt="Remy Sharp" src="" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key="Dark mode" onClick={toggleColorMode}>
                <Typography textAlign="center">
                  {theme.palette.mode === 'dark' ? 'Light mode' : 'Dark mode'}
                </Typography>
              </MenuItem>
              {settings.map(({ label, action }) => (
                <MenuItem
                  key={label}
                  onClick={() => {
                    action?.();
                    handleCloseUserMenu();
                  }}
                >
                  <Typography textAlign="center">{label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default CustomAppBar;
