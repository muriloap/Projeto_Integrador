import BotaoNovo from "@/components/ModalOs";
import styles from "./page.module.css";
import BarraDePesquisa from "@/components/BarraDePesquisa";
import ModalService from "@/components/ModalService";

export default function PageServicos() {
  return (
    <>
    
     <div className={styles.container}>
      <ModalService/>
      <BarraDePesquisa />
    </div>

    </>
  );
}
