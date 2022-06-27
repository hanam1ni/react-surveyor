import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

import { getSurveyDetail } from 'services/survey';
import { ACTIONS, StoreContext } from 'store';

const SurveyDetail: NextPage = () => {
  const router = useRouter();
  const surveyId = router.query.id as string | undefined;

  const { dispatchAction } = useContext(StoreContext);

  useEffect(() => {
    if (surveyId) {
      getSurveyDetail(surveyId)
        .then((surveyDetail) => {
          dispatchAction({
            type: ACTIONS.SET_CURRENT_SURVEY,
            value: surveyDetail,
          });
        })
        .catch(() => {
          router.push('/');
        });
    }
  }, [surveyId]);

  return <p>Survey: {surveyId}</p>;
};

export default SurveyDetail;
