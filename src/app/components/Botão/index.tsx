import React from "react";
import styles from "./styles.module.css"

type Props = {
  label: string;
  variant?: "primary" | "outline"; // define o estilo do botão
  onClick?: () => void;           // função opcional
};

export default function Button(props: Props) {
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
