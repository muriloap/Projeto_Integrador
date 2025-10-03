import Sidebar from "@/components/SideBar";
import { ReactNode } from "react"


type Props = {
    children: ReactNode;
}

export default function HomeLayout(props: Props){
    return(
        <>
            <Sidebar/>
            {props.children}
        </>
    )
}