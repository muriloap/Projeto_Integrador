import BarraDePesquisa from "@/components/BarraDePesquisa";
import ModalCliente from "@/components/ModalCliente";
import styles from './page.module.css'

export default function PageClientes() {
  return (
    <>
      <div className={styles.container}>
        <ModalCliente />
        <BarraDePesquisa />
      </div>
    </>
  );
}
