import React, { Component } from 'react';
import { Alert, AppRegistry, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { Button, Colors, TextInput } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';
import I18n from '../../utils/i18n/I18n';
import Firebase from '../../configs/Firebase';
import * as Font from 'expo-font';

class Register extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      displayName: '',
      loading: false,
      fontLoaded: false
    }
    this.createAccount = this.createAccount.bind(this);
  }

  componentDidMount = ()=>{
    this.loadingFont();
  }

  createAccount = async()=>{
    const userEmail = this.state.email;
    const userPassword = this.state.password;
    const userDisplayName = this.state.displayName;
    try {
      this.setState({loading: true});
      await Firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).then((newUser)=>{
        newUser.user.updateProfile({
          displayName: userDisplayName
        }).then(()=>{
          this.createUserData();
          this.verificationAccount();
          this.setState({loading: false});       
        });
      }).catch((error)=>{
        const errorCode = error.code;
        if (errorCode === 'auth/email-already-in-use'){
          this.setState({loading: false});
          Alert.alert(I18n.t('error.inUse'));
        } else if (errorCode === 'auth/invalid-email'){
          this.setState({loading: false});
          Alert.alert(I18n.t('error.invalid'));
        } else if (errorCode === 'auth/operation-not-allowed'){
          this.setState({loading: false});
          Alert.alert(I18n.t('error.notAllowed'));
        } else if (errorCode === 'auth/weak-password'){
          this.setState({loading: false});
          Alert.alert(I18n.t('error.weakPassword'));
        } else {
          // Nothing Happen!!
        }
      });
    } catch (error){
      console.log(error.message);
    }
  }

  createUserData = async()=>{
    try {
      let userId = Firebase.auth().currentUser.uid;
      await Firebase.firestore().collection('User-Data').doc(userId).set({
        firstName: '',
        lastName: '',
        address: '',
        phoneNumber: ''
      });
    } catch (error){
      console.log(error.message);
    }
  }

  verificationAccount = async()=>{
    let currentUser = Firebase.auth().currentUser;
    try {
      currentUser.sendEmailVerification();
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
    const userPassword = this.state.password;
    const userDisplayName = this.state.displayName;
    const isLoading = this.state.loading;
    const isFontLoaded = this.state.fontLoaded;

    return(
      <KeyboardAvoidingView behavior='padding' enabled={true} style={styles.flex}>
        {isFontLoaded ? <View style={styles.container}>
          <Text style={[styles.opunRegular, {fontSize: 22}]}>{I18n.t('register')}</Text>
          <View style={styles.registerForm}>
            <TextInput
              autoCapitalize='none'
              mode='outlined'
              keyboardType='default'
              label={I18n.t('displayName')}
              onChangeText={(displayName)=> this.setState({displayName})}
              placeholder={I18n.t('placeholderDisplayName')}
              style={styles.spaceBetween}
              value={userDisplayName}
            />
          </View>
          <View style={styles.registerForm}>
            <TextInput
              autoCapitalize='none'
              mode='outlined'
              keyboardType='email-address'
              label={I18n.t('email')}
              onChangeText={(email)=> this.setState({email})}
              placeholder={I18n.t('placeholderEmail')}
              style={styles.spaceBetween}
              value={userEmail}
            />
          </View>
          <View style={styles.registerForm}>
            <TextInput
              autoCapitalize='none'
              mode='outlined'
              keyboardType='visible-password'
              label={I18n.t('password')}
              onChangeText={(password)=> this.setState({password})}
              placeholder={I18n.t('placeholderPassword')}
              style={styles.spaceBetween}
              value={userPassword}
            />
          </View>
          <View style={styles.registerForm}>
            <Button color={Colors.greenA700} compact={true} dark={true} icon='account-check' mode='contained' loading={isLoading} onPress={this.createAccount}
              style={styles.spaceBetween}>
              <Text style={styles.opunRegular}>{I18n.t('button.register')}</Text>
            </Button>
            <Button color={Colors.greenA700} compact={true} dark={true} icon='arrow-left-bold-circle' mode='contained' onPress={()=> Actions.login()}
              style={styles.spaceBetween}>
              <Text style={styles.opunRegular}>{I18n.t('button.back')}</Text>
            </Button>
          </View>
        </View> : null}
      </KeyboardAvoidingView>
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
  headerRegister: {
    fontSize: 24
  },
  opunRegular: {
    fontFamily: 'opun-regular'
  },
  registerForm: {
    width: '80%'
  },
  spaceBetween: {
    margin: 5
  }
});

export default Register;

AppRegistry.registerComponent('Register', ()=> Register);