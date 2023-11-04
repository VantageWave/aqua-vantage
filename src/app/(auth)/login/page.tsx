'use client';

import { SyntheticEvent, useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Box, Grid, Snackbar, Typography } from '@mui/material';
import Logo from '../../../../public/logo.png';
import LoginBackgroundImage from '../../../../public/chaos.svg';
import { LoginForm } from './_components/LoginForm';
import { LoginFormData } from './_components/LoginForm.types';
import { useThemeMode } from '@/providers/useThemeMode';

export default function Page() {
  const router = useRouter();
  const [mode] = useThemeMode();
  const [loading, setLoading] = useState(false);
  const [errorCode, setErrorCode] = useState<number | null>(null);
  const [snackbarOpened, setSnackbarOpened] = useState(false);

  useEffect(() => {
    !!errorCode && setSnackbarOpened(true);
  }, [errorCode]);

  const login = async (credentials: LoginFormData) => {
    setLoading(true);

    try {
      const response = await signIn('credentials', {
        ...credentials,
        redirect: false,
      });

      if (!response?.ok) {
        return setErrorCode(response?.status ?? 500);
      }

      router.push('/map');
    } catch (e) {
      setErrorCode(500);
    } finally {
      setLoading(false);
    }
  };

  const createErrorMessage = (code: number | null) => {
    switch (code) {
      case 401:
        return 'Invalid email address or password.';
      case 500:
      default:
        return 'There is a problem with the server. Try again later.';
    }
  };

  const closeErrorSnackbar = (
    event: SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpened(false);
  };

  const isDarkMode = mode === "dark";

  const colors = {
    primary: isDarkMode ? "#ffffff" : "#13141C",
    secondary: isDarkMode ? "#1070C4" : "#3F4668",
  }

  return (
    <Grid height="100vh" container>
      <Grid
        container
        item
        xs={4}
        paddingX="60px"
        paddingY="24px"
        direction="column"
      >
        <Grid item xs={2}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            <img alt="Logo" src={Logo.src} width="40px" height="40px" />
            <Typography color={colors.primary} fontWeight="500">
              vantage wave
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={10} paddingX="32px" paddingTop="24px">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography color={isDarkMode ? colors.primary : colors.secondary} fontSize="40px">
              Sign in
            </Typography>

            <Typography
              sx={{ color: colors.secondary, fontSize: '16px', marginTop: '24px' }}
            >
              Log in to <span style={{ fontWeight: 600 }}>Water Watch</span> and
              unlock the limitless possibilities of harnessing the power of
              satellite data and shape a more sustainable future.
            </Typography>

            <LoginForm loading={loading} submitted={login} />

            <Snackbar
              open={snackbarOpened}
              autoHideDuration={5000}
              message={createErrorMessage(errorCode)}
              onClose={closeErrorSnackbar}
            />
          </Box>
        </Grid>
      </Grid>
      <Grid container item xs={8} sx={{ position: 'relative' }}>
        <img
          alt="Image"
          src={LoginBackgroundImage.src}
          style={{ width: '100%', height: '100%', position: 'absolute' }}
        />
      </Grid>
    </Grid>
  );
}
