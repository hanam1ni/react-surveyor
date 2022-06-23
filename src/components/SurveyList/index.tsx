import { Mousewheel, Pagination, Swiper as SwiperInterface } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import SurveyItem from './SurveyItem';
import { Survey } from 'services/surveyInterfaces';

import 'swiper/css';
import 'swiper/css/pagination';
import styles from './SurveyList.module.css';

interface SurveyListProps {
  surveys: Survey[];
  onSlideChange: (swiper: SwiperInterface) => void;
}

const SurveyList = ({ surveys, onSlideChange }: SurveyListProps) => {
  return (
    <div data-testid="survey-list" className={styles.surveyList}>
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
            <SurveyItem survey={survey} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.swiperPaginationWrapper}>
        <div className="swiper-pagination" />
      </div>
    </div>
  );
};

export default SurveyList;
