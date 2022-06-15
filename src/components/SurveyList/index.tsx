/* eslint-disable @next/next/no-img-element */
import { Mousewheel, Pagination, Swiper as SwiperInterface } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Survey } from 'services/survey';

import 'swiper/css';
import 'swiper/css/pagination';
import styles from './SurveyList.module.css';

interface SurveyListProps {
  surveys: Survey[];
  onSlideChange: (swiper: SwiperInterface) => void;
}

const SurveyList = ({ surveys, onSlideChange }: SurveyListProps) => {
  return (
    <div data-testid="survey-list">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        mousewheel={{ thresholdDelta: 30 }}
        modules={[Mousewheel, Pagination]}
        pagination={{
          el: '.swiper-pagination',
          bulletClass: `swiper-pagination-bullet ${styles.swiperPaginationBullet}`,
        }}
        onSlideChange={onSlideChange}
      >
        {surveys.map((survey) => (
          <SwiperSlide key={survey.id}>
            <img
              src={survey.coverImageUrl}
              className="w-full h-auto max-h-[360px] rounded-lg"
              alt={`${survey.id} survey image`}
            />
            <h2>{survey.title}</h2>
            <div>{survey.description}</div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={`swiper-pagination ${styles.swiperPagination}`}></div>
    </div>
  );
};

export default SurveyList;
/* eslint-enable @next/next/no-img-element */
