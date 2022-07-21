import { Player } from '@lottiefiles/react-lottie-player';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

import PageLoader from 'components/PageLoader';
import useSession from 'hooks/useSession';
import { ACTIONS, StoreContext } from 'store';

const REDIRECT_AFTER_MS = 3000;

const SurveyOutro: NextPage = () => {
  useSession();
  const router = useRouter();

  const {
    store: { currentSurvey },
    dispatchAction,
  } = useContext(StoreContext);

  useEffect(() => {
    if (currentSurvey === null) {
      router.push('/');

      return;
    }

    setTimeout(() => {
      dispatchAction({
        type: ACTIONS.SET_CURRENT_SURVEY,
        value: null,
      });

      router.push('/');
    }, REDIRECT_AFTER_MS);
  }, [currentSurvey, dispatchAction]);

  const outroMessage =
    currentSurvey?.outro?.text || 'Thanks for taking the survey.';

  return (
    <PageLoader isLoading={currentSurvey === null}>
      <div className="w-full h-full flex flex-col justify-center items-center">
        <Player
          autoplay
          keepLastFrame={true}
          speed={0.6}
          src="/lotties/checkmark.json"
          className="w-52 h-52"
        />
        <div className="w-full md:w-[420px] text-3xl text-white font-bold text-center">
          {outroMessage}
        </div>
      </div>
    </PageLoader>
  );
};

export default SurveyOutro;
