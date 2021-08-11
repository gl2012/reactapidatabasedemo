import logo from './logo.svg';
import './App.css';

import Navigation from './Navigation';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import {Home} from './Home';
import {Department} from './Department';
import {Employee} from './Employee';

function App() {
  return (
  <BrowserRouter>
    <div className="container">
      <h3 className="m-3 d-flex justify-content-center">
        React Js API Database
      </h3>
      <Navigation/>
          <Switch>
              <Route exact path='/'>< Home /></Route>
              <Route path='/department'><Department /></Route> 
              <Route path="/employee" ><Employee /></Route>
          </Switch>
       
    </div>
    </BrowserRouter>
  );
}

export default App;

