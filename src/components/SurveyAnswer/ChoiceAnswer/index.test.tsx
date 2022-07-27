import { fireEvent, render } from '@testing-library/react';

import ChoiceAnswer from '.';
import { SurveyQuestion as SurveyQuestionInterface } from 'services/surveyInterfaces';

import { build } from '@support/factory';

describe('ChoiceAnswer', () => {
  describe('given type is pick one', () => {
    const ACTIVE_ANSWER_TEXT_COLOR = 'text-white';
    const INACTIVE_ANSWER_TEXT_COLOR = 'text-gray-400';

    it('renders the answers', () => {
      const answers = [
        build('surveyAnswer', { text: 'First Answer' }),
        build('surveyAnswer', { text: 'Second Answer' }),
      ];
      const question = build('surveyQuestion', {
        displayType: 'choice',
        pick: 'one',
        answers: answers,
      }) as SurveyQuestionInterface;

      const { getByText } = render(
        <ChoiceAnswer
          question={question}
          currentResponse={undefined}
          onResponseChange={jest.fn()}
        />
      );

      expect(getByText(/First Answer/)).toHaveClass(INACTIVE_ANSWER_TEXT_COLOR);
      expect(getByText(/Second Answer/)).toHaveClass(
        INACTIVE_ANSWER_TEXT_COLOR
      );
    });

    describe('click on answer', () => {
      it('sets survey response', () => {
        const answer1 = build('surveyAnswer', { text: 'First Answer' });
        const answer2 = build('surveyAnswer', { text: 'Second Answer' });

        const question = build('surveyQuestion', {
          displayType: 'choice',
          pick: 'one',
          answers: [answer1, answer2],
        }) as SurveyQuestionInterface;
        const onResponseChange = jest.fn();

        const { getByText } = render(
          <ChoiceAnswer
            question={question}
            currentResponse={undefined}
            onResponseChange={onResponseChange}
          />
        );

        fireEvent.click(getByText(/First Answer/));

        expect(onResponseChange).toHaveBeenCalledWith({
          questionId: question.id,
          answers: [{ id: answer1.id }],
        });

        fireEvent.click(getByText(/Second Answer/));

        expect(onResponseChange).toHaveBeenCalledWith({
          questionId: question.id,
          answers: [{ id: answer2.id }],
        });
      });
    });

    describe('given valid response', () => {
      it('sets active answer with the current response', () => {
        const answer1 = build('surveyAnswer', { text: 'First Answer' });
        const answer2 = build('surveyAnswer', { text: 'Second Answer' });
        const question = build('surveyQuestion', {
          displayType: 'choice',
          pick: 'one',
          answers: [answer1, answer2],
        }) as SurveyQuestionInterface;

        const { getByText } = render(
          <ChoiceAnswer
            question={question}
            currentResponse={{
              questionId: question.id,
              answers: [{ id: answer1.id }],
            }}
            onResponseChange={jest.fn()}
          />
        );

        expect(getByText(/First Answer/)).toHaveClass(ACTIVE_ANSWER_TEXT_COLOR);
        expect(getByText(/Second Answer/)).toHaveClass(
          INACTIVE_ANSWER_TEXT_COLOR
        );
      });
    });
  });

  describe('given type is pick any', () => {
    it('renders the answers', () => {
      const answers = [
        build('surveyAnswer', { text: 'First Answer' }),
        build('surveyAnswer', { text: 'Second Answer' }),
      ];
      const question = build('surveyQuestion', {
        displayType: 'choice',
        pick: 'any',
        answers: answers,
      }) as SurveyQuestionInterface;

      const { getByText } = render(
        <ChoiceAnswer
          question={question}
          currentResponse={undefined}
          onResponseChange={jest.fn()}
        />
      );

      expect(getByText(/First Answer/)).toBeInTheDocument();
      expect(getByText(/Second Answer/)).toBeInTheDocument();
    });

    describe('click on unselected answer', () => {
      it('adds selected answer to survey response', () => {
        const answer1 = build('surveyAnswer', { text: 'First Answer' });
        const answer2 = build('surveyAnswer', { text: 'Second Answer' });

        const question = build('surveyQuestion', {
          displayType: 'choice',
          pick: 'any',
          answers: [answer1, answer2],
        }) as SurveyQuestionInterface;
        const onResponseChange = jest.fn();

        const { getByText } = render(
          <ChoiceAnswer
            question={question}
            currentResponse={{
              questionId: question.id,
              answers: [{ id: answer1.id }],
            }}
            onResponseChange={onResponseChange}
          />
        );

        fireEvent.click(getByText(/Second Answer/));

        expect(onResponseChange).toHaveBeenCalledWith({
          questionId: question.id,
          answers: [{ id: answer1.id }, { id: answer2.id }],
        });
      });
    });

    describe('click on selected answer', () => {
      it('removes selected answer to survey response', () => {
        const answer1 = build('surveyAnswer', { text: 'First Answer' });
        const answer2 = build('surveyAnswer', { text: 'Second Answer' });

        const question = build('surveyQuestion', {
          displayType: 'choice',
          pick: 'any',
          answers: [answer1, answer2],
        }) as SurveyQuestionInterface;
        const onResponseChange = jest.fn();

        const { getByText } = render(
          <ChoiceAnswer
            question={question}
            currentResponse={{
              questionId: question.id,
              answers: [{ id: answer1.id }, { id: answer2.id }],
            }}
            onResponseChange={onResponseChange}
          />
        );

        fireEvent.click(getByText(/Second Answer/));

        expect(onResponseChange).toHaveBeenCalledWith({
          questionId: question.id,
          answers: [{ id: answer1.id }],
        });
      });

      describe('when selected answer is the last selected one', () => {
        it('sets survey response to null', () => {
          const answer1 = build('surveyAnswer', { text: 'First Answer' });
          const answer2 = build('surveyAnswer', { text: 'Second Answer' });

          const question = build('surveyQuestion', {
            displayType: 'choice',
            pick: 'any',
            answers: [answer1, answer2],
          }) as SurveyQuestionInterface;
          const onResponseChange = jest.fn();

          const { getByText } = render(
            <ChoiceAnswer
              question={question}
              currentResponse={{
                questionId: question.id,
                answers: [{ id: answer1.id }],
              }}
              onResponseChange={onResponseChange}
            />
          );

          fireEvent.click(getByText(/First Answer/));

          expect(onResponseChange).toHaveBeenCalledWith(null);
        });
      });
    });
  });
});
