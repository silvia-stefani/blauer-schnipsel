import * as React from 'react';
import styles from './Button.module.scss';

interface IButtonProps {
    label: string;
    url: string;
    type: "primary" | "light";
}

const Button: React.FunctionComponent<IButtonProps> = ({
    label,
    url,
    type,
}) => {
  return <a href={url} className={`${styles.Button} ${styles[type]}`}>
    {label}
  </a>;
};

export default Button;
