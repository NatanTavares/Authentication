import { ButtonHTMLAttributes } from "react";

import styles from "./styles.module.css";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
};

export function Button({ label, ...rest }: Props) {
  return (
    <button className={styles.button} {...rest}>
      {label}
    </button>
  );
}
