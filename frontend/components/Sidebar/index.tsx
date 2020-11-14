import React from 'react'
import mapMarkerImg from '../../../assets/happy.svg';
import { FiArrowLeft } from "react-icons/fi";
import { Link } from 'react-router-dom';

import './Sidebar.scss'

const Sidebar = () => {

  // const { goBack } = useHistory();

  return (
  <section id="sidebar">
      <img src={mapMarkerImg} alt="Happy" />
      <h3> Freios Supremos </h3>
      <Link to="/cadastro">
        <FiArrowLeft size={24} color="#FFF" />
      </Link>
  </section>
  )
  
}

export default Sidebar