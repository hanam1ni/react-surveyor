/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import type { NextPage } from 'next';
import { useContext, useEffect } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';

import { BackgroundContext } from 'components/Container';
import Layout from 'components/Layout';
import PageLoader from 'components/PageLoader';
import SurveyListSkeleton from 'components/SurveyListSkeleton';
import useSession from 'hooks/useSession';
import { listSurveys } from 'services/survey';
import { ACTIONS, StoreContext } from 'store';

const SurveyListPlaceholder = () => (
  <section className="flex flex-col">
    <Image width={64} height={64} src="/icon/smiley.svg" alt="smiley icon" />
    <h2 className="mt-8 text-3xl font-extrabold text-center">
      You&#39;ve completed all the surveys.
      <br /> Take a moment.
    </h2>
  </section>
);

const Home: NextPage = () => {
  useSession();
  const [surveyFetching, setSurveyFetching] = useState(true);
  const { setBgUrl } = useContext(BackgroundContext);
  const { store, dispatchAction } = useContext(StoreContext);

  const currentDate = new Date();

  useEffect(() => {
    setBgUrl(null);
  }, [setBgUrl]);

  useEffect(() => {
    listSurveys().then((surveys) => {
      dispatchAction({ type: ACTIONS.SET_SURVEYS, value: surveys });
      setSurveyFetching(false);
    });
  }, [dispatchAction]);

  const surveyLoading = store.surveys.length === 0 && surveyFetching;

  return (
    <PageLoader isLoading={!store.userProfile}>
      <Layout user={store.userProfile}>
        <div className="w-full max-w-3xl mx-auto text-white">
          <SurveyListSkeleton isLoading={surveyLoading}>
            <>
              <section className="mb-36">
                <div className="text-xs font-extrabold uppercase">
                  {format(currentDate, 'cccc, LLLL d')}
                </div>
                <div className="text-4xl font-extrabold">Today</div>
              </section>
              {store.surveys.length !== 0 ? (
                <section className="flex items-center">
                  {store.surveys.map((survey) => (
                    <div className="mx-4" key={survey.id}>
                      <img
                        src={survey.coverImageUrl}
                        width={280}
                        height={70}
                        alt={`${survey.id} survey image`}
                      />
                      <h2>{survey.title}</h2>
                      <div>{survey.description}</div>
                    </div>
                  ))}
                </section>
              ) : (
                <SurveyListPlaceholder />
              )}
            </>
          </SurveyListSkeleton>
        </div>
      </Layout>
    </PageLoader>
  );
};

export default Home;
/* eslint-enable @next/next/no-img-element */
