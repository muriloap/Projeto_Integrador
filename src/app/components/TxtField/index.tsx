import Link from "next/link";
import styles from "./styles.module.css"
import { ChangeEvent, useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

type Props={
    label: string;
    type: "text" | "email" | "password";
    onChange?(texto: string): void;
    textStart?: string;
}


export default function TextField(props: Props) {

    const [texto, setTexto] = useState(props.textStart)
    const [showPassword, setShowPassword] = useState(false);

    function handleInputChange(e: ChangeEvent<HTMLInputElement>){
        setTexto(e.target.value);
        if (props.onChange){
            props.onChange(e.target.value);
        }
    }


    return (
        <>
        <label>
            <span className={styles.mdInput} data-label={props.label}>
            <input className={styles.input} value={texto} type={props.type === "password"
              ? showPassword
                ? "text"
                : "password"
              : props.type} placeholder={props.label} onChange={handleInputChange} />
              
      {props.type === "password" && (
        <button
          type="button"
          className={styles.toggle}
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <VisibilityOffIcon></VisibilityOffIcon> : <VisibilityIcon></VisibilityIcon>}
        </button>
      )}
            </span>
        </label>
        </>
    )
}