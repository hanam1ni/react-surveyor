import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { getUserProfile, UserProfile } from 'services/user';

const useSession = (): [UserProfile | null, boolean] => {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    getUserProfile()
      .then((user) => {
        setUser(user);
        setloading(false);
      })
      .catch(() => router.push('/login'));
  }, []);

  return [user, loading];
};

export default useSession;
