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

interface IBarOptions {
    name: string,
    data: number[]
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

const InitialBarData = [{
    name: 'Year 1800',
    data: [5]
}, {
    name: 'Year 1900',
    data: [30]
}, {
    name: 'Year 2000',
    data: [80]
}, {
    name: 'Year 2016',
    data: [40]
}]

const Unidade = (props: HighchartsReact.Props) => {
    
    const params = useParams<BranchParam>() 
    
    const [data, setData] = useState<IBranch>()
    const [optionsData, setOptionsData] = useState<IOptions[]>(InitialData)
    const [barOptionsData, setBarOptionsData] = useState<IBarOptions[]>(InitialBarData)
    const [average, setAverage] = useState(0)

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
                colors: ["#197507","#c40733","#e5b42d"],
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
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

    const barOptions = {
        colors: ["#197507","#c40733","#e5b42d"],
        chart: {
            type: 'bar',
            backgroundColor : 'transparent',
        },
        title: {
            text: 'Média dos ativos',
            style: {
                "color" : " #4b1e6766",
                "fontFamily" : "Ubuntu",
                "font-weight" : 700
            }
        },
        xAxis: {
            
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Nível de Saúde',
                align: 'high'
            },
            labels: {
                overflow: 'justify',
            },
            plotLines: [{
                color: 'black',
                value: average, // Insert your average here
                width: '1',
                zIndex: 2 // To not get stuck below the regular plot lines
            }]
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true,
                },
            }
        },
        legend: {
            layout: 'horizontal',
            align: 'right',
            verticalAlign: 'top',
            x: -10,
            y: 30,
            floating: true,
            borderWidth: 1,
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: barOptionsData
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

    const buildBarData = (data: IEquipment[]) => {
        let myarray = []

        const result1 = data.filter((item) => item.healthscore > 80)
        if (result1) {

            let newData : number[] = []
            
            result1.forEach((item) => {
                newData.push(item.healthscore)
            })

            myarray.push({
                name: 'Estável',
                data : newData
            })
            
        } 
        
        
        const result2 = data.filter((item) => item.healthscore < 60)

        if (result2) {

            let newData : any = []
            
            result2.forEach((item) => {
                newData.push(item.healthscore)
            })

            myarray.push({
                name: 'Crítico',
                data : newData
            })
            
        } 

        const result3 = data.filter((item) => item.healthscore < 80 && item.healthscore > 60)
        if (result3) {

            let newData : any = []
            
            result3.forEach((item) => {
                newData.push(item.healthscore)
            })

            myarray.push({
                name: 'Em alerta',
                data : newData
            })
            
        }         
        return myarray
    }
    
    useEffect( () => {
        api.get(`/api/v1/branches/branches/${params.branchid}`).then((result) =>{
         setData(result.data.data)
         setOptionsData(buildPieData(result.data.data.equipments))
         setBarOptionsData(buildBarData(result.data.data.equipments))
         setAverage(handleAverage(result.data.data.equipments))
        })    
        .catch((err) => console.log(err.error))
      }, [params.branchid])
    
    const handlehealthScore = (healthScore: number) => {
        if (healthScore >= 80)
            return <span style={{'color' : 'green'}}> {healthScore}</span>

        if (healthScore < 80 && healthScore > 60) return <span style={{'color' : "#FFB658"}}> {healthScore}</span>
    
        if (healthScore <= 60)
            return <span style={{'color' : 'red'}}> {healthScore}</span>    
    }

    const handleStatus = (status: string) => {
        if(status === "Disponível") {
            return (
            <div className="status">
                <BsCircleFill color="green"/> 
                <p>{status}</p>
            </div>
            )
        }
        if(status === "Em manutenção") {
            return (
            <div className="status">
                <BsCircleFill color="yellow"/> 
                <p>{status}</p>
            </div>
            )
        }
        if(status === "Desativado") {
            return (
            <div className="status">
                <BsCircleFill color="red"/> 
                <p>{status}</p>
            </div>
            )
        }

    }
    
    const handleAverage = (data: IEquipment[]) => {
        let average : any = []
        data.forEach(item => {
            average.push(item.healthscore)
        })
        return average.reduce((a: any, b : any) => (a + b)) / average.length
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
                            {handleStatus(item.status)}
                            <div className="healthscore">
                                <p>Nível de saúde:</p> 
                                {handlehealthScore(item.healthscore)}
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
            <div className="equipments_container">
                {handleEquipments()}    
            </div>
            <div className="anotherline"></div>
            <div>
                <HighchartsReact
                highcharts={Highcharts}
                options={options}
                {...props}
                />
            </div>
            <div>
                <HighchartsReact
                highcharts={Highcharts}
                options={barOptions}
                {...props}
                />
            </div>
        </div>
    </section>
    )
}

export default Unidade