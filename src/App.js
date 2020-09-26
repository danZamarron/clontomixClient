import React from 'react';
import {BrowserRouter as Router, Switch, Route } from "react-router-dom"
import LayoutApp from "./components/LayoutApp"
import './App.css';

import {
  SignUp,
  Login,
  Home,
  NewNoticia,
  EditNoticia,
  ListNoticias,
  Noticia,
  Profile,
  AprobarNoticia
} from "./pages/index"


function App() {
  return (
    <Router>
      <LayoutApp>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/profile' component={Profile} />
          <Route exact path='/newNoticia' component={NewNoticia} />
          <Route exact path='/editNoticia/:noticiaId' component={EditNoticia} />
          <Route exact path='/listNoticias' component={ListNoticias} />
          <Route exact path='/noticia/:noticiaId' component={Noticia} />
          <Route exact path='/admin/aprobarNoticia' component={AprobarNoticia} />

        </Switch>
      </LayoutApp>
  </Router>
  );
}

export default App;
