import Link from "next/link";
import styles from "./styles.module.css";
import { ChangeEvent, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

type Props = {
  label?: string;
  type: "text" | "email" | "password" | "number";
  onChange?(texto: string): void;
  multiline?: boolean;
  value?: string | number;
  fullWidth?: boolean;
  cpf?: boolean;
  cnpj?: boolean;
  phone?: boolean;
  cep?: boolean
};

export default function TxtField(props: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const [texto, setTexto] = useState(props.value)
  const [texto2, setTexto2] = useState(props.value)

  const maskCPF = (value: string): string => {
    const numbers = value.replace(/\D/g, "").slice(0, 11);
    return numbers
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  // Função para aplicar máscara de CNPJ
  const maskCNPJ = (value: string): string => {
    const numbers = value.replace(/\D/g, "").slice(0, 14);
    return numbers
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  };

  // Máscara Telefone (formato (16) 00000-0000)
  const maskTelefone = (value: string): string => {
    const numbers = value.replace(/\D/g, "").slice(0, 11);
    return numbers
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d{4})$/, "$1-$2");
  };


  function handleInputChange(e: ChangeEvent<HTMLInputElement>
  ) {

    let value = e.target.value;

    if (props.cpf) value = maskCPF(value);
    if (props.cnpj) value = maskCNPJ(value);
    if (props.phone) value = maskTelefone(value);
    if (props.cep) {
      let valor = value.replace(/\D/g, '');
      if (valor.length > 8) valor = valor.slice(0, 8);
      if (valor.length > 5) {
        valor = valor.replace(/(\d{5})(\d)/, '$1-$2');
      }
      props.onChange?.(valor);
      return;
    }

  
    setTexto(value)
    if (props.onChange) {
      props.onChange(value);
    }
  }


  function handleTextAreaChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setTexto2(e.target.value)
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
                value={props.value}
                rows={4}
              />
            </a>
          ) : (

            <a className={styles.name}>{props.label}:
              <input
                value={props.value}
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
