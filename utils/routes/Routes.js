import React, { Component } from 'react';
import { AppRegistry, StyleSheet } from 'react-native';
import { Router, Scene, Stack, Tabs } from 'react-native-router-flux';
import { Colors } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import I18n from '../i18n/I18n';
import Login from '../../components/login/Login';
import Register from '../../components/login/Register';
import Loader from '../../components/login/Loader';
import Forgot from '../../components/login/Forgot';
import Home from '../../components/app/Home';
import Store from '../../components/app/store/Store';
import Detail from '../../components/app/Detail';
import Account from '../../components/app/account/Account';
import Cart from '../../components/app/cart/Cart';

class Routes extends Component {
  render(){
    const HomeIcon = ()=>{
      return(
        <FontAwesome name='home' color={Colors.white} size={35} />
      );
    }

    const StoreIcon = ()=>{
      return(
        <Entypo name='shop' color={Colors.white} size={35} />
      );
    }

    const CartIcon = ()=>{
      return(
        <FontAwesome5 name='shopping-cart' color={Colors.white} size={35} />
      );
    }
    
    const UserIcon = ()=>{
      return(
        <FontAwesome name='user-circle' color={Colors.white} size={35} />
      );
    }

    return(
      <Router>
        <Stack key='app' hideNavBar={true} navigationBarStyle={styles.customNavBar} titleStyle={styles.customTitle}>
          <Scene key='loader' component={Loader} hideNavBar={true} initial={true} />
          <Scene key='login' component={Login} title={I18n.t('login')} hideNavBar={true} />
          <Scene key='register' component={Register} title={I18n.t('register')} hideNavBar={true} />
          <Scene key='forgot' component={Forgot} title={I18n.t('forgot')} hideNavBar={true} />
          <Stack key='home' hideNavBar={true}>
            <Tabs activeBackgroundColor={Colors.greenA700} activeTintColor={Colors.white} inactiveBackgroundColor={Colors.grey900}
             inactiveTintColor={Colors.white} lazy={true} showLabel={false} swipeEnabled={true}>
              <Scene key='main' component={Home} icon={HomeIcon} title={I18n.t('home')} hideNavBar={true} type='reset' />
              <Scene key='store' component={Store} icon={StoreIcon} hideNavBar={true} />
              <Scene key='cart' component={Cart} icon={CartIcon} hideNavBar={true} />
              <Scene key='account' component={Account} icon={UserIcon} title={I18n.t('account')} hideNavBar={true} />
            </Tabs>
            <Stack key='game'>
              <Scene key='detail' component={Detail} hideNavBar={true} />
            </Stack>
          </Stack>
        </Stack>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  customNavBar: {
    backgroundColor: Colors.greenA700
  },
  customTitle: {
    color: Colors.white
  }
});

export default Routes;

AppRegistry.registerComponent('Routes', ()=> Routes);