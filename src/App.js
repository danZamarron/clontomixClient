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
  Noticia
} from "./pages/index"


const Profile = () => <h1>Profile</h1>
const Logout = () => <h1>ya te logeaste</h1>

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
          <Route exact path='/logout' component={Logout} />
          <Route component={Logout} />
        </Switch>
      </LayoutApp>
  </Router>
  );
}

export default App;
