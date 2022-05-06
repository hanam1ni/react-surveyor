import type { NextPage } from 'next';
import Image from 'next/image';
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
            <section className="mt-36 flex flex-col items-center">
              <Image
                width={64}
                height={64}
                src="/icon/smiley.svg"
                alt="placeholder icon"
              />
              <h2 className="mt-8 text-2xl font-extrabold text-center">
                You've completed all the surveys.
                <br /> Take a moment.
              </h2>
            </section>
          </div>
        </main>
      </PageLoader>
    </Layout>
  );
};

export default Home;
