import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import { getUserProfile } from 'services/user';
import { ACTIONS, StoreContext } from 'store';
import { ErrorResponse } from 'utils/httpClient';

const useSession = ({ redirect = true } = {}): {
  loading: boolean;
  error: ErrorResponse | null;
} => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorResponse | null>(null);
  const { dispatchAction } = useContext(StoreContext);

  useEffect(() => {
    getUserProfile()
      .then((userProfile) => {
        setLoading(false);
        dispatchAction({ type: ACTIONS.SET_USER_PROFILE, value: userProfile });
      })
      .catch((errorResponse) => {
        setError(errorResponse);
        redirect && router.push('/login');
      });
  }, []);

  return { loading, error };
};

export default useSession;
