'use client'
import Sidebar from "@/components/SideBar";
import { ReactNode, useState } from "react"
import styles from './page.module.css'


type Props = {
    children: ReactNode;
}

export default function HomeLayout(props: Props) {

    const [open, setIsOpen] = useState(true);


    function Mudarcss() {
        setIsOpen(!open);
    }


    return (
        <>
        <div className={styles.teste}>
            <div className={`${styles.containerp} ${open ? '' : styles.close}`}/>
            <Sidebar onClick={Mudarcss} />
            {props.children}
        </div>
        </>
    )
}