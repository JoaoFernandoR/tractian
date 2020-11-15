import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
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

interface IOptions{
    name: string,
    y: number
}

const InitialData = [
    {
        name : '', 
        y: 0
    },
    {
        name : '', 
        y: 0
    },
]


const Unidade = (props: HighchartsReact.Props) => {

    
    const params = useParams<BranchParam>() 
    
    const [data, setData] = useState<IBranch>()
    const [optionsData, setOptionsData] = useState<IOptions[]>(InitialData)
   

    const options = {
        title: {
         text: 'Estado geral dos ativos',
         style: {
            "color" : " #4b1e6766",
            "fontFamily" : "Ubuntu",
            "font-weight" : 700
            }
        },
      series: [{
        name: 'Quantidade',
        colorByPoint: true,
        data: optionsData
        }],
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                },
                borderColor: null
            }
        },  
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            backgroundColor : 'transparent',
        },
    }

    const buildPieData = (data: IEquipment[]) => {

        let myarray = []

        const result1 = data.filter((item) => item.healthscore > 80)
        myarray.push({
            name: 'Estável',
            y : result1.length
        })

        const result2 = data.filter((item) => item.healthscore < 60)
        myarray.push({
            name: 'Críticos',
            y : result2.length
        })

        const result3 = data.filter((item) => item.healthscore < 80 && item.healthscore > 60)
        myarray.push({
            name: 'Em alerta',
            y : result3.length
        })
        
        return myarray
        
    }
        
    useEffect( () => {
        api.get(`/api/v1/branches/branches/${params.branchid}`).then((result) =>{
         setData(result.data.data) 
        setOptionsData(buildPieData(result.data.data.equipments))
        })    
        .catch((err) => console.log(err.error))
      }, [params.branchid])
    
    const handlehealthScore = (healthScore: number) => {
        if (healthScore >= 80)
            return <span style={{'color' : 'green'}}> {healthScore}</span>

        if (healthScore < 80 || healthScore > 60) return <span style={{'color' : "#FFB658"}}> {healthScore}</span>
    
        if (healthScore <= 60)
            return <span style={{'color' : 'red'}}> {healthScore}</span>    
    }

    if(!data) return <Loading />

    const handleEquipments = () => {
        return (
            data?.equipments.map(item => {
                // buildPieData(item.name, item.healthscore)
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
                <div className="anotherline"></div>
            </div>
            <div>
                <HighchartsReact
                highcharts={Highcharts}
                options={options}
                {...props}
                />
            </div>
            <div className="anotherline"></div>
            <div className="equipments_container">
                {handleEquipments()}    
            </div>
        </div>
    </section>
    )
}

export default Unidade