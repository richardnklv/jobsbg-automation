import { useRouter } from 'next/navigation';

export const ROUTES = {
  LOGIN: '/',
  UPLOAD: '/upload',
  RECRUITER: '/recruiter',
} as const;

export const useAppRouter = () => {
  const router = useRouter();
  
  const navigate = {
    login: () => router.push(ROUTES.LOGIN),
    upload: () => router.push(ROUTES.UPLOAD),
    recruiter: () => router.push(ROUTES.RECRUITER),
  };

  return { navigate };
};