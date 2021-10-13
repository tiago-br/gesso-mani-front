import { Route, Switch } from 'react-router';
import './App.css';
import EstoquePage from './pages/privado/EstoquePage';
import FaturamentoPage from './pages/privado/FaturamentoPage';
import Orcamento from './pages/privado/Orcamento';

import VendasPage from './pages/privado/VendasPage';
import Home from './pages/público/Home';
import LoginPage from './pages/público/LoginPage';
import PrivateRoutes from './utils/PrivateRoutes';
import FuncionariosPage from './pages/privado/FuncionariosPage';
import AdminPrivateRoute from './utils/AdminPrivateRoute';
import  ProdutosPage from './pages/público/ProdutosPage';
import ServiçosPage from './pages/público/ServiçosPage';
import SobrePage from './pages/público/SobrePage'
import ContatoPage from './pages/público/ContatoPage'


function App() {
  return (
    <div className="App">
    <Switch>
      
      {/* Rotas Cliente */}
      <Route exact path="/area-do-funcionario" render={(props)=> <LoginPage {...props}/>}/>
      <Route exact path="/" render={(props)=><Home {...props}/>}/>
      <Route exact path="/produtos" render={(props)=> <ProdutosPage {...props}/>}/>
      <Route exact path="/serviços" render={(props)=><ServiçosPage {...props}/>}/>
      <Route exact path="/sobre" render={(props)=><SobrePage {...props}/>}/>
      <Route exact path="/contato" render={(props)=><ContatoPage {...props}/>}/>
      
      
      {/* Rotas Sistema */}
      
      <PrivateRoutes>
        <Route exact path="/sistema/vendas" render={(props) => <VendasPage {...props}/>}/>
        <Route exact path="/sistema/orçamento" render={(props) => <Orcamento {...props}/>}/>
      <AdminPrivateRoute>
        <Route exact path="/sistema/funcionarios" render={(props) => <FuncionariosPage {...props}/>}/>
        <Route exact path="/sistema/estoque" render={(props) => <EstoquePage {...props}/>}/>
        <Route exact path="/sistema/faturamento" render={(props) => <FaturamentoPage {...props}/>}/>
      </AdminPrivateRoute>  
      
      </PrivateRoutes>
      
     
      
      


    </Switch>
    </div>
  );
}

export default App;
