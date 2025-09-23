import { useRouter } from 'next/navigation';

export const ROUTES = {
  LOGIN: '/',
  UPLOAD: '/upload',
} as const;

export const useAppRouter = () => {
  const router = useRouter();
  
  const navigate = {
    login: () => router.push(ROUTES.LOGIN),
    upload: () => router.push(ROUTES.UPLOAD),
  };

  return { navigate };
};