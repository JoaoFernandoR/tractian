import React, {useEffect, useState} from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import api from './services/api'
// pages
import Home from './pages/Home'
import Cadastro from './pages/Cadastro'
import Unidade from './pages/Unidade';
import Sidebar from './components/Sidebar';
import Loading from './pages/Loading/'

interface ApiResponse {
  data: {
      name : string
      branches : [],
      id: string
  }
}

const App = () => {

  const [apiData, setApiData] = useState<ApiResponse>()

    useEffect(() => {
        api.get('/api/v1/branches/5fb02132436e23b4cdbbb37e')
        .then(result => setApiData(result.data))
        .catch(err => console.log(err))
    }, [])

    if (apiData === undefined) {
      return <Loading />
  }
  else {
    return (
    <BrowserRouter>
      <Sidebar api={apiData?.data}/>
      <Switch>
        <Route path='/' component={Home} exact={true}/>
        <Route path='/cadastro' component={Cadastro} exact={true}/>
        <Route path='/unidade/:branchid' component={Unidade} exact={true}/>
        <Redirect to="/" />
      </Switch>    
    </BrowserRouter>
    )}

}

export default App;
