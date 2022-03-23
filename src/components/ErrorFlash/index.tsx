import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import styles from './ErrorFlash.module.css';

interface ComponentProps {
  errors: string[];
}

const ErrorFlash = ({ errors }: ComponentProps) => {
  return errors.length ? (
    <div className="p-6 mb-8 flex flex-row bg-neutral-800 rounded-md">
      <div className={styles['warning-icon']}>
        <FontAwesomeIcon icon={solid('exclamation')} />
      </div>
      <div className="ml-5 flex-1 text-left">
        <h3 className="text-white font-semibold mb-2" role="alert">
          Error
        </h3>
        <ul>
          {errors.map((error, index) => (
            <li key={index} className="flex items-center" role="alert">
              <div className="inline text-[6px] mr-2">
                <FontAwesomeIcon icon={solid('circle')} />
              </div>
              {error}
            </li>
          ))}
        </ul>
      </div>
    </div>
  ) : null;
};

export default ErrorFlash;
