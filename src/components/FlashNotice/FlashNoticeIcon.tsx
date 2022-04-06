import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import { FlashType } from '.';

import styles from './FlashNotice.module.css';

const FlashNoticeIcon = ({ type }: { type: FlashType }) => {
  switch (type) {
    case 'success':
      return (
        <div className={styles['success-icon']}>
          <FontAwesomeIcon icon={solid('bell')} />
        </div>
      );

    case 'warning':
      return (
        <div className={styles['warning-icon']}>
          <FontAwesomeIcon icon={solid('exclamation')} />
        </div>
      );
  }
};

export default FlashNoticeIcon;
