import Header from "./components/Header"
import Assinaturas from "./components/Assinaturas";
import SobreNos from "./components/SobreNos";
import Contato from "./components/Contato";
import PaginaInicial from "./components/PaginaInicial";

export default function Home() {
  return (
   <>
   <Header />
   <PaginaInicial/>
   <SobreNos />
   <Assinaturas />
   <Contato />
   </>
  );
}
