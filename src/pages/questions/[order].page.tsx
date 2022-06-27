import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';

import PageLoader from 'components/PageLoader';
import useSession from 'hooks/useSession';
import { SurveyQuestion as SurveyQuestionInterface } from 'services/surveyInterfaces';
import { StoreContext } from 'store';

import styles from './[order].module.css';
import Button from 'components/Button';
import SurveyQuestion from 'components/SurveyQuestion';

interface NextQuestionButtonProp {
  questionOrder: number;
  totalQuestion: number;
}

const NextQuestionButton = ({
  questionOrder,
  totalQuestion,
}: NextQuestionButtonProp) => {
  if (questionOrder < totalQuestion) {
    return (
      <Link href={`/questions/${questionOrder + 1}`} passHref>
        <div className={styles.nextQuestionLink}>
          <Image
            width={20}
            height={20}
            src="/icon/chevron-right.svg"
            alt="right chevron icon"
          />
        </div>
      </Link>
    );
  } else {
    return <Button label="Submit" className="px-8" />;
  }
};

const Question: NextPage = () => {
  useSession();
  const router = useRouter();
  const questionOrder = parseInt(router.query.order as string);

  const {
    store: { currentSurvey },
  } = useContext(StoreContext);

  const [currentQuestion, setCurrentQuestion] =
    useState<SurveyQuestionInterface>({} as SurveyQuestionInterface);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const question = currentSurvey?.questions.find(
      ({ displayOrder }) => displayOrder === questionOrder
    );

    if (question !== undefined) {
      setCurrentQuestion(question);
      setIsLoading(false);
    } else {
      router.push('/');
    }
  }, [questionOrder]);

  const totalQuestion = currentSurvey?.questions.length || 0;

  return (
    <PageLoader isLoading={isLoading}>
      <>
        <div className="h-full w-full max-w-3xl mx-auto flex flex-col justify-center">
          <div className="mb-4 text-gray-400">{`${questionOrder}/${totalQuestion}`}</div>
          <SurveyQuestion question={currentQuestion} />
        </div>
        <div className="absolute bottom-8 right-8">
          <NextQuestionButton
            questionOrder={questionOrder}
            totalQuestion={totalQuestion}
          />
        </div>
      </>
    </PageLoader>
  );
};

export default Question;
