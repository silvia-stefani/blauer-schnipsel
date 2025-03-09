import * as React from 'react';
import styles from './Tag.module.scss';

interface ITagProps {
    id: string;
    label: string;
    style: "primary" | "shade" | "white";
}

const Tag: React.FunctionComponent<ITagProps> = ({
    id,
    label,
    style,
}) => {
  return <div id={id} className={`${styles.Tag} ${styles[style]}`}>
    {label}
  </div>;
};

export default Tag;
