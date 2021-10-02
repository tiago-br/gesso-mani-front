import { Route, Switch } from 'react-router';
import './App.css';
import SignupPage from './pages/privado/SignupPage';
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

      </PrivateRoutes>

      
      


    </Switch>
    </div>
  );
}

export default App;
