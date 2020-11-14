import React, {useState} from 'react'
import Tenis from '../../assets/adidas.png'
// Components
import Sidebar from '../../components/Sidebar'

import 'Home.scss'

const Home = () => {

    const [status, setStatus] = useState('Disponível')
    const [healthScore, setHealthScore] = useState(80)

    const handlehealthScore = () => {
        if (healthScore >= 80)
            return <span style={{'color' : 'green'}}> {healthScore}</span>

        if (healthScore < 80 && healthScore > 60)
            return <span style={{'color' : 'yellow'}}> {healthScore}</span>

        if (healthScore <= 60)
            return <span style={{'color' : 'red'}}> {healthScore}</span>    
    }

    return (
    <section id="home">
        <Sidebar />
        <h1> Unidade 1</h1>
        <h2> Brazil </h2>
        <p> SP, São Paulo </p>
        <div className="container"> 
            <div className="card">
                <div className="sneaker">
                    <img src={Tenis} alt="Adidas"/>
                </div>
                <div className="info">
                    <h1 className="title">Bomba Hidráulica CXS7-369</h1>
                    <h3> Modelo de bomba hidráulica </h3>
                    <h3> Bomba usada para alimentar a saída do recirculador</h3>
                    <div className="status">
                        {(status === 'Disponível') ? <p> bola verde, Disponível</p> : ''}
                        {(status === 'Em manutenção') ? <p> bola amarela, Em manutenção</p> : ''}
                        {(status === 'Desativado') ? <p> bola vermelha, Desativado </p> : ''}
                    </div>
                    <h1 className="healthscore">
                        Nível de saúde: {handlehealthScore()} 
                    </h1>
                </div>
            </div>
            <div className="card">
                <div className="sneaker">
                    <div className="circle"></div>
                    <img src={Tenis} alt="Adidas"/>
                </div>
                <div className="info">
                    <h1 className="title">Adidas ZX</h1>
                    <h3> FUTURE-READY TRAINERS WITH WRAPPED BOOST FOR EXCEPTION COMFORT.</h3>
                    <div className="status">
                        {(status === 'Disponível') ? <p> bola verde, Disponível</p> : ''}
                        {(status === 'Em manutenção') ? <p> bola amarela, Em manutenção</p> : ''}
                        {(status === 'Desativado') ? <p> bola vermelha, Desativado </p> : ''}
                    </div>
                    <h1 className="healthscore">
                        Nível de saúde: {handlehealthScore()} 
                    </h1>
                </div>
            </div>
            <div className="card">
                <div className="sneaker">
                    <div className="circle"></div>
                    <img src={Tenis} alt="Adidas"/>
                </div>
                <div className="info">
                    <h1 className="title">Adidas ZX</h1>
                    <h3> FUTURE-READY TRAINERS WITH WRAPPED BOOST FOR EXCEPTION COMFORT.</h3>
                    <div className="status">
                        {(status === 'Disponível') ? <p> bola verde, Disponível</p> : ''}
                        {(status === 'Em manutenção') ? <p> bola amarela, Em manutenção</p> : ''}
                        {(status === 'Desativado') ? <p> bola vermelha, Desativado </p> : ''}
                    </div>
                    <h1 className="healthscore">
                        Nível de saúde: {handlehealthScore()} 
                    </h1>
                </div>
            </div>
        </div>
    </section>
    )
}

export default Home