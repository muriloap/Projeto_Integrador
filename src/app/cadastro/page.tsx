'use client'
import { Box, Container, rgbToHex } from '@mui/material';
import TxtField from '../components/TxtField';
import Botão from '../components/Botao';
import { useState } from 'react';
import axios from 'axios';
import Selection from "../components/Selection"
import styles from "./styles.module.css"
import { green } from '@mui/material/colors';




export default function Home() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selection, setSelection] = useState("PJ");
    const [name, setNome] = useState('');
    const [lastName, setLastName] = useState('');
    const [document, setDocument] = useState('');
    const [documentStateRegistrion, setStateRegistrion] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [cep, setCep] = useState('');
    const [address, setAddress] = useState('');
    const [number, setNumber] = useState('');
    const [numero, setEndereco] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [site, setSite] = useState('');
    const [phone, setPhone] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    function pfClick() {
        setSelection("PF")
    }

    function pjClick() {
        setSelection("PJ")
    }



    function cadastro() {

    }

    return (

        <>

            <div className={styles.sel}>

                <Selection variant="PF" selected={selection === "PF"} onClick={pfClick} label="Pessoa Física" />
                <Selection variant="PF" selected={selection === "PJ"} onClick={pjClick} label="Pessoa Juridica" />

            </div>

            <div className={styles.containerp}>



                {
                    selection === "PF" ?
                        (<>
                            <div className={styles.dadosp}>

                            <TxtField label="Nome" type="text" onChange={setNome} />
                            <TxtField label="Sobrenome" type="text" onChange={setLastName} />
                            <TxtField label="CPF" type="text" onChange={setDocument} />
                            <TxtField label="Nome da Empresa" type="text" onChange={setCompanyName} />
                            
                            </div>
                            <TxtField label="CEP" type="text" onChange={setCep} />
                            <TxtField label="Endereço" type="text" onChange={setAddress} />
                            <TxtField label="Número" type="text" onChange={setNumber} />
                            <TxtField label="Bairro" type="text" onChange={setNeighborhood} />
                            <TxtField label="Estado" type="text" onChange={setState} />
                            <TxtField label="Cidade" type="text" onChange={setCity} />
                            <TxtField label="Telefone" type="text" onChange={setPhone} />
                            <TxtField label="Site" type="text" onChange={setSite} />
                            <TxtField label="Email" type="text" onChange={setEmail} />
                            <TxtField label="Senha" type="password" onChange={setPassword} />
                            <TxtField label="Confirmar senha" type="password" onChange={setEmail} />


                            <Botão variant="outline" onClick={cadastro} label="Concluir" />

                        </>) :
                        (<>

                            <TxtField label="Nome" type="text" onChange={setNome} />
                            <TxtField label="Sobrenome" type="text" onChange={setLastName} />
                            <TxtField label="CNPJ" type="text" onChange={setDocument} />
                            <TxtField label="Incrisção Estadual" type="text" onChange={setStateRegistrion} />
                            <TxtField label="Nome da Empresa" type="text" onChange={setCompanyName} />
                            <TxtField label="CEP" type="text" onChange={setCep} />
                            <TxtField label="Endereço" type="text" onChange={setAddress} />
                            <TxtField label="Número" type="text" onChange={setNumber} />
                            <TxtField label="Bairro" type="text" onChange={setNeighborhood} />
                            <TxtField label="Estado" type="text" onChange={setState} />
                            <TxtField label="Cidade" type="text" onChange={setCity} />
                            <TxtField label="Telefone" type="text" onChange={setPhone} />
                            <TxtField label="Site" type="text" onChange={setSite} />
                            <TxtField label="Email" type="text" onChange={setEmail} />
                            <TxtField label="Senha" type="password" onChange={setPassword} />
                            <TxtField label="Confirmar senha" type="password" onChange={setEmail} />
                            <Botão variant="outline" onClick={cadastro} label="Concluir" />

                        </>)
                }


            </div>
        </>
    )
}




