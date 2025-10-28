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
            <th>Editar/Deletar</th>
          </tr>
        </thead>

        <tbody>
          {services.map((service) => (
            <TableService
              key={service.id}
              service={service}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
