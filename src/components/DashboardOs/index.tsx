import Link from 'next/link'
import styles from './styles.module.css'
import AssignmentIcon from "@mui/icons-material/Assignment";
import OsStatus from '../OsStatus';

type Props = {
    quantityos: number;
    quantitys: number;
    quantityc: number;
    quantityp: number;
};

export default function DashboardOs(props: Props) {
    return (
        <>
            <div className={styles.tabela1}>
                <Link href="/home/ordem-servico" className={styles.campos}>
                    <div className={styles.serviceOrder}>
                        <div className={styles.icon}>
                            <AssignmentIcon sx={{ fontSize: 50 }} />
                            <div className={styles.quantity}>
                                <h2>{props.quantityos}</h2>
                                <div className={styles.name}>
                                    <p>Ordem de Serviço</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <OsStatus orders={[]}/>
                </Link>
            </div>
        </>
    )
}