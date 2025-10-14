import React from "react";
import styles from "./styles.module.css"

type Props = {
  label: string;
  variant?: "primary" | "outline"; 
  onClick(): void;           
};

export default function Btn(props: Props) {
  const cls = `${styles.btn} ${props.variant === "outline" ? styles["btn-outline"] : styles["btn-primary"]}`;

  

  return (
    <button
      type="button"
      className={cls}
      onClick={props.onClick}
      >
      {props.label}
    </button>
  );
}
