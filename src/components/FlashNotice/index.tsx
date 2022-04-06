import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import FlashNoticeIcon from './FlashNoticeIcon';

export type FlashType = 'success' | 'warning';

interface ComponentProps {
  title: string;
  messages: string[];
  type?: FlashType;
}

const FlashNotice = ({ title, messages, type = 'success' }: ComponentProps) => {
  return messages.length ? (
    <div className="p-6 mb-8 flex flex-row bg-neutral-800 rounded-md">
      <div>
        <FlashNoticeIcon type={type} />
      </div>
      <div className="ml-5 flex-1 text-left">
        <h3 className="text-white font-semibold mb-2" role="alert">
          {title}
        </h3>
        <ul>
          {messages.map((message, index) => (
            <li key={index} className="flex items-center" role="alert">
              {messages.length > 1 && (
                <div className="inline text-[6px] mr-2">
                  <FontAwesomeIcon icon={solid('circle')} />
                </div>
              )}
              {message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  ) : null;
};

export default FlashNotice;
