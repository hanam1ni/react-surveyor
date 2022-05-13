/* eslint-disable @next/next/no-img-element */
import { UserProfile } from 'services/user';

import styles from './Layout.module.css';

interface AvatarProps {
  user: UserProfile;
}

const Avatar = ({ user: { avatarUrl, email } }: AvatarProps) => {
  if (!avatarUrl) {
    return (
      <div className={styles.avatarPlaceholder}>{email[0].toUpperCase()}</div>
    );
  }

  return (
    <img
      className="rounded-full"
      src={avatarUrl}
      alt="user avatar"
      width={36}
      height={36}
    />
  );
};

export default Avatar;
/* eslint-enable @next/next/no-img-element */
