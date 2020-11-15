import React, {FormEvent, useState, ChangeEvent} from 'react'
import Sidebar from '../../components/Sidebar'

import './Cadastro.scss'

const Cadastro = () => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [model, setModel] = useState('')
    const [healthScore, setHealthScore] = useState('')
    const [status, setStatus] = useState("Disponível")

    const handleSubmit = (event:FormEvent) => {
        event.preventDefault()
        alert('Cadastro realizado com sucesso')
    }

    const handleNumber = (event:ChangeEvent<HTMLInputElement>) => {
        const number = event.target.value

        setHealthScore(number)
    }

    return (
    <section id="create-branch">
        <form onSubmit={handleSubmit}>
            <fieldset>
                <legend> Dados </legend>
                <div className="input-block">
                    <label htmlFor="name">Nome</label>
                    <input id="name" value={name} onChange={event => setName(event.target.value)}/>
                </div>
                <div className="input-block">
                    <label htmlFor="model">Modelo</label>
                    <input id="model" value={model} onChange={event => setModel(event.target.value)}/>
                </div>
                <div className="input-block">
                    <label htmlFor="description">Sobre <span>Máximo de 100 caracteres</span></label>
                    <textarea id="description" maxLength={100} value={description} onChange={event => setDescription(event.target.value)}/>
                </div>
                <div className="input-block">
                    <label htmlFor="image">Foto</label>
                    <input type="file" id="image" onChange={event => event.target.files}/>
                </div>
                <div className="input-block">
                    <label htmlFor="healthscore">Instruções</label>
                    <input id="healthscore" value={healthScore} onChange={handleNumber}/>
                </div>
                <div className="button-select">
                    <button type="button" 
                    onClick={() => setStatus("Disponível")}>
                        Disponível
                    </button>
                    <button type="button" 
                    onClick={() => setStatus("Em manutenção")}>
                        Em manutenção
                    </button>
                    <button type="button" 
                    onClick={() => setStatus("Desativado")}>
                        Desativado
                    </button>
                </div>
                <button className="confirm-button" type="submit">
                    Confirmar
                </button>
            </fieldset>
        </form>
    </section>
    )
}

export default Cadastro