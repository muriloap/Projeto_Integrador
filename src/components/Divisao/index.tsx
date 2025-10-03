import React from "react";
import styles from "./styles.module.css";


type Props = {
title?: string;
className?: string;
variant?: "default" | "full";
};


export default function Divisao(props: Props) {

     if (props.variant === "full") {
    return <div className={`${styles.line} ${styles.full} ${props.className || ""}`}></div>;
  }

return (
<div className={`${styles.container} ${props.className || ""}`}>
<div className={styles.line}></div>
{props.title && <h2 className={styles.title}>{props.title}</h2>}
<div className={styles.line}></div>
</div>
)
}