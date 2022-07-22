/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import BackNavigation from 'components/BackNavigation';
import Button from 'components/Button';
import { BackgroundContext } from 'components/Container';
import PageLoader from 'components/PageLoader';
import useSession from 'hooks/useSession';
import { getSurveyDetail } from 'services/survey';
import { ACTIONS, StoreContext } from 'store';

const SurveyDetail: NextPage = () => {
  useSession();
  const router = useRouter();
  const surveyId = router.query.id as string | undefined;

  const { setBgUrl } = useContext(BackgroundContext);
  const {
    store: { currentSurvey },
    dispatchAction,
  } = useContext(StoreContext);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (surveyId) {
      getSurveyDetail(surveyId)
        .then((surveyDetail) => {
          dispatchAction({
            type: ACTIONS.SET_CURRENT_SURVEY,
            value: surveyDetail,
          });
          setBgUrl(surveyDetail.coverImageUrl);
          setIsLoading(false);
        })
        .catch(() => {
          router.push('/');
        });
    }
  }, [surveyId]);

  return (
    <PageLoader isLoading={isLoading}>
      <div className="h-full flex justify-center items-center">
        <BackNavigation path="/" />
        <div className="w-full max-w-3xl text-white">
          <img
            src={currentSurvey?.intro.coverImageUrl}
            className="w-full h-auto max-h-[360px] mb-8 rounded-lg"
            alt={`${currentSurvey?.intro.text}`}
          />
          <h1 className="text-4xl font-semibold mb-2 text-white">
            {currentSurvey?.title}
          </h1>
          <div className="mb-8 text-gray-400">{currentSurvey?.intro.text}</div>
          <Link href={`/surveys/${surveyId}/questions`} passHref>
            <a>
              <Button label="Start Survey" className="w-full" />
            </a>
          </Link>
        </div>
      </div>
    </PageLoader>
  );
};

export default SurveyDetail;
