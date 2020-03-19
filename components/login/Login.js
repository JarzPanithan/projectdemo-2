import React, { Component } from 'react';
import { Alert, AppRegistry, AsyncStorage, StyleSheet, Text, View } from 'react-native';
import { Button, Colors, Switch, TextInput } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';
import I18n from '../../utils/i18n/I18n';
import Firebase from '../../configs/Firebase';
import * as Font from 'expo-font';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
      remember: false,
      fontLoaded: false
    }
    this.signIn = this.signIn.bind(this);
    this.checkRememberMe = this.checkRememberMe.bind(this);
  }

  componentDidMount = ()=>{
    this.loadingFont();
    this.checkRememberMe();
  }

  signIn = async()=>{
    const userEmail = this.state.email;
    const userPassword = this.state.password;
    try {
      this.setState({loading: true});
      await Firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).then(()=>{
        this.setState({loading: false});
      }).catch((error)=>{
        const errorCode = error.code;
        if (errorCode === 'auth/invalid-email'){
          this.setState({loading: false});
          Alert.alert(I18n.t('error.invalid'));
        } else if (errorCode === 'auth/user-disabled'){
          this.setState({loading: false});
          Alert.alert(I18n.t('error.disabled'));
        } else if (errorCode === 'auth/user-not-found'){
          this.setState({loading: false});
          Alert.alert(I18n.t('error.notFound'));
        } else if (errorCode === 'auth/wrong-password'){
          this.setState({loading: false});
          Alert.alert(I18n.t('error.wrongPassword'));
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

  toggleRememberMe = (value)=>{
    this.setState({remember: value});
    if (value === true){
      this.rememberUser();
    } else {
      this.forgotUser();
      this.setState({email: ''});
    }
  }

  rememberUser = async()=>{
    const userEmail = this.state.email;
    try {
      AsyncStorage.setItem('email', userEmail);
    } catch (error){
      console.log(error.message);
    }
  }

  getRememberUser = async()=>{
    const userEmail = AsyncStorage.getItem('email');
    try {
      if (userEmail !== null){
        return userEmail;
      } else {
        // Nothing Happen!!
      }
    } catch (error){
      console.log(error.message);
    }
  }

  forgotUser = async()=>{
    try {
      AsyncStorage.removeItem('email');
    } catch (error){
      console.log(error.message);
    }
  }

  checkRememberMe = async()=>{
    try {
      const userEmail = await this.getRememberUser();
      this.setState({
        email: userEmail || '',
        remember: userEmail ? true : false
      });
    } catch (error){
      console.log(error.message);
    }
  }

  render(){
    const userEmail = this.state.email;
    const userPassword = this.state.password;
    const isLoading = this.state.loading;
    const isRemember = this.state.remember;
    const isfontLoaded = this.state.fontLoaded;

    return(
      <View style={styles.flex}>
        {isfontLoaded ? <View style={styles.container}>
          <Text style={[styles.opunRegular, {fontSize: 22}]}>{I18n.t('login')}</Text>
          <View style={styles.loginForm}>
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
          </View>
          <View style={styles.loginForm}>
            <TextInput
              autoCapitalize='none'
              keyboardType='visible-password'
              label={I18n.t('password')}
              mode='outlined'
              onChangeText={(password)=> this.setState({password})}
              maxLength={10}
              placeholder={I18n.t('placeholderPassword')}
              style={styles.spaceBetween}
              value={userPassword}
            />
          </View>
          <View style={styles.loginForm}>
            <View style={styles.switchRemember}>
              <Switch
                color={Colors.greenA700}
                onValueChange={this.toggleRememberMe}
                value={isRemember}
                style={styles.spaceBetween}
              />
              <Text style={styles.text}>{I18n.t('rememberMe')}</Text>
              <View style={styles.forgotButton}>
                <Button color={Colors.greenA700} compact={true} dark={true} icon='email' onPress={()=> Actions.forgot()} style={styles.spaceBetween}>
                  <Text style={styles.opunRegular}>{I18n.t('button.forgotPassword')}</Text>
                </Button>
              </View>
            </View>
          </View>
          <View style={styles.loginForm}>
            <Button color={Colors.greenA700} compact={true} dark={true} icon='login' mode='contained' loading={isLoading} onPress={this.signIn}
              style={styles.spaceBetween}>
              <Text style={styles.opunRegular}>{I18n.t('button.login')}</Text>
            </Button>
          </View>
          <View style={styles.loginForm}>
            <View style={styles.access}>
              <Text style={[styles.opunRegular, styles.headerAccess]}>{I18n.t('access')}</Text>
            </View>
            <Button color={Colors.blue800} compact={true} dark={true} icon='facebook' mode='contained' style={styles.spaceBetween}>
              <Text style={styles.opunRegular}>{I18n.t('button.facebook')}</Text>
            </Button>
            <Button color={Colors.red800} compact={true} dark={true} icon='google' mode='contained' style={styles.spaceBetween}>
              <Text style={styles.opunRegular}>{I18n.t('button.google')}</Text>
            </Button>
          </View>
          <View style={styles.loginForm}>
            <View style={[styles.spaceBetween, styles.dontAccount]}>
            <Text style={styles.opunRegular}>{I18n.t('dontHave')}</Text>
              <Button color={Colors.greenA700} compact={true} dark={true} icon='account-plus' onPress={()=> Actions.register()}>
                <Text style={styles.opunRegular}>{I18n.t('button.register')}</Text>
              </Button>
            </View>
          </View>
        </View> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  access: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    alignItems: 'center',
    backgroundColor: Colors.grey100,
    flex: 1,
    justifyContent: 'center'
  },
  dontAccount: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  delete: {
    position: 'absolute',
    top: 30,
    right: 15
  },
  flex: {
    flex: 1
  },
  forgotButton: {
    flexDirection: 'row-reverse',
    marginRight: 40
  },
  headerAccess: {
    fontSize: 14,
    marginBottom: 5,
    marginTop: 10
  },
  headerLogin: {
    fontSize: 24
  },
  loginForm: {
    width: '80%'
  },
  opunRegular: {
    fontFamily: 'opun-regular'
  },
  spaceBetween: {
    margin: 5
  },
  switchRemember: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  text: {
    color: Colors.black,
    fontFamily: 'opun-regular'
  }
});

export default Login;

AppRegistry.registerComponent('Login', ()=> Login);