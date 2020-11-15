import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { BsCircleFill } from 'react-icons/bs'
import api from '../../services/api'
import Loading from '../Loading'

import './Unidade.scss'

interface BranchParam {
    branchid : string
}

interface IEquipment {
    "_id": string,
    "name": string,
    "image": string,
    "model": string,
    "description": string,
    "status": "Disponível" | "Em manutenção" | "Desativado",
    "healthscore": number,
}

interface IBranch {
    name: string,
    country: string,
    state: string,
    city: string,
    equipments: IEquipment[]
}

const Unidade = () => {

    const params = useParams<BranchParam>() 

    const [data, setData] = useState<IBranch>()

    useEffect( () => {
        api.get(`/api/v1/branches/branches/${params.branchid}`).then((result) => setData(result.data.data))
        .catch((err) => console.log(err.error))
      }, [params.branchid])
    
    const handlehealthScore = (healthScore: number) => {
        if (healthScore >= 80)
            return <span style={{'color' : 'green'}}> {healthScore}</span>

        if (healthScore < 80 && healthScore > 60)
            return <span style={{'color' : "#FFB658"}}> {healthScore}</span>

        if (healthScore <= 60)
            return <span style={{'color' : 'red'}}> {healthScore}</span>    
    }

    if(!data) return <Loading />

    const handleEquipments = () => {
        return (
            data?.equipments.map(item => {
                return (
                <div className="card" key={item._id}>
                    <div className="equipment_image">
                        <img src={item.image} alt="Adidas"/>
                    </div>
                    <div className="info">
                        <h1 className="title">{item.name}</h1>
                        <h3> {item.model} </h3>
                        <h3> {item.description}</h3>
                        <div className="info_health">
                            <div className="status">
                                <BsCircleFill color="red"/> 
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
    <section id="unidade">
        <div className="container"> 
            <div className="maintitle">
                <h1> {data.name}</h1>
                <h2> {data.state}, {data.city} </h2>
                <p> {data.country} </p>
            </div>
            <div className="equipments_container">
                {handleEquipments()}    
            </div>
        </div>
    </section>
    )
}

export default Unidade