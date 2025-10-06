import Assinaturas from "@/components/Assinaturas";
import Contato from "@/components/Contato";
import Header from "@/components/Header";
import PaginaInicial from "@/components/PaginaInicial";
import SobreNos from "@/components/SobreNos";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <div className={styles.containerp}>
        <PaginaInicial />
        <SobreNos />
        <div className={styles.ass}>
          <Assinaturas />
        </div>
        <Contato />
      </div>
    </>
  );
}
