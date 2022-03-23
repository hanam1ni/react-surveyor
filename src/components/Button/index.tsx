import React from 'react';

import styles from './Button.module.css';

interface ComponentProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: 'primary';
}

const Button = ({ label, variant = 'primary', ...props }: ComponentProps) => {
  return (
    <button className={`${styles['base']} ${styles[variant]}`} {...props}>
      {label}
    </button>
  );
};

export default Button;
