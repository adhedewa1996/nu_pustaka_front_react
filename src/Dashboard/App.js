import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './Login';
import Dashboard from './Navbar';

class App extends Component {
  render() {
    return (
       <BrowserRouter>
        <div>
            <Switch>
             <Route path="/" component={Login} exact/>
             <Route path="/dashboard" component={Dashboard}/>
           </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
