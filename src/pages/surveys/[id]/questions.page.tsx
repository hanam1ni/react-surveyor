import omit from 'lodash/omit';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

import Button from 'components/Button';
import FlashNotice from 'components/FlashNotice';
import Modal from 'components/Modal';
import SurveyQuestion from 'components/SurveyQuestion';
import useSession from 'hooks/useSession';
import {
  getInvalidResponseOrders,
  submitSurveyResponse,
} from 'services/survey';
import {
  SurveyQuestion as SurveyQuestionInterface,
  SurveyResponse,
} from 'services/surveyInterfaces';
import { StoreContext } from 'store';

import 'swiper/css';
import 'swiper/css/pagination';
import styles from './questions.module.css';

interface LeaveConfirmationModalProps {
  onConfirmClick: () => void;
  onCancelClick: () => void;
}

const LeaveButton = ({ ...props }) => (
  <button className={styles.leaveSurveyButton} {...props}>
    <Image
      width={11}
      height={11}
      data-testid="leave-button"
      src="/icon/cross.svg"
      alt="leave survey icon"
    />
  </button>
);

const LeaveConfirmationModal = ({
  onConfirmClick,
  onCancelClick,
}: LeaveConfirmationModalProps) => (
  <div className="w-96 md:w-[468px] p-6 z-50 bg-black rounded-xl">
    <h3 className="mb-2 text-2xl text-white">Warning!</h3>
    <p className="mb-8 text-md text-gray-400">
      Are you sure you want to quit the survey?
    </p>
    <div className="text-right">
      <Button
        label="Yes"
        variant="secondary"
        onClick={onConfirmClick}
        className="mr-2 w-[90px]"
      />
      <Button label="Cancel" onClick={onCancelClick} className="w-[90px]" />
    </div>
  </div>
);

const NextQuestionButton = () => {
  const swiper = useSwiper();

  return (
    <button
      className={styles.nextQuestionLink}
      onClick={() => swiper.slideNext()}
      data-testid="next-question-button"
    >
      <Image
        width={20}
        height={20}
        src="/icon/chevron-right.svg"
        alt="right chevron icon"
      />
    </button>
  );
};

const Question: NextPage = () => {
  useSession();
  const router = useRouter();
  const surveyId = router.query.id as string;

  const {
    store: { currentSurvey },
  } = useContext(StoreContext);

  useEffect(() => {
    if (currentSurvey === null) {
      router.push(`/surveys/${surveyId}`);
    }
  }, []);

  const [submitErrorMessage, setSubmitErrorMessage] = useState<string>('');
  const [isSurveySubmit, setIsSurveySubmit] = useState(false);
  const [responses, setResponses] = useState<Record<number, SurveyResponse>>(
    {}
  );
  const [showLeaveConfirmation, setShowLeaveConfirmation] = useState(false);

  const handleSurveySubmitError = (errorMessage: string) => {
    setSubmitErrorMessage(errorMessage);
    setIsSurveySubmit(false);
  };

  const handleSurveySubmit = () => {
    setIsSurveySubmit(true);

    const surveyResponses = Object.values(responses);

    const invalidResponseOrders = getInvalidResponseOrders(
      surveyResponses,
      currentSurvey!
    );

    if (invalidResponseOrders.length !== 0) {
      const formattedOrder = invalidResponseOrders.join(', ');
      const errorMessage = `Answer for question(s) ${formattedOrder} can't be blank`;
      handleSurveySubmitError(errorMessage);

      return;
    }

    submitSurveyResponse(currentSurvey!.id, surveyResponses)
      .then(() => router.push(`/surveys/${surveyId}/outro`))
      .catch(() =>
        handleSurveySubmitError('Something went wrong. Please try again later.')
      );
  };

  const handleResponseChange = (
    question: SurveyQuestionInterface,
    response: SurveyResponse | null
  ) => {
    if (response === null) {
      return setResponses(omit(responses, question.displayOrder));
    }

    setResponses({
      ...responses,
      [question.displayOrder]: response,
    });
  };

  const lastQuestionOrder = currentSurvey?.questions.length || 0;
  const isEmptyResponse = Object.keys(responses).length === 0;

  return (
    currentSurvey && (
      <>
        <LeaveButton onClick={() => setShowLeaveConfirmation(true)} />
        <Modal
          show={showLeaveConfirmation}
          onOverlayClick={() => setShowLeaveConfirmation(false)}
        >
          <LeaveConfirmationModal
            onConfirmClick={() => router.push(`/surveys/${surveyId}`)}
            onCancelClick={() => setShowLeaveConfirmation(false)}
          />
        </Modal>
        <Swiper slidesPerView={1} threshold={40} initialSlide={8}>
          {currentSurvey.questions.map((question) => (
            <SwiperSlide key={question.id}>
              <SurveyQuestion
                lastQuestionOrder={lastQuestionOrder}
                question={question}
                currentResponse={responses[question.displayOrder]}
                onResponseChange={(response) =>
                  handleResponseChange(question, response)
                }
              />
              <div className="absolute bottom-8 right-8">
                {question.displayOrder < lastQuestionOrder ? (
                  <NextQuestionButton />
                ) : (
                  <Button
                    label="Submit"
                    className="px-8"
                    onClick={handleSurveySubmit}
                    disabled={isEmptyResponse && isSurveySubmit}
                  />
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {submitErrorMessage && (
          <div className="absolute bottom-0 left-8 z-20">
            <FlashNotice
              title="Error"
              messages={[submitErrorMessage]}
              type="warning"
            />
          </div>
        )}
      </>
    )
  );
};

export default Question;
