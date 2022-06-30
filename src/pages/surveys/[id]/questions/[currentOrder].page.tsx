import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useContext, useEffect, useMemo, useState } from 'react';

import Button from 'components/Button';
import PageLoader from 'components/PageLoader';
import SurveyQuestion from 'components/SurveyQuestion';
import useSession from 'hooks/useSession';
import {
  SurveyQuestion as SurveyQuestionInterface,
  SurveyResponse,
} from 'services/surveyInterfaces';
import { ACTIONS, StoreContext } from 'store';

import styles from './[currentOrder].module.css';

const Question: NextPage = () => {
  useSession();
  const router = useRouter();
  const currentQuestionOrder = parseInt(router.query.currentOrder as string);
  const surveyId = router.query.id as string;

  const {
    store: { currentSurvey, surveyResponses },
    dispatchAction,
  } = useContext(StoreContext);

  const currentQuestion = useMemo(
    () =>
      currentSurvey?.questions.find(
        ({ displayOrder }) => displayOrder === currentQuestionOrder
      ),
    []
  ) as SurveyQuestionInterface;

  const [isLoading, setIsLoading] = useState(true);
  const [responses, setResponses] = useState<SurveyResponse | null>(null);

  useEffect(() => {
    if (currentQuestion !== undefined) {
      const response = surveyResponses.find(
        ({ questionId }) => questionId === currentQuestion.id
      );

      response && setResponses(response);

      setIsLoading(false);
    } else {
      router.push(`/surveys/${surveyId}`);
    }
  }, [currentQuestionOrder]);

  const lastQuestionOrder = currentSurvey?.questions.length || 0;

  const onSubmitAnswer = () => {
    if (responses !== null) {
      dispatchAction({
        type: ACTIONS.SET_SURVEY_RESPONSE,
        value: responses,
      });

      router.push(`/surveys/${surveyId}/questions/${questionOrder + 1}`);
    }
  };

  return (
    <PageLoader isLoading={isLoading}>
      <>
        <div className="h-full w-full max-w-3xl mx-auto flex flex-col justify-center">
          <div className="mb-4 text-gray-400">{`${currentQuestionOrder}/${lastQuestionOrder}`}</div>
          <SurveyQuestion
            question={currentQuestion}
            currentResponses={responses}
            setResponses={setResponses}
          />
        </div>
        <div className="absolute bottom-8 right-8">
          {currentQuestionOrder < lastQuestionOrder ? (
            <button
              className={styles.nextQuestionLink}
              onClick={onSubmitAnswer}
              disabled={responses === null}
              data-testid="next-question-button"
            >
              <Image
                width={20}
                height={20}
                src="/icon/chevron-right.svg"
                alt="right chevron icon"
              />
            </button>
          ) : (
            <Button label="Submit" className="px-8" />
          )}
        </div>
      </>
    </PageLoader>
  );
};

export default Question;
