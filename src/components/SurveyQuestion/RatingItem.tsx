import Image from 'next/image';

interface RatingItemProps {
  ratingType?: string;
  answerClass: string;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const answerIcon = (ratingType?: string) => {
  switch (ratingType) {
    case 'smiley':
      return '/icon/smiley.svg';
    case 'star':
      return '/icon/star.svg';
    case 'heart':
      return '/icon/heart.svg';
    default:
      return '/icon/star.svg';
  }
};

const RatingItem = ({
  ratingType = 'star',
  answerClass,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: RatingItemProps) => (
  <div
    className={`inline-block px-1 cursor-pointer ${answerClass}`}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <Image
      width={34}
      height={34}
      src={answerIcon(ratingType)}
      alt={`${ratingType} icon`}
    />
  </div>
);

export default RatingItem;
