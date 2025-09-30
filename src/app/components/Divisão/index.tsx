import React from "react";
import styles from "./styles.module.css";


type Props = {
title?: string;
className?: string;
};


export default function Divisao(props: Props) {

return (
<div className={styles.container}>
<div className={styles.line}></div>
<h2 className={styles.title}>{props.title}</h2>
<div className={styles.line}></div>
</div>
);
}