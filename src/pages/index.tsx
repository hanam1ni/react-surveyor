import type { NextPage } from 'next';

import PageLoader from 'components/PageLoader';
import useSession from 'hooks/useSession';

const Home: NextPage = () => {
  const [, isUserLoading] = useSession();

  return (
    <PageLoader isLoading={isUserLoading}>
      <h1 className="text-white text-2xl font-bold" role="heading">
        Coming soon. Stay tune for more content 😎
      </h1>
    </PageLoader>
  );
};

export default Home;
