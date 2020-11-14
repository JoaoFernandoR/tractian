import React from 'react'
import { Link } from 'react-router-dom'

import './Sidebar.scss'

interface Props {
  api : {
    branches : IBranches[],
    name: string,
    id: string // Da empresa
  }
}

interface IBranches {
  name: string,
  id: string // Do Branch
}

const Sidebar = (props:Props) => {

  const handleUnits = () => {
    return (
      props.api.branches.map((item, index) => {
        return (
          <Link to="/unidade" key={index}> {item.name} </Link>
        )
      })
    )
  }

  return (
  <section id="sidebar">
    {console.log(props.api, 'props.branches')}
    <div className="info_group">
      <h5> Empresa </h5>
      <h3> {props.api.name} </h3>
      <div className="greyline"></div>
      <h5> Unidades </h5>
    </div>
    {handleUnits()}
    <div className="greyline"></div>
  </section>
  )
  
}

export default Sidebar