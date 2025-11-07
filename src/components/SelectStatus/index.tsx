import { ChangeEvent, useState } from "react";
import styles from "./styles.module.css"

type Props = {
    onChange?(texto: string): void;
};

export default function SelectStatus(props: Props) {


    function handleInputChange(e: ChangeEvent<HTMLSelectElement>) {
            props.onChange?.(e.target.value);
        }
        
    return (
        <>
            <select className={styles.formSelect} onChange={handleInputChange}>
                    <option value="">Status da OS</option>
                    <option value="Em Orçamento">Em Orçamento</option>
                    <option value="Aguardando Material">Aguardando Material</option>
                    <option value="Aprovado">Aprovado</option>
                    <option value="Em Progresso">Em Progresso</option>
                    <option value="Cancelado">Cancelado</option>
                    <option value="Finalizado">Finalizado</option>
                    <option value="Faturado">Faturado</option>
                  </select>
        </>
    )
}