import Service from "@/models/service";
import SelectService from "../SelectService";
import styles from "./styles.module.css";
import { ChangeEvent} from "react";

type Props = {
    service: Service[];
    onChange?(texto: string): void;
    value?: string;
};

export default function SelectServiceList({ service, onChange, value }: Props) {

    function handleInputChange(e: ChangeEvent<HTMLSelectElement>) {
        onChange?.(e.target.value);
    }
    return (
        <>
            <select className={styles.formSelect} value={value} onChange={handleInputChange}>
                <option value="">Selecione um Serviço</option>
                {service.map((service) => (
                    <SelectService
                        key={service.id}
                        service={service} />
                ))}
            </select>
        </>
    );
}
