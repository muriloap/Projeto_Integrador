'use client'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, Container, TextField } from '@mui/material';
import TxtField from '../components/TxtField';
import { useState } from 'react';
import { Login } from '@mui/icons-material';
import axios from 'axios';
import styles from "./page.module.css"
import Botão from '../components/Botão';
import { useRouter } from "next/navigation";


export default function Home() {

  const router = useRouter();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');


  function login() {
    axios.get("https://localhost:3000/users")
  }

  function cadastrese() {
    router.push("/cadastro");
  }

  return (
    <Container maxWidth="sm">

      <Box display="flex" flexDirection="column" alignItems="center" gap={20} mt={4}>

        <AccountCircleIcon sx={{ fontSize: 100, color: 'Black' }} />

        <Container maxWidth="sm">
          <Box display="flex" flexDirection="column" alignItems="center" gap={3} mt={4}>

            <TxtField label="Email" type="email" onChange={setEmail} />
            <TxtField label="Senha" type="password" onChange={setSenha} />
            <Botão variant="primary" onClick={login} label="LOGIN" />
            <Botão variant="outline" onClick={cadastrese} label="CADASTRE - SE" />


          </Box>

        </Container >
      </Box>
    </Container>

  )
}








