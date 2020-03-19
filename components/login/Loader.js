import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Colors } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';
import Firebase from '../../configs/Firebase';

class Loader extends Component {
  componentDidMount = ()=>{
    this.rememberAccount();
  }

  rememberAccount = async()=>{
    try {
      Firebase.auth().onAuthStateChanged((user)=>{
        if (user !== null){
          Actions.home();
        } else {
          Actions.login();
        }
      });
    } catch (error){
      console.log(error.message);
    }
  }

  render(){
    return(
      <View style={styles.container}>
        <ActivityIndicator color={Colors.greenA700} animating={true} size={70} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.grey100,
    flex: 1,
    justifyContent: 'center'
  }
});

export default Loader;

AppRegistry.registerComponent('Loader', ()=> Loader);