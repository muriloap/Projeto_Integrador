import styles from './styles.module.css'
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Order from '@/models/order';

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
    finalizada: number;
    cancelados: number;
    total: number;
};

export default function GraphicPizza(props: Props) {

    const data = {
        labels: ["Total de Os", "Cancelados", "Finalizadas"],
        datasets: [
            {
                data: [props.total, props.cancelados, props.finalizada], // valores
                backgroundColor: ["#0059ffff", "#ff0000ff", "#00ff0dff"], // cores
            }
        ]
    };

    return (
        <>
            <div className={styles.containerp}>
                <Pie data={data} />
            </div>

        </>
    )
}