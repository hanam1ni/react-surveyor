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
  displayType: QuestionType;
  text: string;
  pick: string;
  answers: SurveyAnswer[];
}

type QuestionType = 'intro' | 'outro';

interface SurveyAnswer {
  id: string;
  displayOrder: number;
  text: string;
}

export type {
  QuestionType,
  Survey,
  SurveyDetail,
  SurveyQuestion,
  SurveyAnswer,
};
