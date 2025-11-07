import DropDownPP from '@/components/DropDownPP'
import styles from './page.module.css'
import DropDownPS from '@/components/DropDownPS'

export default function PageConfig() {
    return (
        <>
            <div className={styles.container}>
                <DropDownPP label='Perfil e Preferências'/>
                <DropDownPS label='Privacidade e Segurança'/>
            </div>
        </>
    )

}