import Image from 'next/image';

interface RatingItemProps {
  ratingType?: string;
  answerStateClass: string;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const answerIcon = (ratingType?: string) => {
  switch (ratingType) {
    case 'heart':
      return '/icon/heart.svg';
    case 'money':
      return '/icon/coin.svg';
    case 'smiley':
      return '/icon/smiley.svg';
    case 'star':
      return '/icon/star.svg';
    default:
      return '/icon/star.svg';
  }
};

const RatingItem = ({
  ratingType = 'star',
  answerStateClass,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: RatingItemProps) => (
  <div
    className={`inline-block px-1 cursor-pointer ${answerStateClass}`}
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
