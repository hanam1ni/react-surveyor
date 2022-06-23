/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import Image from 'next/image';

import { Survey } from 'services/surveyInterfaces';

import styles from './SurveyList.module.css';

interface SurveyItemProps {
  survey: Survey;
}

const SurveyItem = ({ survey }: SurveyItemProps) => {
  return (
    <Link href={`/surveys/${survey.id}`} passHref>
      <div className="cursor-pointer">
        <img
          src={survey.coverImageUrl}
          className="w-full h-auto max-h-[360px] mb-8 rounded-lg"
          alt={survey.title}
        />
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl mb-2">{survey.title}</h1>
            <div className="text-gray-400">{survey.description}</div>
          </div>

          <div
            className={styles.surveyItemLink}
            data-testid={`survey-item-link-${survey.id}`}
          >
            <Image
              width={20}
              height={20}
              src="/icon/chevron-right.svg"
              alt="right chevron icon"
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SurveyItem;
