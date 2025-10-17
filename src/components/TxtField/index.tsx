import Link from "next/link";
import styles from "./styles.module.css"
import { ChangeEvent, useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

type Props={
    label: string;
    type: "text" | "email" | "password";
    onChange?(texto: string): void;
    value?: string;
}


export default function TxtField(props: Props) {

    const [showPassword, setShowPassword] = useState(false);

    function handleInputChange(e: ChangeEvent<HTMLInputElement>){
        if (props.onChange){
            props.onChange(e.target.value);
        }
    }


    return (
        <>
        <label>
            <span className={styles.mdInput} data-label={props.label}>
            <input className={styles.input} value={props.value} type={props.type === "password"
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