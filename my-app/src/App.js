import { Route, Switch } from 'react-router';
import './App.css';
import SignupPage from './pages/privado/SignupPage';

function App() {
  return (
    <div className="App">
    <Switch>
      <Route path="/sistema/novofuncionario" render={(props)=><SignupPage {...props}/>}/>
    </Switch>
    </div>
  );
}

export default App;
