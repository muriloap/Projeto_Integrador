'use client'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, Container} from '@mui/material';
import TxtField from '../components/TxtField';
import { useState } from 'react';
import { Login } from '@mui/icons-material';
import axios from 'axios';
import styles from './styles.module.css'
import Botão from '../components/Btn';
import { useRouter } from "next/navigation";
import Header from '../components/Header';


export default function Home() {

  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  function login() {
    router.push("/home")

    
  }

  function cadastrese() {
    router.push("/cadastro");
  }

  return (
    <>
    <Header/>

        <div className={styles.containerp}>


        <div className={styles.containers}>

        <AccountCircleIcon sx={{ fontSize: 100, color: 'Black' }} />
        
        <span className={styles.textBV}>Seja Bem - Vindo ao nosso sistema de Ordem de serviço</span>
        <span className={styles.textLogin}>Faça Login ou Cadastre-se para continuar</span>

        
          
            <div className={styles.camposlogin}>
            <TxtField label="Email" type="email" onChange={setEmail} />
            <TxtField label="Senha" type="password" onChange={setPassword} />
            <Botão variant="primary" onClick={login} label="LOGIN" />
            <Botão variant="outline" onClick={cadastrese} label="CADASTRE - SE" />
            </div>


          
        </div>
        </div>
    </>

  )
}








