import styles from "./styles.module.css";
import Client from "../../models/client";
import ClientCard from "../ClientCard";

type Props = {
  clients: Client[];
};

function mapear(client: Client) {
  return (
    <>
      <ClientCard
        key={client.id}
        name={client.name}
        document={client.document}
        cep={client.cep}
        phone={client.phone}
        address={client.address}
        number={client.number}
        neighborhood={client.neighborhood}
        state={client.state}
        city={client.city}
        email={client.email}
      />
    </>
  );
}

export default function ClientList(props: Props) {
  return (
    <>
      <ul className={styles.clients}>{props.clients.map(mapear)}</ul>
    </>
  );
}
