import Service from "@/models/service";
import SelectService from "../SelectService";
import styles from "./styles.module.css";

type Props = {
    service: Service[];
};

export default function SelectServiceList({ service }: Props) {
    return (
        <>
            <select className={styles.formSelect}>
                <div className={styles.tableContainer}>
                    {service.map((service) => (
                        <SelectService
                            key={service.id}
                            service={service} />
                    ))}
                </div >
            </select>
        </>
    );
}
