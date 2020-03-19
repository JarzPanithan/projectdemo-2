import React, { Component } from 'react';
import { Alert, AppRegistry, StyleSheet, Text, View } from 'react-native';
import { Button, Colors, TextInput } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';
import I18n from '../../utils/i18n/I18n';
import Firebase from '../../configs/Firebase';
import * as Font from 'expo-font';

class Forgot extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      loading: false,
      fontLoaded: false
    }
    this.resetPassword = this.resetPassword.bind(this);
  }

  componentDidMount = ()=>{
    this.loadingFont();
  }

  resetPassword = async()=>{
    const userEmail = this.state.email;
    try {
      this.setState({loading: true});
      await Firebase.auth().sendPasswordResetEmail(userEmail).then(()=>{
        this.setState({email: '', loading: false});
        Alert.alert(I18n.t('alert.sendEmail'));
      }).catch((error)=>{
        const errorCode = error.code;
        if (errorCode === 'auth/invalid-email'){
          this.setState({loading: false});
          Alert.alert(I18n.t('error.invalid'));
        } else if (errorCode === 'auth/user-not-found'){
          this.setState({loading: false});
          Alert.alert(I18n.t('error.notFound'));
        } else {
          // Nothing Happen!!
        }
      });
    } catch (error){
      console.log(error.message);
    }
  }

  loadingFont = async()=>{
    try {
      await Font.loadAsync({
        'opun-regular': require('../../assets/fonts/Opun-Regular.ttf')
      });
      this.setState({fontLoaded: true});
    } catch (error){
      console.log(error.message);
    }
  }

  render(){
    const userEmail = this.state.email;
    const isLoading = this.state.loading;
    const isFontLoaded = this.state.fontLoaded;

    return(
      <View style={styles.flex}>
        {isFontLoaded ? <View style={styles.container}>
          <Text style={[styles.opunRegular, {fontSize: 22}]}>{I18n.t('forgot')}</Text>
          <View style={styles.forgotForm}>
            <TextInput
              autoCapitalize='none'
              keyboardType='email-address'
              label={I18n.t('email')}
              mode='outlined'
              onChangeText={(email)=> this.setState({email})}
              placeholder={I18n.t('placeholderEmail')}
              style={styles.spaceBetween}
              value={userEmail}
            />
            <Button color={Colors.greenA700} compact={true} dark={true} icon='send' loading={isLoading} mode='contained' onPress={this.resetPassword}
             style={styles.spaceBetween}>
              <Text style={styles.opunRegular}>{I18n.t('button.sendEmail')}</Text>
            </Button>
            <Button color={Colors.greenA700} compact={true} dark={true} icon='arrow-left-bold-circle' mode='contained' onPress={()=> Actions.login()}
             style={styles.spaceBetween}>
              <Text style={styles.opunRegular}>{I18n.t('button.back')}</Text>
            </Button>
          </View>
        </View> : null}
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
  },
  flex: {
    flex: 1
  },
  forgotForm: {
    width: '80%'
  },
  headerForgot: {
    fontSize: 24
  },
  opunRegular: {
    fontFamily: 'opun-regular'
  },
  spaceBetween: {
    margin: 5
  }
});

export default Forgot;

AppRegistry.registerComponent('Forgot', ()=> Forgot);