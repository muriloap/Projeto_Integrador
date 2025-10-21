import Link from "next/link";
import styles from "./styles.module.css";
import { ChangeEvent, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

type Props = {
  label?: string;
  type: "text" | "email" | "password" | "number";
  onChange?(texto: string): void;
  value?: string;
  fullWidth?: boolean;
  prefix?: string;
  formatCurrency?: boolean;
};

export default function TxtField(props: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [displayValue, setDisplayValue] = useState(props.formatCurrency ? "00,00" : props.value || "");

  function formatCurrency(value: string) {
    const numericValue = value.replace(/\D/g, "");

    if (!numericValue) return "";

    const intValue = parseInt(numericValue, 10);
    const formatted = (intValue / 100).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formatted;
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    let value = e.target.value;

    if (props.formatCurrency) {
      value = formatCurrency(value);
      setDisplayValue(value);
    } else {
      setDisplayValue(value);
    }

    if (props.onChange) {
      props.onChange(value);
    }
  }

  return (
    <label>
      <span
        className={`${styles.mdInput} ${
          props.fullWidth ? styles.fullWidth : ""
        }`}
        data-label={props.label}
      >
        <div className={styles.inputWrapper}>
          {props.prefix && (
            <span className={styles.prefix}>{props.prefix}</span>
          )}

          <input
            className={`${styles.input} ${
              props.prefix ? styles.inputWithPrefix : ""
            }`}
            value={displayValue}
            type={
              props.type === "password"
                ? showPassword
                  ? "text"
                  : "password"
                : "text"
            }
            placeholder={props.label}
            onChange={handleInputChange}
          />
        </div>

        {props.type === "password" && (
          <button
            type="button"
            className={styles.toggle}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </button>
        )}
      </span>
    </label>
  );
}
