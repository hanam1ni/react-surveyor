import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

interface ComponentProps {
  path: string;
}

const BackNavigation = ({ path }: ComponentProps) => (
  <div className="fixed top-9 left-9 cursor-pointer">
    <Link href={path}>
      <a>
        <FontAwesomeIcon
          className="text-2xl text-white"
          icon={solid('chevron-left')}
        />
      </a>
    </Link>
  </div>
);

export default BackNavigation;
