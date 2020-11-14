import React, {useState, useEffect} from 'react'
import { BsCircleFill } from 'react-icons/bs'

import data from '../../MockData/data.json'
import './Home.scss'

const Home = () => {

    const [status, setStatus] = useState('Em manutenção')
    
    const handlehealthScore = (healthScore: number) => {
        if (healthScore >= 80)
            return <span style={{'color' : 'green'}}> {healthScore}</span>

        if (healthScore < 80 && healthScore > 60)
            return <span style={{'color' : "#FFB658"}}> {healthScore}</span>

        if (healthScore <= 60)
            return <span style={{'color' : 'red'}}> {healthScore}</span>    
    }

    let status_color = ''

    if (status === 'Disponível') {
        status_color = "green"
    }

    if (status === 'Desativado') {
        status_color = "red"
    }

    if (status === 'Em manutenção') {
        status_color = "yellow"
    }

    const handleEquipments = () => {
        return (
            data.map(item => {
                return (
                <div className="card" key={item._id}>
                    <div className="sneaker">
                        <img src={item.image} alt="Adidas"/>
                    </div>
                    <div className="info">
                        <h1 className="title">{item.name}</h1>
                        <h3> {item.model} </h3>
                        <h3> {item.description}</h3>
                        <div className="info_health">
                            <div className="status">
                                <BsCircleFill color={status_color}/> 
                                <p>{item.status}</p>                          
                            </div>
                            <div className="healthscore">
                                <p>Nível de saúde: {handlehealthScore(item.healthscore)} </p>
                            </div>
                        </div>
                    </div>
                </div>
                )
            })
        )
    }
    
    return (
    <section id="home">
        <div className="container"> 
            <div className="maintitle">
                <h1> Unidade 1</h1>
                <h2> SP, Sao Paulo </h2>
                <p> Brasil </p>
            </div>
            <div className="equipments_container">
                {handleEquipments()}    
            </div>
        </div>
    </section>
    )
}

export default Home