import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { getSurveyDetail } from 'services/survey';

const SurveyDetail = () => {
  const router = useRouter();
  const surveyId = router.query.id as string | undefined;

  useEffect(() => {
    if (surveyId) {
      getSurveyDetail(surveyId)
        .then((surveyDetail) => {
          console.log(surveyDetail);
        })
        .catch(() => {
          router.push('/');
        });
    }
  }, [surveyId]);

  return <p>Survey: {surveyId}</p>;
};

export default SurveyDetail;
