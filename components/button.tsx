import React from 'react';
import styles from '@/styles/components/button.module.scss';

type ButtonProps = {
  text: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset"
  style?: any
};

export const Button = ({ text, onClick, className, type = 'button', style }: ButtonProps) => {
  return (
    <button style={style} className={`${styles.button} ${className}`} onClick={onClick} type={type}>
      {text}
    </button>
  );
};