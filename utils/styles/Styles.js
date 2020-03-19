import { StyleSheet } from 'react-native';

export const routeStyles = StyleSheet.create({
  customNavBar: {
    backgroundColor: Colors.greenA700
  },
  customTitle: {
    color: Colors.white
  }
});

export const loginStyles = StyleSheet.create({
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
  delete: {
    position: 'absolute',
    top: 30,
    right: 15
  },
  dontAccount: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
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
  spaceBetween: {
    margin: 5
  },
  switchRemember: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  text: {
    color: 'black'
  }
});

export const registerStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.grey100,
    flex: 1,
    justifyContent: 'center'
  },
  headerRegister: {
    fontSize: 24
  },
  registerForm: {
    width: '80%'
  },
  spaceBetween: {
    margin: 5
  }
});

export const forgotStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.grey100,
    flex: 1,
    justifyContent: 'center'
  },
  headerForgot: {
    fontSize: 24
  },
  forgotForm: {
    width: '80%'
  },
  spaceBetween: {
    margin: 5
  }
});

export const loaderStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.grey100,
    flex: 1,
    justifyContent: 'center'
  }
});

export const homeStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  spaceBetween: {
    margin: 5
  }
});

export const accountStyles = StyleSheet.create({
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
    marginTop: 15
  },
  idText: {
    fontSize: 15
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