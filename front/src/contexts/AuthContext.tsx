// src/contexts/AuthProvider.tsx
import { useEffect } from "react";
import { useAuthStore } from "../stores/useAuthStore";
// import { useQuery } from '@tanstack/react-query';
// import { toast } from 'react-hot-toast';
// import { usersService } from '../services/usersService';
// import { useAuthStore } from '../store/auth-store';
// import { LaunchScreen } from '../../view/components/LaunchScreen';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const signedIn = useAuthStore((s) => s.signedIn);
  const setUser = useAuthStore((s) => s.setUser);
  const signout = useAuthStore((s) => s.signout);

  const { data, isFetching, isError, isSuccess, remove } = useQuery({
    queryKey: ["users", "me"],
    queryFn: () => usersService.me(),
    enabled: signedIn,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (isError) {
      // toast.error('Sua sessão expirou!');
      signout();
      remove();
    }
  }, [isError, signout, remove]);

  useEffect(() => {
    if (isSuccess && data) {
      setUser(data);
    }
  }, [isSuccess, data, setUser]);

  return (
    <>
      <LaunchScreen isLoading={isFetching} />
      {!isFetching && children}
    </>
  );
}
