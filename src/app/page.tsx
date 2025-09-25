import styles from "./styles.module.css";
<<<<<<< HEAD
import Header from "../components/Header";
import Assinaturas from "../components/Assinaturas";
=======
import Header from "./components/Header";
import Assinaturas from "./components/Assinaturas";
import SobreNos from "./components/SobreNos";
import Contato from "./components/Contato";
>>>>>>> 5b346bea6aa50402aebcab060c121dc78b009dce

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
