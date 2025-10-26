'use client'
import styles from './page.module.css'
import BotaoNovo from '@/components/ModalOs'
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