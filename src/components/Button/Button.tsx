import React from 'react';
import styles from './Button.module.scss';
import { useRouter } from 'next/navigation';

interface IButtonProps {
  label: string;
  url?: string;
  type?: "primary" | "light";
  onPress?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  isExternal?: boolean;
}

const Button: React.FC<IButtonProps> = ({ label, url, type = "primary", onPress, isExternal = false }) => {

  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (onPress) {
      onPress(event);
    }

    if (url) {
      event.preventDefault();
      if (isExternal) {
        window.open(url, '_blank', 'noopener noreferrer');
      } else {
        router.push(url);
      }
    }
  };

  return url ? (
    <a
      href={url}
      className={`${styles.Button} ${styles[type]}`}
      onClick={handleClick}
      role="button"
    >
      {label}
    </a>
  ) : (
    <button
      className={`${styles.Button} ${styles[type]}`}
      onClick={onPress}
    >
      {label}
    </button>
  );
};

export default Button;
