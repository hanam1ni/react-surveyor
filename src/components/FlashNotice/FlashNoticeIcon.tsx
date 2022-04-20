import Image from 'next/image';

import { FlashType } from '.';

const FlashNoticeIcon = ({ type }: { type: FlashType }) => {
  switch (type) {
    case 'success':
      return (
        <Image src="/icon/bell.svg" width={24} height={24} alt="success icon" />
      );

    case 'warning':
      return (
        <Image
          src="/icon/warning.svg"
          width={24}
          height={24}
          alt="warning icon"
        />
      );
  }
};

export default FlashNoticeIcon;
