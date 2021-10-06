import { Route, Switch } from 'react-router';
import './App.css';
import EstoquePage from './pages/privado/EstoquePage';
import SignupPage from './pages/privado/SignupPage';
import VendasPage from './pages/privado/VendasPage';
import Home from './pages/público/Home';
import LoginPage from './pages/público/LoginPage';
import PrivateRoutes from './utils/PrivateRoutes';

function App() {
  return (
    <div className="App">
    <Switch>
      
      {/* Rotas Cliente */}
      <Route exact path="/area-do-funcionario" render={(props)=> <LoginPage {...props}/>}/>
      <Route exact path="/" render={(props)=><Home {...props}/>}/>
      
      
      {/* Rotas Sistema */}
      
      <PrivateRoutes>


      <Route exact path="/sistema/novofuncionario" render={(props) => <SignupPage {...props}/>}/>
      <Route exact path="/sistema/estoque" render={(props) => <EstoquePage {...props}/>}/>
      <Route exact path="/sistema/vendas" render={(props) => <VendasPage {...props}/>}/>
      </PrivateRoutes>

      
      


    </Switch>
    </div>
  );
}

export default App;
