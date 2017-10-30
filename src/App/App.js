import React, { Component } from 'react';
import Setter from '../Setter/Setter';
import Guesser from '../Guesser/Guesser';

import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';

class App extends Component {
  render() {
    return (
      <div className="main-section container">
      
          <div className="col s12">
            <ul className="tabs tabs-fixed-width">
              <li className="tab"><a href="#guesser" className="active">Guesser</a></li>
              <li className="tab"><a href="#setter">Setter</a></li>
            </ul>
          </div>

          <div id="guesser" className="col s12">
            <Guesser/>
          </div>

          <div id="setter" className="col s12">
            <Setter/>
          </div>

      </div>
    );
  }
}

export default App;
