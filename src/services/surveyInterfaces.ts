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
  displayType: DisplayType;
  ratingType?: RatingType;
  text: string;
  pick: string;
  answers: SurveyAnswer[];
}

enum DisplayType {
  INTRO = 'intro',
  OUTRO = 'outro',
  CHOICE = 'choice',
  RATING = 'rating',
}

enum RatingType {
  STAR = 'star',
  HEART = 'heart',
  SMILEY = 'smiley',
}

interface SurveyAnswer {
  id: string;
  displayOrder: number;
  text: string;
}

interface SurveyResponse {
  questionId: string;
  answers: { id: string; answer?: string }[];
}

export { DisplayType, RatingType };

export type {
  Survey,
  SurveyDetail,
  SurveyQuestion,
  SurveyAnswer,
  SurveyResponse,
};
