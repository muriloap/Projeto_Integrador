import { Typography, List, ListItem } from "@mui/material";
import styles from './styles.module.css';
import Link from "next/link";
import { useState } from "react";
import Divisao from "../Divisao";

type Props = {
  plano: string;
  descricao: string[];
  valor: number;
  botao?: string;
};

export default function PlanoPremiumHome(props: Props) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const [flipCard, setFlipCard] = useState(false);

  function assinar() {

  }

  return (
    <>
      <div className={styles.card}>
        <Typography className={styles.tituloPlano}>
          {props.plano.toUpperCase()}
        </Typography>

        <Typography className={styles.valor}>
          R$ {props.valor},00 / mês
        </Typography>

        <List className={styles.lista}>
          {props.descricao.map((item, i) => (
            <ListItem key={i} className={styles.listaItem}>
              {item}
            </ListItem>
          ))}
        </List>

        <div className={styles.botao} onClick={handleOpenModal}>
          {props.botao}
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.modalClose} onClick={handleCloseModal}>
              ×
            </button>

            <h2 className={styles.modalTitle}>Assinatura</h2>

            <p className={styles.modalDescription}>
              Página para pagamento de Assinatura
            </p>



            <div className={styles.formGroup}>

              <div className={styles.descriptionAss}>

                <span className={styles.nameProduct}> OS Control Controle de Ordem de Serviços</span>

                <Divisao />

                <div className={styles.productImage}>

                  <div className={styles.image}>
                    <img className={styles.logo} src="/images/oslogo1.png" alt="Foto OS Control" />
                  </div>

                </div>

                <span className={styles.nameProduct}> Assinatura Premium OS Control</span>

                <Divisao />

                <div className={styles.priceAss}>

                  <div className={styles.subPrice}>

                    <span className={styles.subTotal}> SubTotal: </span>
                    <span className={styles.subTotal}> R$: 49,00 </span>

                  </div>

                  <div className={styles.price}>

                    <span className={styles.total}> Total do Pedido: </span>
                    <span className={styles.total}> R$: 49,00 </span>

                  </div>
                </div>

              </div>

              <div className={styles.descriptionCc}>

                <div className={styles.credtCard}>

                  <div className={`${styles.cCard} ${flipCard ? styles.flipped : ""}`}>

                    <div className={styles.cardBack}>

                      <div className={styles.faixa} />

                      <div className={styles.cardBlackCvv}>

                        <div className={styles.cvv}>
                          <span className={styles.cvvNumber}>123</span>
                        </div>
                        <span className={styles.cvvName}>CVV</span>

                      </div>

                    </div>

                    <div className={styles.cardFront}>

                      <div className={styles.ptChip}>

                        <div className={styles.chip}>
                          <img className={styles.logoChip} src="/images/chip.png" alt="Foto OS Control" />
                        </div>

                        <span className={styles.numberCard}>3455 2298 9086 7654</span>

                      </div>

                      <div className={styles.ptDate}>

                        <span className={styles.dateExpiration}>12/27</span>

                      </div>

                      <div className={styles.ptName}>
                        <span className={styles.name}>Murilo L S Silva</span>
                      </div>
                    </div>


                  </div>

                </div>

              </div>

            </div>

            <div className={styles.buttonGroup}>
              <button
                className={styles.buttonSecondary}
                onClick={handleCloseModal}
              >
                Cancelar
              </button>
              <button
                className={styles.buttonPrimary}
                onClick={assinar}
              >
                Assinar
              </button>

              <button
                className={styles.buttonPrimary}
                onClick={() => setFlipCard(true)}
              >
                virar
              </button>

              <button
                className={styles.buttonPrimary}
                onClick={() => setFlipCard(false)}
              >
                desvirar
              </button>
            </div>
          </div>
        </div>
      )}



    </>
  );
}