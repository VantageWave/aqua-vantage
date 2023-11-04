export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginFormProps {
  loading: boolean;
  submitted: (payload: LoginFormData) => void;
}
