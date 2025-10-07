import Assinaturas from "@/components/Assinaturas";
import styles from './page.module.css'
import Dashboard from "@/components/Dashboard";



export default function Home(){

    
   

    return (
        <>
        <div className={styles.container}>
            <Dashboard quantityc={90} quantityp={890} quantityos={300} quantitys={50}/>
        </div>
        </>
    )
}