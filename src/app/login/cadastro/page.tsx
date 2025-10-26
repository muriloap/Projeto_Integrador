'use client'
import Selection from '@/components/Selection'
import { useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';

import styles from "./styles.module.css"

import Divisao from '@/components/Divisao';
import TxtField from '@/components/TxtField';
import Btn from '@/components/Btn';


type Props = {
    onEnviando(): void;
    onEnviadoSucesso(): void;
    onEnviadoFalha(): void;
}





export default function Home(props: Props) {

    const [emailCont, setEmailCont] = useState('');
    const [emailCad, setEmailCad] = useState('');
    const [password, setPassword] = useState('');
    const [selection, setSelection] = useState("PJ");
    const [name, setNome] = useState('');
    const [lastName, setLastName] = useState('');
    const [document, setDocument] = useState('');
    const [stateRegistration, setStateRegistration] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [corporateReason, setCorporateReason] = useState('');
    const [cep, setCep] = useState('');
    const [address, setAddress] = useState('');
    const [number, setNumber] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [site, setSite] = useState('');
    const [phone, setPhone] = useState('');


    function sucesso(_res: AxiosResponse) {
        alert("Teste")
    }

    function falha(error: AxiosError) {
        alert(error)

    }

    function limparCampos() {
        setNome('');
        setLastName('');
        setDocument('');
        setStateRegistration('');
        setCompanyName('');
        setCorporateReason('');
        setCep('');
        setAddress('');
        setNumber('');
        setNeighborhood('');
        setState('');
        setCity('');
        setSite('');
        setPhone('');
        setEmailCont('');
        setEmailCad('');
        setPassword('');
    }



    function pfClick() {
        limparCampos()
        setSelection("PF")
    }

    function pjClick() {
        limparCampos()
        setSelection("PJ")
    }


    function cadastro() {
        const body = {
            name,
            lastName,
            email: emailCad,
            password,
            companyName,
            corporateReason,
            document,
            stateRegistration,
            cep,
            address,
            number: Number(number),
            neighborhood,
            state,
            city,
            phone,
            site
        };

        console.log(body);

        axios.post("http://localhost:3000/users", body,

            {
                headers: { 'Content-Type': 'application/json' }
            })
            .then(sucesso)
            .catch(falha);



    }

    return (
        <>
            <div className={styles.containerp}>

                <div className={styles.sel}>

                    <Selection variant="PF" selected={selection === "PF"} onClick={pfClick} label="Pessoa Física" />
                    <Selection variant="PF" selected={selection === "PJ"} onClick={pjClick} label="Pessoa Juridica" />

                </div>

                <div className={styles.containers}>

                    {
                        selection === "PF" ?
                            (<>
                                <h1 className={styles.textModo}>PREENCHA ESSES CAMPOS COMO PESSOA FÍSICA</h1>
                                <div className={styles.dadosp}>
                                    <Divisao title="Dados Pessoais" variant="default" />
                                    <TxtField value={name} label="Nome" type="text" onChange={setNome} />
                                    <TxtField value={lastName} label="Sobrenome" type="text" onChange={setLastName} />
                                    <TxtField value={document} label="CPF" type="text" onChange={setDocument} />
                                    <TxtField value={companyName} label="Nome da Empresa" type="text" onChange={setCompanyName} />

                                </div>

                                <div className={styles.end}>

                                    <Divisao title="Endereço" variant="default" />
                                    <TxtField value={cep} label="CEP" type="text" onChange={setCep} />
                                    <TxtField value={address} label="Endereço" type="text" onChange={setAddress} />
                                    <TxtField value={number} label="Número" type="text" onChange={setNumber} />
                                    <TxtField value={neighborhood} label="Bairro" type="text" onChange={setNeighborhood} />
                                    <TxtField value={state} label="Estado" type="text" onChange={setState} />
                                    <TxtField value={city} label="Cidade" type="text" onChange={setCity} />

                                </div>

                                <div className={styles.contato}>

                                    <Divisao title="Contato" variant="default" />
                                    <TxtField value={phone} label="Telefone" type="text" onChange={setPhone} />
                                    <TxtField value={site} label="Site" type="text" onChange={setSite} />
                                    <TxtField value={emailCont} label="Email" type="text" onChange={setEmailCont} />
                                </div>

                                <div className={styles.cadastro}>

                                    <Divisao title="Cadastro" variant="default" />
                                    <TxtField value={emailCad} label="Email" type="text" onChange={setEmailCad} />
                                    <TxtField value={password} label="Senha" type="password" onChange={setPassword} />
                                    {/* <TxtField value={} label="Confirmar senha" type="password" onChange={setEmail} /> */}

                                </div>

                                <div className={styles.btn}>
                                    <Btn variant="outline" onClick={cadastro} label="ENVIAR" />
                                </div>

                            </>) :
                            (<>
                                <h1 className={styles.textModo}>PREENCHA ESSES CAMPOS COMO PESSOA JURÍDICA</h1>

                                <div className={styles.dadosp}>
                                    <Divisao title="Dados Pessoais" variant="default" />
                                    <TxtField value={name} label="Nome" type="text" onChange={setNome} />
                                    <TxtField value={lastName} label="Sobrenome" type="text" onChange={setLastName} />
                                    <TxtField value={companyName} label="Nome da Empresa" type="text" onChange={setCompanyName} />
                                    <TxtField value={corporateReason} label="Razão Social" type="text" onChange={setCorporateReason} />
                                    <TxtField value={document} label="CNPJ" type="text" onChange={setDocument} />
                                    <TxtField value={stateRegistration} label="Incrisção Estadual" type="text" onChange={setStateRegistration} />

                                </div>

                                <div className={styles.end}>

                                    <Divisao title="Endereço" variant="default" />
                                    <TxtField value={cep} label="CEP" type="text" onChange={setCep} />
                                    <TxtField value={number} label="Número" type="text" onChange={setNumber} />
                                    <TxtField value={address} label="Endereço" type="text" onChange={setAddress} />
                                    <TxtField value={neighborhood} label="Bairro" type="text" onChange={setNeighborhood} />
                                    <TxtField value={state} label="Estado" type="text" onChange={setState} />
                                    <TxtField value={city} label="Cidade" type="text" onChange={setCity} />

                                </div>

                                <div className={styles.contato}>

                                    <Divisao title="Contato" variant="default" />
                                    <TxtField value={phone} label="Telefone" type="text" onChange={setPhone} />
                                    <TxtField value={site} label="Site" type="text" onChange={setSite} />
                                    <TxtField value={emailCont} label="Email" type="text" onChange={setEmailCont} />
                                </div>

                                <div className={styles.cadastro}>

                                    <Divisao title="Cadastro " variant="default" />
                                    <TxtField value={emailCad} label="Email" type="text" onChange={setEmailCad} />
                                    <TxtField value={password} label="Senha" type="password" onChange={setPassword} />
                                    {/* <TxtField value={} label="Confirmar senha" type="password" onChange={setEmail} /> */}

                                </div>


                                <div className={styles.btn}>
                                    <Btn variant="outline" onClick={cadastro} label="ENVIAR" />
                                </div>

                            </>)
                    }

                </div>
            </div>
        </>
    )
}




