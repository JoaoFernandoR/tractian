import React from 'react'
import { Link } from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'

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
  _id: string // Do Branch
}

const Sidebar = (props:Props) => {

  const handleUnits = () => {
    return (
      props.api.branches.map((item, index) => {
        return (
          <ul key={index} className="links">
            <Link to={`/unidade/${item._id}`}> {item.name} </Link>
          </ul>
        )
      })
    )
  }

  return (
  <section id="sidebar">
    <Link to="/" className="home_button">
      <AiFillHome size={30} />
    </Link>
    <div className="info_group">
      <h5> Empresa </h5>
      <div className="greyline"></div>
      <h3> {props.api.name} </h3>
      <h5> Unidades </h5>
    </div>
    <div className="greyline"></div>
    <li>
      {handleUnits()}
    </li>
    <Link to="/cadastro" className="cadastrar">
      <AiFillHome size={30} />
    </Link>
  </section>
  )
  
}

export default Sidebar