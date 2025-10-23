import ModalEditProduct from "../ModalEditProduct";
import styles from "./styles.module.css";

type Props = {
  name: string;
  document: string;
  cep: string;
  phone: string;
  email: string;
  address: string;
  number: number;
  neighborhood: string;
  state: string;
  city: string;
};

export default function ClientCard(props: Props) {
  return (
    <li className={styles.client}>
      {/* TITULOS (CABECALHO FIXO) */}
      <div className={styles.header}>
        <span className={styles.teste}>Nome do Cliente</span>
        <span className={styles.teste}>CPF/CNPJ</span>
        <span className={styles.teste}>Endereço</span>
        <span className={styles.teste}>Telefone</span>
      </div>

      {/* CONTEÚDO */}
      <div className={styles.body}>
        <span className={styles.span}>{props.name}</span>
        <span className={styles.span}>{props.document}</span>
        <span className={styles.textoGrande}>{props.address}</span>
        <span className={styles.span}>{props.phone}</span>
        <span className={styles.button}>
          <ModalEditProduct />
        </span>
      </div>
    </li>
  );
}
