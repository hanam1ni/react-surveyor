import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { getUserProfile, UserProfile } from 'services/user';
import { ErrorResponse } from 'utils/httpClient';

const useSession = ({ redirect = true } = {}): {
  user: UserProfile | null;
  loading: boolean;
  error: ErrorResponse | null;
} => {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorResponse | null>(null);

  useEffect(() => {
    getUserProfile()
      .then((userProfile) => {
        setLoading(false);
        setUser(userProfile);
      })
      .catch((errorResponse) => {
        setError(errorResponse);
        redirect && router.push('/login');
      });
  }, []);

  return { user, loading, error };
};

export default useSession;
