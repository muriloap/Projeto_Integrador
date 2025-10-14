import styles from "./styles.module.css";

type Props = {
  onClick(): void;
};

export default function BotaoContato(props: Props) {

  return (
    <>
      <button onClick={props.onClick} className={styles.button}>Entre em Contato</button>
    </>
  );
}
