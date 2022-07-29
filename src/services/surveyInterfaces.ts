interface Survey {
  id: string;
  title: string;
  description: string;
  coverImageThumbnailUrl: string;
  coverImageUrl: string;
}

interface SurveyDetail extends Survey {
  intro: SurveyQuestion;
  outro: SurveyQuestion;
  questions: SurveyQuestion[];
}

interface SurveyQuestion {
  id: string;
  displayOrder: number;
  coverImageUrl: string;
  displayType: NonQuestionType | QuestionType;
  ratingType?: RatingType;
  text: string;
  pick: PickType;
  isMandatory: boolean;
  answers: SurveyAnswer[];
}

enum NonQuestionType {
  INTRO = 'intro',
  OUTRO = 'outro',
}

enum QuestionType {
  CHOICE = 'choice',
  DROPDOWN = 'dropdown',
  NPS = 'nps',
  RATING = 'rating',
  SLIDER = 'slider',
  TEXTAREA = 'textarea',
  TEXTFIELD = 'textfield',
}

enum RatingType {
  HEART = 'heart',
  MONEY = 'money',
  SMILEY = 'smiley',
  STAR = 'star',
}

enum PickType {
  one = 'one',
  any = 'any',
}

interface SurveyAnswer {
  id: string;
  displayOrder: number;
  text: string;
  isMandatory: boolean;
}

interface SurveyResponse {
  questionId: string;
  answers: { id: string; answer?: string }[];
}

export { NonQuestionType, PickType, QuestionType, RatingType };

export type {
  Survey,
  SurveyDetail,
  SurveyQuestion,
  SurveyAnswer,
  SurveyResponse,
};
