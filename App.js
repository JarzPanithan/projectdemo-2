import React, { Component } from 'react';
import { AppRegistry, YellowBox } from 'react-native';
import Routes from './utils/routes/Routes';

class App extends Component {
  render(){
    return (
      <Routes />
    );
  }
}

export default App;

YellowBox.ignoreWarnings(['Setting a timer']);
console.disableYellowBox = true;

AppRegistry.registerComponent('App', ()=> App);