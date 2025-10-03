import Assinaturas from "@/components/Assinaturas";
import Contato from "@/components/Contato";
import Header from "@/components/Header";
import PaginaInicial from "@/components/PaginaInicial";
import SobreNos from "@/components/SobreNos";


export default function Home() {
  return (
   <>
   <PaginaInicial/>
   <SobreNos />
   <Assinaturas />
   <Contato />
   </>
  );
}
