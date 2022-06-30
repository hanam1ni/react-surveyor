import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';

import PageLoader from 'components/PageLoader';
import useSession from 'hooks/useSession';
import { SurveyQuestion as SurveyQuestionInterface } from 'services/surveyInterfaces';
import { ACTIONS, StoreContext } from 'store';

import styles from './[order].module.css';
import Button from 'components/Button';
import SurveyQuestion from 'components/SurveyQuestion';

const Question: NextPage = () => {
  useSession();
  const router = useRouter();
  const questionOrder = parseInt(router.query.order as string);
  const surveyId = router.query.id as string;

  const {
    store: { currentSurvey, surveyResponse },
    dispatchAction,
  } = useContext(StoreContext);

  const [currentQuestion, setCurrentQuestion] =
    useState<SurveyQuestionInterface>({} as SurveyQuestionInterface);
  const [isLoading, setIsLoading] = useState(true);
  const [answers, setAnswers] = useState(null);

  useEffect(() => {
    const question = currentSurvey?.questions.find(
      ({ displayOrder }) => displayOrder === questionOrder
    );

    if (question !== undefined) {
      const response = surveyResponse?.find(
        ({ questionId }) => questionId === question.id
      );
      response && setAnswers(response.answers);

      setCurrentQuestion(question);
      setIsLoading(false);
    } else {
      router.push(`/surveys/${surveyId}`);
    }
  }, [questionOrder]);

  const totalQuestion = currentSurvey?.questions.length || 0;

  const onSubmitAnswer = () => {
    dispatchAction({
      type: ACTIONS.SET_SURVEY_RESPONSE,
      value: { questionId: currentQuestion.id, answers: answers },
    });
    router.push(`/surveys/${surveyId}/questions/${questionOrder + 1}`);
  };

  return (
    <PageLoader isLoading={isLoading}>
      <>
        <div className="h-full w-full max-w-3xl mx-auto flex flex-col justify-center">
          <div className="mb-4 text-gray-400">{`${questionOrder}/${totalQuestion}`}</div>
          <SurveyQuestion
            question={currentQuestion}
            currentAnswers={answers}
            setAnswers={setAnswers}
          />
        </div>
        <div className="absolute bottom-8 right-8">
          {questionOrder < totalQuestion ? (
            <button
              className={styles.nextQuestionLink}
              onClick={onSubmitAnswer}
              disabled={answers === null}
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
