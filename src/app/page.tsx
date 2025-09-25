import styles from "./styles.module.css";
import Header from "./components/Header";
import Assinaturas from "./components/Assinaturas";
import SobreNos from "./components/SobreNos";
import Contato from "./components/Contato";

export default function Home() {
  return (
   <>
   <Header />
   <SobreNos />
   <Assinaturas />
   <Contato />
   </>
  );
}
