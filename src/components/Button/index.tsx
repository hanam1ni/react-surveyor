import React from 'react';

import styles from './Button.module.css';

interface ComponentProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: 'primary' | 'secondary';
}

const Button = ({
  label,
  variant = 'primary',
  className,
  ...props
}: ComponentProps) => {
  return (
    <button
      className={`${styles['base']} ${styles[variant]} ${className}`}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
