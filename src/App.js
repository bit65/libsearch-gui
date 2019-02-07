import React, { Component } from 'react';
import { ReactiveBase } from '@appbaseio/reactivesearch';
import './App.css';
import {elasticuri} from './config'

import NavBar from './components/NavBar'
import MainSearch from './components/MainSearch'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faCheckSquare, faCoffee)


class App extends Component {
  render() {
    return (
      <ReactiveBase app="index_main" url={elasticuri}>
         <NavBar />
         <MainSearch />
      </ReactiveBase>

    );
  }
}

export default App;
