import BotaoNovo from "@/components/ModalOs";
import styles from "./page.module.css";
import BarraDePesquisa from "@/components/BarraDePesquisa";
import ModalService from "@/components/ModalProduct";

export default function PageProdutos() {
  return (
    <>
      <ModalService />
      <BarraDePesquisa/>
    </>
  );
}
