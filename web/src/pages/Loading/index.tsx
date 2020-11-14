import React from 'react'
import LoadingGif from '../../assets/loading2.gif'

import './Loading.scss'

const Loading = () => {
    return (
    <section id="loading">
        <img src={LoadingGif} alt="loading"/>
        <h2> Carregando... </h2>
    </section>
    )
}

export default Loading