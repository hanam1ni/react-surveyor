import { BatchInfo } from 'utils/pagination';

interface Survey {
  id: string;
  title: string;
  description: string;
  coverImageThumbnailUrl: string;
  coverImageUrl: string;
}

interface SurveyDetail extends Survey {
  questions: SurveyQuestion[];
}

interface SurveyQuestion {
  id: string;
  displayOrder: number;
  coverImageUrl: string;
  displayType: string;
  text: string;
  pick: string;
  answers: SurveyAnswer[] | null;
}

interface SurveyAnswer {
  id: string;
  displayOrder: number;
  text: string;
}

export type { Survey, SurveyDetail, SurveyQuestion, SurveyAnswer };
