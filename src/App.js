import { Route, Switch } from 'react-router';
import './App.css';
import EstoquePage from './pages/privado/EstoquePage';
import FaturamentoPage from './pages/privado/FaturamentoPage';
import Orcamento from './pages/privado/Orcamento';
import VendasPage from './pages/privado/VendasPage';
import LoginPage from './pages/público/LoginPage';
import PrivateRoutes from './utils/PrivateRoutes';
import AdminPrivateRoute from './utils/AdminPrivateRoute';
import FechamentoPage from './pages/privado/FechamentoPage';
import ComprasPage from './pages/privado/ComprasPage';
import DespesasPage from './pages/privado/ DespesasPage';
import ColaboradoresPage from './pages/privado/ColaboradoresPage';
import SistemaPage from './pages/privado/SistemaPage';
import FechamentoMesAnoPage from './components/privado/FechamentoMesAno/FechamentoMesAnoPage';
import FechamentoTotal from './components/privado/FechamentoMesAno/FechamentoTotal';


function App() {
  return (
    <div className="App">
    <Switch>
      
      {/* Rotas Cliente */}
      <Route exact path="/" render={(props)=> <LoginPage {...props}/>}/>


      
      {/* Rotas Sistema */}
      
      <PrivateRoutes>
        <Route exact path="/sistema/vendas" render={(props) => <VendasPage {...props}/>}/>
        <Route exact path="/sistema/orçamento" render={(props) => <Orcamento {...props}/>}/>
      <AdminPrivateRoute>
        <Route exact path="/sistema/estoque" render={(props) => <EstoquePage {...props}/>}/>
        <Route exact path="/sistema/faturamento" render={(props) => <FaturamentoPage {...props}/>}/>
        <Route exact path="/sistema/fechamento" render={(props) => <FechamentoPage {...props}/>}/>
        <Route exact path="/sistema/compras" render={(props) => <ComprasPage {...props}/>}/>
        <Route exact path="/sistema/despesas" render={(props) => <DespesasPage {...props}/>}/>
        <Route exact path="/sistema/colaboradores" render={(props) => <ColaboradoresPage {...props}/>}/>
        <Route exact path="/sistema/users-sistema" render={(props) => <SistemaPage {...props}/>}/>
        <Route exact path="/sistema/fechamento/:mes/:ano" render={(props) => <FechamentoMesAnoPage {...props}/>}/>
        <Route exact path="/sistema/fechamento/:mes/:ano/fechamento" render={(props) => <FechamentoTotal {...props}/>}/>
      </AdminPrivateRoute>  
      
      </PrivateRoutes>
      
     
      
      


    </Switch>
    </div>
  );
}

export default App;
