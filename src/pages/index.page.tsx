import type { NextPage } from 'next';
import { useContext, useEffect } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';

import { BackgroundContext } from 'components/Container';
import Layout from 'components/Layout';
import PageLoader from 'components/PageLoader';
import useSession from 'hooks/useSession';

const Home: NextPage = () => {
  const { user, loading } = useSession();
  const { setBgUrl } = useContext(BackgroundContext);

  const currentDate = new Date();

  useEffect(() => {
    setBgUrl(null);
  }, [setBgUrl]);

  return (
    <Layout user={user}>
      <PageLoader isLoading={loading}>
        <div className="w-full max-w-3xl mx-auto text-white">
          <section>
            <div className="text-xs font-extrabold uppercase">
              {format(currentDate, 'cccc, LLLL d')}
            </div>
            <div className="text-4xl font-extrabold">Today</div>
          </section>
          <section className="mt-36 flex flex-col items-center">
            <Image
              width={64}
              height={64}
              src="/icon/smiley.svg"
              alt="smiley icon"
            />
            <h2 className="mt-8 text-3xl font-extrabold text-center">
              You&#39;ve completed all the surveys.
              <br /> Take a moment.
            </h2>
          </section>
        </div>
      </PageLoader>
    </Layout>
  );
};

export default Home;
