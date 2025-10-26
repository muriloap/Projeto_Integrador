import styles from "./styles.module.css";
import TableService from "../TableService";
import Service from "@/models/service";

type Props = {
  services: Service[];
};

export default function TableServiceList({ services }: Props) {
  return (
    <div className={styles.tabelaContainer}>
      <table className={styles.tabelaServices}>
        <thead>
          <tr>
            <th>Nome do Serviço</th>
            <th>Descrição</th>
            <th>Observações</th>
            <th>Preço</th>
          </tr>
        </thead>

        <tbody>
          {services.map((service) => (
            <TableService
              key={service.id}
              nameService={service.nameService}
              description={service.description}
              observations={service.observations}
              price={service.price}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
