import Link from "next/link";
import styles from "./styles.module.css";
import { ChangeEvent, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

type Props = {
  label?: string;
  type: "text" | "email" | "password" | "number";
  onChange?(texto: string): void;
  multiline?: boolean; // corrigido nome
  value?: string;
  fullWidth?: boolean;
  formatCurrency?: boolean;
};

export default function TxtField(props: Props) {
  const [showPassword, setShowPassword] = useState(false);
  
  const [texto, setTexto] = useState(props.value)

  
  function handleInputChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {

    let value = e.target.value;

    if (props.onChange) {
      props.onChange(value);
    }
  }

  function handleTextAreaChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setTexto(e.target.value)
    if (props.onChange) {
      props.onChange(e.target.value);
    }
  }

  return (
    <label>
      <span
        className={`${styles.mdInput} ${props.fullWidth ? styles.fullWidth : ""
          }`}
        data-label={props.label}
      >
        <div className={styles.inputWrapper}>
          
          {props.multiline ? (
            <a className={styles.name}>{props.label}:
              <textarea
                className={styles.input}
                placeholder={props.label}
                onChange={handleTextAreaChange}
                value={texto}
                rows={4} // você pode ajustar ou tornar prop também
              />
            </a>
          ) : (
            
            <a className={styles.name}>{props.label}:
              <input
                className={styles.input}
                type={
                  props.type === "password"
                    ? showPassword
                      ? "text"
                      : "password"
                    : props.type
                }
                placeholder={props.label}
                onChange={handleInputChange}
              />
            </a>
          )}
        </div>

        {props.type === "password" && !props.multiline && (
          <button
            type="button"
            className={styles.toggle}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </button>
        )}
      </span>
    </label>
  );
}
