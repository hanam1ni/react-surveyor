import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { getUserProfile, UserProfile } from 'services/user';

const useSession = (): { user: UserProfile | null; loading: boolean } => {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    getUserProfile()
      .then((userProfile) => {
        setUser(userProfile);
        setloading(false);
      })
      .catch(() => {
        router.push('/login');
      });
  }, []);

  return { user, loading };
};

export default useSession;
