import Assinaturas from '@/components/Assinaturas'
import styles from './page.module.css'
import BotaoNovo from '@/components/BotaoNovo'
import BarraDePesquisa from '@/components/BarraDePesquisa'
export default function HomeOs(){
    return(
        <>
        <div className={styles.containerp}>
            <BotaoNovo/>
            <BarraDePesquisa/>
        </div>
        </>
    )
}