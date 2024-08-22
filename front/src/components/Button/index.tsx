import React, { CSSProperties } from 'react';
import styles from '@styles/Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  buttonStyle?: CSSProperties;
}

export const Button = ({ children, buttonStyle, ...attributes }: ButtonProps) => {
  return (
      <button style={buttonStyle} {...attributes} className={styles.button}>
        {children}
      </button>
  );
};
