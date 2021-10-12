import { Route, Switch } from 'react-router';
import './App.css';
import EstoquePage from './pages/privado/EstoquePage';
import FaturamentoPage from './pages/privado/FaturamentoPage';
import Orcamento from './pages/privado/Orcamento';
import SignupPage from './pages/privado/SignupPage';
import VendasPage from './pages/privado/VendasPage';
import Home from './pages/público/Home';
import LoginPage from './pages/público/LoginPage';
import PrivateRoutes from './utils/PrivateRoutes';
import FuncionariosPage from './pages/privado/FuncionariosPage';

function App() {
  return (
    <div className="App">
    <Switch>
      
      {/* Rotas Cliente */}
      <Route exact path="/area-do-funcionario" render={(props)=> <LoginPage {...props}/>}/>
      <Route exact path="/" render={(props)=><Home {...props}/>}/>
      
      
      {/* Rotas Sistema */}
      
      <PrivateRoutes>


      <Route exact path="/sistema/funcionarios" render={(props) => <FuncionariosPage {...props}/>}/>
 
      <Route exact path="/sistema/orçamento" render={(props) => <Orcamento {...props}/>}/>
      </PrivateRoutes>

      
      


    </Switch>
    </div>
  );
}

export default App;
