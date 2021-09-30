import { Route, Switch } from 'react-router';
import './App.css';
import SignupPage from './pages/privado/SignupPage';
import Home from './pages/público/Home';
import LoginPage from './pages/público/LoginPage';

function App() {
  return (
    <div className="App">
    <Switch>
      {/* Rotas Sistema */}

      <Route path="/sistema/novofuncionario" render={(props)=><SignupPage {...props}/>}/>

      {/* Rotas Cliente */}
      <Route exact path="/" render={(props)=><Home {...props}/>}/>
      <Route path="/area-do-funcionario" render={(props)=><LoginPage {...props}/>}/>


    </Switch>
    </div>
  );
}

export default App;
