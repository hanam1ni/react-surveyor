import type { NextPage } from 'next';

import PageLoader from 'components/PageLoader';
import useSession from 'hooks/useSession';

const Home: NextPage = () => {
  const { loading } = useSession();

  return (
    <PageLoader isLoading={loading}>
      <h1 className="text-white text-2xl font-bold" role="heading">
        Coming soon. Stay tune for more content 😎
      </h1>
    </PageLoader>
  );
};

export default Home;
