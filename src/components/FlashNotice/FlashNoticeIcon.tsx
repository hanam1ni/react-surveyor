import Image from 'next/image';

import { FlashType } from '.';

interface IconOption {
  iconAlt: string;
  iconPath: string;
}

const iconOptions: Record<FlashType, IconOption> = {
  success: {
    iconAlt: 'success icon',
    iconPath: '/icon/bell.svg',
  },
  warning: {
    iconAlt: 'warning icon',
    iconPath: '/icon/warning.svg',
  },
};

const FlashNoticeIcon = ({ type }: { type: FlashType }) => {
  const options = iconOptions[type];

  return (
    <Image
      width={24}
      height={24}
      alt={options.iconAlt}
      src={options.iconPath}
    />
  );
};

export default FlashNoticeIcon;
