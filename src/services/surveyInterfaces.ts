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
  ratingType?: RatingType;
  text: string;
  pick: string;
  answers: SurveyAnswer[];
}

type QuestionType = 'intro' | 'outro' | 'rating';
type RatingType = 'star' | 'heart' | 'smiley';

interface SurveyAnswer {
  id: string;
  displayOrder: number;
  text: string;
}

interface SurveyResponse {
  questionId: string;
  answers: { id: string; answer?: string }[];
}

export type {
  QuestionType,
  RatingType,
  Survey,
  SurveyDetail,
  SurveyQuestion,
  SurveyAnswer,
  SurveyResponse,
};
