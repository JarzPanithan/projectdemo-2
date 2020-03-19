import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';

class Cart extends Component {
  constructor(props){
    super(props);
    this.state = {
      fontLoaded: false
    }
  }

  componentDidMount = ()=>{
    this.loadingFont();
  }

  loadingFont = async()=>{
    try {
      await Font.loadAsync({
        'OpunRegular': require('../../../assets/fonts/Opun-Regular.ttf')
      });
      this.setState({fontLoaded: true});
    } catch (error){
      console.log(error.message);
    }
  }

  render(){
    const isFontLoaded = this.state.fontLoaded;

    return(
      <View style={styles.flex}>
        {isFontLoaded ? <View style={styles.container}>
          <Text style={styles.opunRegular}>Shopping Cart...</Text>
        </View> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  flex: {
    flex: 1
  },
  opunRegular: {
    fontFamily: 'OpunRegular'
  }
});

export default Cart;

AppRegistry.registerComponent('Cart', ()=> Cart);