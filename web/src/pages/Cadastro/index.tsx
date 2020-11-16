import React, {FormEvent, useState, ChangeEvent} from 'react'
import { Input } from 'antd'

import './Cadastro.scss'
import { stat } from 'fs'

const Cadastro = () => {

    const { TextArea } = Input

    const [name, setName] = useState('')
    const [cnpj, setCnpj] = useState('')

    const [nameUnidade, setNameUnidade] = useState('')
    const [pais, setPais] = useState('')
    const [estado, setEstado] = useState('')
    const [cidade, setCidade] = useState('')

    const [nomeAtivo, setNomeAtivo] = useState('')
    const [model, setModel] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState("Disponível")
    const [healthScore, setHealthScore] = useState('')

    const handleSubmit = (event:FormEvent) => {
        event.preventDefault()
        alert('Cadastro realizado com sucesso')
    }

    const handleNumber = (event:ChangeEvent<HTMLInputElement>) => {
        const number = event.target.value

        setHealthScore(number)
    }

    console.log(status)

    return (
    <section id="create-branch">
        <div className="container">
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend> Cadastrar Empresa </legend>
                    <div className="input-block">
                        <Input size="large" placeholder="Nome da Empresa" id="name" value={name} onChange={event => setName(event.target.value)} minLength={3} maxLength={50}/> 
                    </div>
                    <div className="input-block">
                        <Input placeholder="CNPJ" id="cnpj" value={cnpj} onChange={event => setCnpj(event.target.value)} minLength={1} maxLength={20}/> 
                    </div>
                    <legend> Informações sobre unidades </legend>
                    <div className="input-block">
                        <Input size="large" placeholder="Nome da Unidade" value={nameUnidade} onChange={event => setNameUnidade(event.target.value)} minLength={3} maxLength={40}/> 
                    </div>
                    <div className="input-block">
                        <Input size="large" placeholder="País" id="pais" value={pais} onChange={event => setPais(event.target.value)} maxLength={20}/> 
                    </div>
                    <div className="input-block">
                        <Input size="large" placeholder="Estado" id="estado" value={estado} onChange={event => setEstado(event.target.value)} maxLength={20}/> 
                    </div>
                    <div className="input-block">
                        <Input size="large" placeholder="Cidade" id="cidade" value={cidade} onChange={event => setCidade(event.target.value)} maxLength={40}/> 
                    </div>
                    <legend> Ativo </legend>
                    <div className="input-block">
                        <Input placeholder="Nome" value={nomeAtivo} onChange={event => setNomeAtivo(event.target.value)} maxLength={50} minLength={3}/> 
                    </div>
                    <div className="input-block">
                        <Input size="large" placeholder="Modelo" value={model} id="modelo" onChange={event => setModel(event.target.value)} maxLength={50}/> 
                    </div>
                    <div className="input-block">
                        <TextArea showCount maxLength={100} id="description" value={description} onChange={event => setDescription(event.target.value)} placeholder="Descrição"/> 
                    </div>
                    <Input type="file" id="image" onChange={event => event.target.files}/>
                    <div className="input-block">
                        <Input placeholder="Nível de saúde" value={healthScore} onChange={handleNumber}/>
                    </div>
                    <div className="button-select">
                        <button type="button" 
                        onClick={() => setStatus("Disponível")}
                        className={(status === 'Disponível') ? 'active' : ''}
                        >
                            Disponível
                        </button>
                        <button type="button" 
                        onClick={() => setStatus("Em manutenção")}
                        className={(status === 'Em manutenção') ? 'active' : ''}>
                            Em manutenção
                        </button>
                        <button type="button" 
                        onClick={() => setStatus("Desativado")}
                        className={(status === 'Desativado') ? 'active' : ''}>
                            Desativado
                        </button>
                    </div>
                    <button className="confirm-button" type="submit">
                        Confirmar
                    </button>
                </fieldset>
            </form>
        </div>
    </section>
    )
}

export default Cadastro