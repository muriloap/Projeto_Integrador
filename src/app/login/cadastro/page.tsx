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

    const [email, setEmail] = useState('');
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
        props.onEnviadoSucesso();
        alert("Teste")
    }
    
    function falha(error: AxiosError) {
        alert(error)

     }


     
    function pfClick() {
        setSelection("PF")
    }

    function pjClick() {
        setNome('');
        setSelection("PJ")
    }
    
    
    function cadastro() {
        const body = {
            name,
            lastName,
            email,
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
            headers: {'Content-Type': 'application/json'}
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
                                    <TxtField label="Nome" type="text" onChange={setNome}/>
                                    <TxtField label="Sobrenome" type="text" onChange={setLastName} />
                                    <TxtField label="CPF" type="text" onChange={setDocument} />
                                    <TxtField label="Nome da Empresa" type="text" onChange={setCompanyName} />

                                </div>

                                <div className={styles.end}>

                                    <Divisao title="Endereço" variant="default" />
                                    <TxtField label="CEP" type="text" onChange={setCep} />
                                    <TxtField label="Endereço" type="text" onChange={setAddress} />
                                    <TxtField label="Número" type="text" onChange={setNumber} />
                                    <TxtField label="Bairro" type="text" onChange={setNeighborhood} />
                                    <TxtField label="Estado" type="text" onChange={setState} />
                                    <TxtField label="Cidade" type="text" onChange={setCity} />

                                </div>

                                <div className={styles.contato}>

                                    <Divisao title="Contato" variant="default" />
                                    <TxtField label="Telefone" type="text" onChange={setPhone} />
                                    <TxtField label="Site" type="text" onChange={setSite} />
                                    <TxtField label="Email" type="text" onChange={setEmail} />
                                </div>

                                <div className={styles.cadastro}>

                                    <Divisao title="Cadastro" variant="default" />
                                    <TxtField label="Email" type="text" onChange={setEmail} />
                                    <TxtField label="Senha" type="password" onChange={setPassword} />
                                    <TxtField label="Confirmar senha" type="password" onChange={setEmail} />

                                </div>

                                <div className={styles.btn}>
                                <Btn variant="outline" onClick={cadastro} label="ENVIAR" />
                                </div>

                            </>) :
                            (<>
                                <h1 className={styles.textModo}>PREENCHA ESSES CAMPOS COMO PESSOA JURÍDICA</h1>

                                <div className={styles.dadosp}>
                                    <Divisao title="Dados Pessoais" variant="default" />
                                    <TxtField label="Nome" type="text" onChange={setNome} />
                                    <TxtField label="Sobrenome" type="text" onChange={setLastName} />
                                    <TxtField label="Nome da Empresa" type="text" onChange={setCompanyName} />
                                    <TxtField label="Razão Social" type="text" onChange={setCorporateReason} />
                                    <TxtField label="CNPJ" type="text" onChange={setDocument} />
                                    <TxtField label="Incrisção Estadual" type="text" onChange={setStateRegistration} />

                                </div>

                                <div className={styles.end}>

                                    <Divisao title="Endereço" variant="default" />
                                    <TxtField label="CEP" type="text" onChange={setCep} />
                                    <TxtField label="Número" type="text" onChange={setNumber} />
                                    <TxtField label="Endereço" type="text" onChange={setAddress} />
                                    <TxtField label="Bairro" type="text" onChange={setNeighborhood} />
                                    <TxtField label="Estado" type="text" onChange={setState} />
                                    <TxtField label="Cidade" type="text" onChange={setCity} />

                                </div>

                                <div className={styles.contato}>

                                    <Divisao title="Contato" variant="default" />
                                    <TxtField label="Telefone" type="text" onChange={setPhone} />
                                    <TxtField label="Site" type="text" onChange={setSite} />
                                    <TxtField label="Email" type="text" onChange={setEmail} />
                                </div>

                                <div className={styles.cadastro}>

                                    <Divisao title="Cadastro " variant="default" />
                                    <TxtField label="Email" type="text" onChange={setEmail} />
                                    <TxtField label="Senha" type="password" onChange={setPassword} />
                                    {/* <TxtField label="Confirmar senha" type="password" onChange={setEmail} /> */}

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




