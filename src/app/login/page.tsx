'use client'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { useState } from 'react';
import {Login } from '@mui/icons-material';
import axios from 'axios';
import styles from './styles.module.css'

import { useRouter } from "next/navigation";
import Header from '@/components/Header';
import TxtField from '@/components/TxtField';
import Btn from '@/components/Btn';
import Link from 'next/link';



export default function Home() {

  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  function login() {
    router.push("/home")

    
  }


  return (
    <>
        <div className={styles.containerp}>


        <div className={styles.containers}>

        <AccountCircleIcon sx={{ fontSize: 100, color: 'Black' }} />
        
        <span className={styles.textBV}>Seja Bem - Vindo ao nosso sistema de Ordem de serviço</span>
        <span className={styles.textLogin}>Faça Login ou Cadastre-se para continuar</span>

        
          
            <div className={styles.camposlogin}>
            <TxtField label="Email" type="email" onChange={setEmail} />
            <TxtField label="Senha" type="password" onChange={setPassword} />
            <Btn variant="primary" onClick={login} label="LOGIN" />
            <Link className={styles.btn}href="/login/cadastro">CADASTRE - SE</Link>
            </div>


          
        </div>
        </div>
    </>

  )
}








