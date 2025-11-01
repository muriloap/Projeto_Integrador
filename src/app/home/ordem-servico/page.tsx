'use client'
import ModalOS from '@/components/ModalOs'
import styles from './page.module.css'
import BarraDePesquisa from '@/components/SearchBarService'


export default function HomeOs() {

    return (
        <>
            <div className={styles.containerp}>
                <ModalOS/>
                <BarraDePesquisa />
            </div>
        </>
    )
}