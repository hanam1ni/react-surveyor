import type { NextPage } from 'next';
import { format } from 'date-fns';

import Layout from 'components/Layout';
import PageLoader from 'components/PageLoader';
import useSession from 'hooks/useSession';

const Home: NextPage = () => {
  const { user, loading } = useSession();

  const currentDate = new Date();

  return (
    <Layout user={user}>
      <PageLoader isLoading={loading}>
        <main className="flex justify-center text-white">
          <div className="w-full max-w-3xl">
            <section>
              <div className="text-xs font-extrabold uppercase">
                {format(currentDate, 'cccc, LLLL d')}
              </div>
              <div className="text-4xl font-extrabold">Today</div>
            </section>
          </div>
        </main>
      </PageLoader>
    </Layout>
  );
};

export default Home;
