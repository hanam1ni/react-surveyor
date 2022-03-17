import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

interface ComponentProps {
  errors: string[];
}
const ErrorFlash = ({ errors }: ComponentProps) => {
  return (
    <div
      className={`${
        !errors.length && 'hidden'
      } p-6 mb-8 flex flex-row bg-neutral-800 rounded-md`}
    >
      <div className="relative top-1 w-8 h-8 leading-8 mx-auto text-lg text-black rounded-full bg-white">
        <FontAwesomeIcon icon={solid('exclamation')} />
      </div>
      <div className="ml-5 flex-1 text-left">
        <h3 className="text-white font-semibold mb-2">Error</h3>
        <ol>
          {errors.map((error, index) => (
            <li key={index} className="flex items-center">
              <div className="inline text-[6px] mr-2">
                <FontAwesomeIcon icon={solid('circle')} />
              </div>
              {error}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default ErrorFlash;
