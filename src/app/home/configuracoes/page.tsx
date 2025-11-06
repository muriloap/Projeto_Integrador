import DropDown from '@/components/DropDown'
import styles from './page.module.css'

export default function PageConfig() {
    return (
        <>
            <div className={styles.container}>
                <DropDown/>
                <DropDown/>
            </div>
        </>
    )

}