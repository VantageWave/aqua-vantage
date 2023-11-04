import { ChangeEvent, FormEvent, useState } from 'react';
import EastSharpIcon from '@mui/icons-material/EastSharp';
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from '@mui/icons-material/Visibility';
import {
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  InputAdornment,
  IconButton,
  Button,
  CircularProgress,
} from '@mui/material';
import type { LoginFormData, LoginFormProps } from './LoginForm.types';

export const LoginForm = ({ loading, submitted }: LoginFormProps) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((show) => !show);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as {
      name: keyof LoginFormData;
      value: string;
    };

    if (!!errors[name]) {
      const { [name]: _, ...rest } = errors;
      setErrors(rest);
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors: Partial<LoginFormData> = {};

    if (formData.email.trim() === '') {
      validationErrors.email = 'Email address is required';
    }

    if (formData.password.trim() === '') {
      validationErrors.password = 'Password is required';
    }

    if (Object.keys(validationErrors).length === 0) {
      submitted(formData);
    } else {
      setErrors(validationErrors);
    }
  };
  return (
    <Box
      component="form"
      onSubmit={submit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        marginTop: '24px',
      }}
    >
      <FormControl variant="outlined" sx={{ marginBottom: '12px' }}>
        <InputLabel htmlFor="email-input" error={Boolean(errors.email)}>
          Email address
        </InputLabel>
        <OutlinedInput
          id="email-input"
          name="email"
          label="Email address"
          aria-label="Email address textfield"
          autoComplete="username"
          value={formData.email}
          onChange={handleInputChange}
          error={Boolean(errors.email)}
        />
        <FormHelperText>{"We'll never share your email."}</FormHelperText>
        {!!errors.email && (
          <FormHelperText error>{errors.email}</FormHelperText>
        )}
      </FormControl>

      <FormControl variant="outlined">
        <InputLabel htmlFor="password-input" error={Boolean(errors.password)}>
          Password
        </InputLabel>
        <OutlinedInput
          id="password-input"
          name="password"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="Toggle password visibility"
                onClick={togglePasswordVisibility}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
          aria-label="Password textfield"
          autoComplete="current-password"
          value={formData.password}
          onChange={handleInputChange}
          error={Boolean(errors.password)}
        />
        {!!errors.password && (
          <FormHelperText error>{errors.password}</FormHelperText>
        )}
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        endIcon={loading ? <CircularProgress size={20} /> : <EastSharpIcon />}
        disabled={loading}
        sx={{ marginTop: '24px', textTransform: 'none' }}
        style={{ backgroundColor: "#1070F4" }}
      >
        Login
      </Button>
    </Box>
  );
};
