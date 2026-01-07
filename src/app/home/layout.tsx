'use client'
import Sidebar from "@/components/SideBar";
import { ReactNode, useState } from "react"
import styles from './layout.module.css'
import PrivateRoute from "@/components/PrivateRouter";
import { usePathname } from "next/navigation";


type Props = {
    children: ReactNode;
}



export default function HomeLayout(props: Props) {
    const [open, setIsOpen] = useState(true);


    function Mudarcss() {
        setIsOpen(!open);
    }

    const pathname = usePathname();

    // rotas que NÃO devem usar o layout do menu
    const hideLayout =
        pathname?.startsWith("/home/assinaturas/sucesso");

    if (hideLayout) {
        return <>{props.children}</>;
    }

    return (
        <>
            <PrivateRoute>
                <div className={styles.containerp}>
                    <Sidebar onClick={Mudarcss} />
                    <div className={`${styles.page} ${open ? '' : styles.close}`}>
                        {props.children}
                    </div>
                </div>
            </PrivateRoute>
        </>
    )

}


