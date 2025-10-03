import React from "react";
import styles from "./styles.module.css"

type Props = {
    label: string;
    variant?: "PF" | "PJ";
    selected: boolean;
    onClick(): void;
};

export default function Selection(props: Props) {
    function getClassName() {
        const baseClass = styles.btn;

        if (props.selected) {
            if (props.variant === "PF") {
                return `${baseClass} ${styles["btn-PF"]}`;
            } else {
                return `${baseClass} ${styles["btn-PJ"]}`;
            }
        } else {
            return `${baseClass} ${styles["btn-unselected"]}`;
        }
    }

    const cls = getClassName()


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
