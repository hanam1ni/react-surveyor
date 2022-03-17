import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getUserProfile } from '../services/user';

const withUser =
  (Page: NextPage) =>
  ({ ...props }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
      getUserProfile()
        .then((user) => {
          setUser(user);
        })
        .catch(() => router.push('/login'));
    }, []);

    if (!user) return '';

    return <Page {...props} />;
  };

export default withUser;
