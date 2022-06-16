/* eslint-disable @next/next/no-img-element */
import { format } from 'date-fns';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { Swiper } from 'swiper';

import { BackgroundContext } from 'components/Container';
import Layout from 'components/Layout';
import PageLoader from 'components/PageLoader';
import SurveyList from 'components/SurveyList';
import SurveyListSkeleton from 'components/SurveyListSkeleton';
import useSession from 'hooks/useSession';
import { listSurveys } from 'services/survey';
import { ACTIONS, StoreContext } from 'store';

const CURRENT_DATE_FORMAT = 'cccc, LLLL d';

const SurveyListPlaceholder = () => (
  <div className="mt-24 text-center">
    <Image width={64} height={64} src="/icon/smiley.svg" alt="smiley icon" />
    <h2 className="mt-8 text-3xl font-extrabold text-center">
      You&#39;ve completed all the surveys.
      <br /> Take a moment.
    </h2>
  </div>
);

const Home: NextPage = () => {
  useSession();
  const { setBgUrl } = useContext(BackgroundContext);
  const {
    store: {
      surveys: {
        data: surveys,
        batchInfo: { batch, totalBatches },
      },
      userProfile,
    },
    dispatchAction,
  } = useContext(StoreContext);

  const [surveyFetching, setSurveyFetching] = useState(true);

  useEffect(() => {
    setBgUrl(surveys[0]?.coverImageUrl || null);
  }, [setBgUrl]);

  useEffect(() => {
    listSurveys().then(({ surveys, batchInfo }) => {
      dispatchAction({
        type: ACTIONS.SET_SURVEYS,
        value: {
          data: surveys,
          batchInfo: batchInfo,
        },
      });

      setBgUrl(surveys[0]?.coverImageUrl || null);
      setSurveyFetching(false);
    });
  }, [dispatchAction]);

  const surveyLoading = surveys.length === 0 && surveyFetching;
  const currentDate = new Date();

  const fetchSurveys = async (batch = 1) => {
    const response = await listSurveys({
      params: { page: { number: batch + 1 } },
    });

    dispatchAction({
      type: ACTIONS.SET_SURVEYS,
      value: {
        data: surveys.concat(response.surveys),
        batchInfo: response.batchInfo,
      },
    });
  };

  const onSlideChange = async (swiper: Swiper) => {
    setBgUrl(surveys[swiper.activeIndex].coverImageUrl);

    if (swiper.isEnd && batch < totalBatches) {
      await fetchSurveys(batch + 1);
    }
  };

  return (
    <PageLoader isLoading={!userProfile}>
      <Layout user={userProfile}>
        <div className="h-full w-full max-w-3xl mx-auto flex flex-col text-white">
          <SurveyListSkeleton isLoading={surveyLoading}>
            <>
              <section className="mb-10">
                <div className="text-xs font-extrabold uppercase">
                  {format(currentDate, CURRENT_DATE_FORMAT)}
                </div>
                <div className="text-4xl font-extrabold">Today</div>
              </section>
              <section className="flex-1">
                {surveys.length !== 0 ? (
                  <div className="h-full relative">
                    <SurveyList
                      surveys={surveys}
                      onSlideChange={onSlideChange}
                    />
                  </div>
                ) : (
                  <SurveyListPlaceholder />
                )}
              </section>
            </>
          </SurveyListSkeleton>
        </div>
      </Layout>
    </PageLoader>
  );
};

export default Home;
/* eslint-enable @next/next/no-img-element */
