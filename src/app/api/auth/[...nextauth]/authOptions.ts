import { AuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { delay } from '@/app/utils/delay';

const staticCredentials: Pick<User, 'id' | 'email'> & { password: string } = {
  id: '1',
  email: 'test@vwave.com',
  password: 'password',
};

const user: User = {
  id: '1',
  email: 'test@vwave.com',
};


export const authOptions: AuthOptions = {
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: { label: 'Email', type: 'text' },
          password: { label: 'Password', type: 'password' },
        },
        authorize: async (credentials) => {
          const valid =
            credentials?.email === staticCredentials.email &&
            credentials?.password === staticCredentials.password;
  
          await delay(1500);
  
          if (valid) {
            return user;
          }
  
          return null;
        },
      }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: { strategy: 'jwt' },
  };