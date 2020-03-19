import React, { Component } from 'react';
import { Alert, AppRegistry, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator, Button, Colors, TextInput } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';
import I18n from '../../../utils/i18n/I18n';
import Firebase, { fb } from '../../../configs/Firebase';
import * as Font from 'expo-font';

class Account extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      displayName: '',
      firstName: '',
      lastName: '',
      address: '',
      phoneNumber: '',
      uid: '',
      currentPassword: '',
      editLoading: false,
      discardLoading: false,
      deleteLoading: false,
      logoutLoading: false,
      fontLoaded: false
    }
    this.userAccountData = this.userAccountData.bind(this);
    this.userAccountDataFromDatabase = this.userAccountDataFromDatabase.bind(this);
    this.updateDisplayName = this.updateDisplayName.bind(this);
    this.updateUserData = this.updateUserData.bind(this);
    this.discardUpdateUserData = this.discardUpdateUserData.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount = ()=>{
    this.userAccountData();
    this.userAccountDataFromDatabase();
    this.loadingFont();
  }

  userAccountData = async()=>{
    try {
      let currentUser = Firebase.auth().currentUser;
      if (currentUser !== null){
        const userEmail = currentUser.email;
        const userDisplayName = currentUser.displayName;
        const userId = currentUser.uid;
        this.setState({
          email: userEmail,
          displayName: userDisplayName,
          uid: userId
        });
      } else {
        // Nothing Happen!!
      }
    } catch (error){
      console.log(error.message);
    }
  }

  userAccountDataFromDatabase = async()=>{
    try {
      let userId = Firebase.auth().currentUser.uid;
      await Firebase.firestore().collection('User-Data').doc(userId).get().then((doc)=>{
        if (doc.exists){
          const data = doc.data();
          const firstName = data.firstName;
          const lastName = data.lastName;
          const address = data.address;
          const phoneNumber = data.phoneNumber;
          this.setState({firstName, lastName, address, phoneNumber});
        } else {
          // Nothing Happen!!
        }
      });
    } catch (error){
      console.log(error.message);
    }
  }

  editUserData = ()=>{
    this.setState({editLoading: true});
    this.updateDisplayName();
    this.updateUserData();
    this.setState({editLoading: false});
    Alert.alert('User data updated!!');
  }

  updateDisplayName = async()=>{
    const userDisplayName = this.state.displayName;
    try {
      let currentUser = Firebase.auth().currentUser;
      this.setState({loading: true});
      await currentUser.updateProfile({
        displayName: userDisplayName
      }).then(()=>{
        this.setState({loading: false});
      });
    } catch (error){
      console.log(error.meesage);
    }
  }

  updateUserData = async()=>{
    const userFirstName = this.state.firstName;
    const userLastName = this.state.lastName;
    const userAddress = this.state.address;
    const userPhoneNumber = this.state.phoneNumber;
    try {
      let userId = Firebase.auth().currentUser.uid;
      this.setState({loading: true});
      await Firebase.firestore().collection('User-Data').doc(userId).update({
        firstName: userFirstName,
        lastName: userLastName,
        address: userAddress,
        phoneNumber: userPhoneNumber
      }).then(()=>{
        this.setState({loading: false});
      });
    } catch (error){
      console.log(error.message);
    }
  }

  discardUpdateUserData = async()=>{
    try {
      let currentUser = Firebase.auth().currentUser;
      let userId = Firebase.auth().currentUser.uid;
      this.setState({loading: true});
      const userDisplayName = currentUser.displayName;
      this.setState({displayName: userDisplayName});
      await Firebase.firestore().collection('User-Data').doc(userId).get().then((doc)=>{
        if (doc.exists){
          const data = doc.data();
          const firstName = data.firstName;
          const lastName = data.lastName;
          const address = data.address;
          const phoneNumber = data.phoneNumber;
          this.setState({firstName, lastName, address, phoneNumber, loading: false});
        } else {
          // Nothing Happen!!
        }
      });
    } catch (error){
      console.log(error.message);
    }
  }

  reAuthenticate = async()=>{
    const currentPassword = this.state.currentPassword;
    try {
      let currentUser = Firebase.auth().currentUser;
      let currentEmail = currentUser.email;
      let credential = fb.auth.EmailAuthProvider.credential(currentEmail, currentPassword);
      currentUser.reauthenticateWithCredential(credential).catch((error)=>{
        console.log(error.message);
      });
    } catch (error){
      console.log(error.message);
    }
  }

  deleteAccount = async()=>{
    const currentPassword = this.state.currentPassword;
    try {
      this.setState({deleteLoading: true});
      this.reAuthenticate(currentPassword).then(()=>{
        let currentUser = Firebase.auth().currentUser;
        currentUser.delete().then(()=>{
          this.setState({deleteLoading: false});
        });
      }).catch((error)=>{
        const errorCode = error.code;
        if (errorCode === 'auth/requires-recent-login'){
          this.setState({deleteLoading: false});
          console.log(error.message);
        } else {
          // Nothing Happen!!
        }
      });
    } catch (error){
      this.setState({deleteLoading: false});
      console.log(error.message);
    }
  }

  signOut = async()=>{
    try {
      this.setState({logoutLoading: true});
      await Firebase.auth().signOut().then(()=>{
        this.setState({logoutLoading: false});
        Actions.login();
      });
    } catch (error){
      console.log(error.message);
    }
  }

  loadingFont = async()=>{
    try {
      await Font.loadAsync({
        'opun-regular': require('../../../assets/fonts/Opun-Regular.ttf')
      });
      this.setState({fontLoaded: true});
    } catch (error){
      console.log(error.message);
    }
  }

  render(){
    const userEmail = this.state.email;
    const userDisplayName = this.state.displayName;
    const userFirstName = this.state.firstName;
    const userLastName = this.state.lastName;
    const userAddress = this.state.address;
    const userPhoneNumber = this.state.phoneNumber;
    const userId = this.state.uid;
    const userCurrentPassword = this.state.currentPassword;
    const isEditLoading = this.state.editLoading;
    const isDiscardLoading = this.state.discardLoading;
    const isDeleteLoading = this.state.deleteLoading;
    const isLogoutLoading = this.state.logoutLoading;
    const isFontLoaded = this.state.fontLoaded;

    return(
      <ScrollView>
        {isFontLoaded ? <KeyboardAvoidingView behavior='height' enabled={true} style={styles.container}>
          <Text style={[styles.headerGeneralData, styles.opunRegular, {fontSize: 22}]}>{I18n.t('generalData')}</Text>
          <View style={styles.accountForm}>
            <TextInput
              disabled={true}
              label={I18n.t('id')}
              mode='outlined'
              style={[styles.spaceBetween, styles.idText]}
              value={userId}
            />
          </View>
          <View style={styles.accountForm}>
            <TextInput
              disabled={true}
              label={I18n.t('email')}
              mode='outlined'
              style={styles.spaceBetween}
              value={userEmail}
            />
          </View>
          <View style={styles.accountForm}>
            <TextInput
              autoCapitalize='none'
              keyboardType='default'
              label={I18n.t('displayName')}
              mode='outlined'
              onChangeText={(displayName)=> this.setState({displayName})}
              placeholder={I18n.t('placeholderDisplayName')}
              style={styles.spaceBetween}
              value={userDisplayName}
            />
          </View>
          <View style={styles.rowTextInput}>
            <View style={styles.halfTextInput}>
              <TextInput
                autoCapitalize='none'
                keyboardType='default'
                label={I18n.t('firstName')}
                mode='outlined'
                onChangeText={(firstName)=> this.setState({firstName})}
                placeholder={I18n.t('placeholderFirstName')}
                style={styles.spaceBetween}
                value={userFirstName}
              />
            </View>
            <View style={styles.halfTextInput}>
              <TextInput
                autoCapitalize='none'
                keyboardType='default'
                label={I18n.t('lastName')}
                mode='outlined'
                onChangeText={(lastName)=> this.setState({lastName})}
                placeholder={I18n.t('placeholderLastName')}
                style={styles.spaceBetween}
                value={userLastName}
              />
            </View>
          </View>
          <View style={styles.accountForm}>
            <TextInput
              autoCapitalize='none'
              keyboardType='default'
              label={I18n.t('address')}
              mode='outlined'
              onChangeText={(address)=> this.setState({address})}
              placeholder={I18n.t('placeholderAddress')}
              style={styles.spaceBetween}
              value={userAddress}
            />
          </View>
          <View style={styles.accountForm}>
            <TextInput
              autoCapitalize='none'
              keyboardType='number-pad'
              label={I18n.t('phoneNumber')}
              maxLength={10}
              mode='outlined'
              onChangeText={(phoneNumber)=> this.setState({phoneNumber})}
              placeholder={I18n.t('placeholderPhoneNumber')}
              style={styles.spaceBetween}
              value={userPhoneNumber}
            />
          </View>
          <View style={styles.rowButton}>
            <Button color={Colors.greenA700} compact={true} dark={true} icon='pencil-outline' loading={isEditLoading} mode='contained'
             onPress={this.editUserData} style={styles.spaceBetween}>
              <Text style={styles.opunRegular}>{I18n.t('button.edit')}</Text>
            </Button>
            <Button color={Colors.redA700} compact={true} dark={true} icon='cancel' mode='contained' loading={isDiscardLoading}
             onPress={this.discardUpdateUserData} style={styles.spaceBetween}>
              <Text style={styles.opunRegular}>{I18n.t('button.discard')}</Text>
            </Button>
          </View>
          <Text style={[styles.headerDeleteUser, styles.opunRegular]}>{I18n.t('button.deleteAccount')}</Text>
          <View style={styles.accountForm}>
            <Text style={[styles.warningDelete, styles.opunRegular]}>{I18n.t('alert.warningDelete')}</Text>
            <TextInput
              autoCapitalize='none'
              keyboardType='visible-password'
              label={I18n.t('currentPassword')}
              mode='outlined'
              onChangeText={(currentPassword)=> this.setState({currentPassword})}
              placeholder={I18n.t('placeholderCurrentPassword')}
              style={styles.spaceBetween}
              value={userCurrentPassword}
            />
          </View>
          <Button color={Colors.redA700} compact={true} dark={true} icon='account-off' mode='contained' loading={isDeleteLoading}
           onPress={this.deleteAccount} style={styles.deleteUser}>
            <Text style={styles.opunRegular}>{I18n.t('button.deleteAccount')}</Text>
          </Button>
          <Button color={Colors.greenA700} compact={true} dark={true} icon='logout' loading={isLogoutLoading} mode='contained'
           onPress={this.signOut} style={styles.spaceBetween}>
            <Text style={styles.opunRegular}>{I18n.t('button.logout')}</Text>
          </Button>
        </KeyboardAvoidingView> : <View style={styles.middleLoading}>
          <ActivityIndicator color={Colors.greenA700} size={50} />
          <Text style={styles.loadingText}>{I18n.t('loading')}</Text>
        </View>}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  accountForm: {
    width: '80%'
  },
  container: {
    alignItems: 'center',
    backgroundColor: Colors.grey100,
    flex: 1,
    justifyContent: 'center'
  },
  deleteUser: {
    marginBottom: 10,
    marginTop: 10,
    width: 250
  },
  halfTextInput: {
    width: '40%'
  },
  headerDeleteUser: {
    marginTop: 20
  },
  headerGeneralData: {
    marginTop: 25
  },
  idText: {
    fontSize: 15
  },
  loadingText: {
    color: Colors.greenA700,
    fontSize: 18,
    marginTop: 10
  },
  middleLoading: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  opunRegular: {
    fontFamily: 'opun-regular'
  },
  rowButton: {
    flexDirection: 'row'
  },
  rowTextInput: {
    flexDirection: 'row'
  },
  spaceBetween: {
    margin: 5
  },
  warningDelete: {
    color: Colors.redA700,
    fontSize: 14
  }
});

export default Account;

AppRegistry.registerComponent('Account', ()=> Account);