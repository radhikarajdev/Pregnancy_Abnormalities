import 'leaflet/dist/leaflet.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Mapview from './components/Mapview';
import Sign from './components/Sign';
import Login from './components/Login';
import './styles/App.css';

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path="/about">
          <About/>
        </Route>
        <Route path="/mapview">
          <Mapview/>
        </Route>
        <Route path="/sign">
          <Sign/>
        </Route>
        <Route path="/login">
          <Login/>
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
