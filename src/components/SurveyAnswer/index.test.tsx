import { fireEvent, render } from '@testing-library/react';

import SurveyAnswer from '.';
import { SurveyQuestion as SurveyQuestionInterface } from 'services/surveyInterfaces';

import { build } from '@support/factory';

describe('SurveyAnswer', () => {
  describe('given dropdown display type', () => {
    it('renders the answers', () => {
      const question = build('surveyQuestion', {
        displayType: 'dropdown',
        answers: [
          build('surveyAnswer', { text: 'First Option' }),
          build('surveyAnswer', { text: 'Second Option' }),
        ],
      }) as SurveyQuestionInterface;

      const onResponseChange = jest.fn();

      const { container, getByText } = render(
        <SurveyAnswer
          question={question}
          currentResponse={undefined}
          onResponseChange={onResponseChange}
        />
      );

      fireEvent.keyDown(container.querySelector('.select-answer')!, {
        key: 'ArrowDown',
      });

      expect(getByText('First Option')).toBeInTheDocument();
      expect(getByText('Second Option')).toBeInTheDocument();
    });

    describe('click on answer', () => {
      it('sets survey response', () => {
        const answer1 = build('surveyAnswer', { text: 'First Option' });
        const answer2 = build('surveyAnswer', { text: 'Second Option' });
        const question = build('surveyQuestion', {
          displayType: 'dropdown',
          answers: [answer1, answer2],
        }) as SurveyQuestionInterface;

        const onResponseChange = jest.fn();

        const { container, getByText } = render(
          <SurveyAnswer
            question={question}
            currentResponse={undefined}
            onResponseChange={onResponseChange}
          />
        );

        fireEvent.keyDown(container.querySelector('.select-answer')!, {
          key: 'ArrowDown',
        });
        fireEvent.click(getByText('First Option'));

        expect(onResponseChange).toHaveBeenCalledWith({
          questionId: question.id,
          answers: [{ id: answer1.id }],
        });
      });
    });
  });

  describe('given nps display type', () => {
    const ACTIVE_ANSWER_TEXT_COLOR = 'text-gray-700';
    const INACTIVE_ANSWER_TEXT_COLOR = 'text-white';

    it('renders the answers', () => {
      const answers = [build('surveyAnswer'), build('surveyAnswer')];
      const question = build('surveyQuestion', {
        displayType: 'nps',
        answers: answers,
      }) as SurveyQuestionInterface;

      const { getAllByTestId } = render(
        <SurveyAnswer
          question={question}
          currentResponse={undefined}
          onResponseChange={jest.fn()}
        />
      );

      expect(getAllByTestId('nps-answer-item').length).toEqual(2);
    });

    describe('click on answer', () => {
      it('sets survey response', () => {
        const answer = build('surveyAnswer');
        const otherAnswers = [build('surveyAnswer'), build('surveyAnswer')];
        const question = build('surveyQuestion', {
          displayType: 'nps',
          answers: [answer, ...otherAnswers],
        }) as SurveyQuestionInterface;
        const onResponseChange = jest.fn();

        const { getAllByTestId } = render(
          <SurveyAnswer
            question={question}
            currentResponse={undefined}
            onResponseChange={onResponseChange}
          />
        );

        fireEvent.click(getAllByTestId('nps-answer-item')[0]);

        expect(onResponseChange).toHaveBeenCalledWith({
          questionId: question.id,
          answers: [{ id: answer.id }],
        });
      });
    });

    describe('given valid response', () => {
      it('sets active answer with the current response', () => {
        const answer1 = build('surveyAnswer');
        const answer2 = build('surveyAnswer');
        const question = build('surveyQuestion', {
          displayType: 'nps',
          answers: [answer1, answer2],
        }) as SurveyQuestionInterface;

        const { getAllByTestId } = render(
          <SurveyAnswer
            question={question}
            currentResponse={{
              questionId: question.id,
              answers: [{ id: answer1.id }],
            }}
            onResponseChange={jest.fn()}
          />
        );

        const answerItems = getAllByTestId('nps-answer-item');
        expect(answerItems[0]).toHaveClass(ACTIVE_ANSWER_TEXT_COLOR);
        expect(answerItems[1]).toHaveClass(INACTIVE_ANSWER_TEXT_COLOR);
      });
    });
  });

  describe('given rating display type', () => {
    const ACTIVE_ANSWER_OPACITY = 'opacity-100';
    const INACTIVE_ANSWER_OPACITY = 'opacity-50';

    it('renders the answers', () => {
      const answers = [build('surveyAnswer'), build('surveyAnswer')];
      const question = build('surveyQuestion', {
        displayType: 'rating',
        ratingType: 'star',
        answers: answers,
      }) as SurveyQuestionInterface;

      const { getAllByAltText } = render(
        <SurveyAnswer
          question={question}
          currentResponse={undefined}
          onResponseChange={jest.fn()}
        />
      );

      expect(getAllByAltText('star icon').length).toEqual(2);
    });

    describe('click on answer', () => {
      it('sets survey response', () => {
        const answer = build('surveyAnswer');
        const otherAnswers = [build('surveyAnswer'), build('surveyAnswer')];
        const question = build('surveyQuestion', {
          displayType: 'rating',
          ratingType: 'star',
          answers: [answer, ...otherAnswers],
        }) as SurveyQuestionInterface;
        const onResponseChange = jest.fn();

        const { getAllByAltText } = render(
          <SurveyAnswer
            question={question}
            currentResponse={undefined}
            onResponseChange={onResponseChange}
          />
        );

        fireEvent.click(getAllByAltText('star icon')[0]);

        expect(onResponseChange).toHaveBeenCalledWith({
          questionId: question.id,
          answers: [{ id: answer.id }],
        });
      });
    });

    describe('given valid response', () => {
      it('sets active answer with the current response', () => {
        const answer1 = build('surveyAnswer', { displayOrder: 0 });
        const answer2 = build('surveyAnswer', { displayOrder: 1 });
        const question = build('surveyQuestion', {
          displayType: 'rating',
          ratingType: 'star',
          answers: [answer1, answer2],
        }) as SurveyQuestionInterface;

        const { getAllByAltText } = render(
          <SurveyAnswer
            question={question}
            currentResponse={{
              questionId: question.id,
              answers: [{ id: answer1.id }],
            }}
            onResponseChange={jest.fn()}
          />
        );

        const answerItems = getAllByAltText('star icon');
        expect(answerItems[0].closest('div')).toHaveClass(
          ACTIVE_ANSWER_OPACITY
        );
        expect(answerItems[1].closest('div')).toHaveClass(
          INACTIVE_ANSWER_OPACITY
        );
      });
    });
  });

  describe('given textarea display type', () => {
    it('renders the textarea', () => {
      const question = build('surveyQuestion', {
        displayType: 'textarea',
        answers: [build('surveyAnswer')],
      }) as SurveyQuestionInterface;

      const { container } = render(
        <SurveyAnswer
          question={question}
          currentResponse={undefined}
          onResponseChange={jest.fn()}
        />
      );

      expect(container.querySelector('textarea')).toBeInTheDocument();
    });

    describe('input a valid answer', () => {
      it('sets survey response', () => {
        const answer = build('surveyAnswer');
        const question = build('surveyQuestion', {
          displayType: 'textarea',
          answers: [answer],
        }) as SurveyQuestionInterface;
        const onResponseChange = jest.fn();

        const { container } = render(
          <SurveyAnswer
            question={question}
            currentResponse={undefined}
            onResponseChange={onResponseChange}
          />
        );

        const textarea = container.querySelector('textarea') as HTMLElement;
        fireEvent.change(textarea, { target: { value: 'Awesome response' } });

        expect(onResponseChange).toHaveBeenCalledWith({
          questionId: question.id,
          answers: [{ id: answer.id, answer: 'Awesome response' }],
        });
      });
    });

    describe('input an empty answer', () => {
      it('sets survey response as null', () => {
        const answer = build('surveyAnswer');
        const question = build('surveyQuestion', {
          displayType: 'textarea',
          answers: [answer],
        }) as SurveyQuestionInterface;
        const onResponseChange = jest.fn();

        const { container } = render(
          <SurveyAnswer
            question={question}
            currentResponse={{
              questionId: question.id,
              answers: [{ id: answer.id, answer: 'Awesome response' }],
            }}
            onResponseChange={onResponseChange}
          />
        );

        const textarea = container.querySelector('textarea') as HTMLElement;
        fireEvent.change(textarea, { target: { value: '' } });

        expect(onResponseChange).toHaveBeenCalledWith(null);
      });
    });

    describe('given valid response', () => {
      it('sets textarea value with the current response', () => {
        const answer = build('surveyAnswer');
        const question = build('surveyQuestion', {
          displayType: 'textarea',
          answers: [answer],
        }) as SurveyQuestionInterface;
        const onResponseChange = jest.fn();

        const { container } = render(
          <SurveyAnswer
            question={question}
            currentResponse={{
              questionId: question.id,
              answers: [{ id: answer.id, answer: 'Awesome response' }],
            }}
            onResponseChange={onResponseChange}
          />
        );

        expect(container.querySelector('textarea')?.value).toEqual(
          'Awesome response'
        );
      });
    });
  });

  describe('given textfield display type', () => {
    it('renders the text inputs', () => {
      const question = build('surveyQuestion', {
        displayType: 'textfield',
        answers: [
          build('surveyAnswer', { text: 'First Question' }),
          build('surveyAnswer', { text: 'Second Question' }),
        ],
      }) as SurveyQuestionInterface;

      const { container, getByText } = render(
        <SurveyAnswer
          question={question}
          currentResponse={undefined}
          onResponseChange={jest.fn()}
        />
      );

      expect(container.querySelectorAll('input').length).toEqual(2);
      expect(getByText('First Question')).toBeInTheDocument();
      expect(getByText('Second Question')).toBeInTheDocument();
    });

    describe('input a valid answer', () => {
      it('sets survey response', () => {
        const answer = build('surveyAnswer');
        const question = build('surveyQuestion', {
          displayType: 'textfield',
          answers: [answer],
        }) as SurveyQuestionInterface;
        const onResponseChange = jest.fn();

        const { container } = render(
          <SurveyAnswer
            question={question}
            currentResponse={undefined}
            onResponseChange={onResponseChange}
          />
        );

        const textInput = container.querySelector('input') as HTMLElement;
        fireEvent.change(textInput, { target: { value: 'Awesome response' } });

        expect(onResponseChange).toHaveBeenCalledWith({
          questionId: question.id,
          answers: [{ id: answer.id, answer: 'Awesome response' }],
        });
      });
    });

    describe('given valid response', () => {
      it('sets text input value with the current response', () => {
        const answer = build('surveyAnswer');
        const question = build('surveyQuestion', {
          displayType: 'textfield',
          answers: [answer, build('surveyAnswer')],
        }) as SurveyQuestionInterface;
        const onResponseChange = jest.fn();

        const { container } = render(
          <SurveyAnswer
            question={question}
            currentResponse={{
              questionId: question.id,
              answers: [{ id: answer.id, answer: 'Awesome response' }],
            }}
            onResponseChange={onResponseChange}
          />
        );

        expect(container.querySelectorAll('input')[0].value).toEqual(
          'Awesome response'
        );
        expect(container.querySelectorAll('input')[1].value).toEqual('');
      });
    });
  });

  describe('given unsupported type', () => {
    it('renders unsupported notice', () => {
      const question = build('surveyQuestion', {
        displayType: 'awesomeTextarea',
      }) as SurveyQuestionInterface;

      const { getByText } = render(
        <SurveyAnswer
          question={question}
          currentResponse={undefined}
          onResponseChange={jest.fn()}
        />
      );

      expect(
        getByText(/Somethings went wrong. Please contact support./)
      ).toBeInTheDocument();
    });
  });
});
