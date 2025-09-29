'use client'
import { Box, Container } from '@mui/material';
import TxtField from '../components/TxtField';
import Botão from '../components/Botão';
import { useState } from 'react';
import axios from 'axios';
import Selection from "../components/Selection"
import styles from "./styles.module.css"




export default function Home() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selecao, setSelecao] = useState("PJ");

    function pfClick(){
        setSelecao("PF")
    }
    
    function pjClick(){
        setSelecao("PJ")
    }

    

    function cadastro() {
       
    }

    return (


        <Container maxWidth="sm">
            <Box display="flex" flexDirection="column" alignItems="center" gap={3} mt={4}>

                <TxtField label="Nome" type="email" onChange={setEmail} />
                <TxtField label="Sobrenome" type="email" onChange={setEmail} />
                <TxtField label="Email" type="email" onChange={setEmail} />
                <TxtField label="Senha" type="password" onChange={setEmail} />
                <TxtField label="Confirmar Senha" type="password" onChange={setPassword} />
                <Botão variant="outline" onClick={cadastro} label="CADASTRE - SE" />

                <Container maxWidth="sm">
                    <Box display="flex" flexDirection="row" alignItems="center" gap={0} mt={4}>
                        <Selection variant="PF" selected={selecao === "PF"} onClick={pfClick} label="Pessoa Física"/>
                        <Selection variant="PF" selected={selecao === "PJ"} onClick={pjClick} label="Pessoa Juridica"/>

                    </Box>
                </Container>

            </Box>
        </Container>
    )
}




