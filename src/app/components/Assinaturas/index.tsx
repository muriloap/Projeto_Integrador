import Typography from "@mui/material/Typography";
import Plano from "../Plano";
import styles from './styles.module.css';

export default function Assinaturas() {
  return (
    <>
      <Typography className={styles.titulo} variant="h3">
        ASSINATURAS
      </Typography>

      <div className={styles.container}>
        <Plano
          plano="Free"
          valor={0}
          descricao={["primeiro", "segundo", "terceiro", "quarto"]}
        />

        <Plano
          plano="Premium"
          valor={49}
          descricao={["primeiro", "segundo", "terceiro", "quarto"]}
        />
      </div>
    </>
  );
}
