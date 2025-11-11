import AssinaturasLogado from "@/components/AssinaturasLogado";
import styles from "./page.module.css";
import EmDev from "@/components/EmDev";

export default function HomeAssinaturas() {


  return (
    <>
    <div className={styles.containerp}>
      <AssinaturasLogado />
      <EmDev/>
    </div>
    </>
  );
}
