import Assinaturas from "@/components/Assinaturas";
import Contato from "@/components/Contato";
import Header from "@/components/Header";
import PaginaInicial from "@/components/PaginaInicial";
import SobreNos from "@/components/SobreNos";
import styles from "./page.module.css";
import ModalEntreContato from "@/components/ModalEntreContato";

export default function Home() {
  return (
    <>
      <div className={styles.containerp}>
        <div className={styles.pi}>
        <PaginaInicial />
        </div>
        <SobreNos />
        <div className={styles.assinatura}>
          <Assinaturas />
        </div>
        <Contato/>
      </div>
    </>
  );
}
