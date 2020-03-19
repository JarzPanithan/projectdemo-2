import React, { Component } from 'react';
import { AppRegistry, Image, StyleSheet, Text, View } from 'react-native';
import { Button, Colors } from 'react-native-paper';
import I18n from '../../utils/i18n/I18n';
import * as Font from 'expo-font';

class Detail extends Component {
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
        'OpunRegular': require('../../assets/fonts/Opun-Regular.ttf')
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
        <Image
          style={[styles.gameImage, styles.gameImageBorder]}
          source={{uri: this.props.gameImage}}
        />
        <Text style={[styles.headerGameName, styles.opunRegular]}>{this.props.gameName}</Text>
        <View style={styles.row}>
          <Text style={[styles.opunRegular, styles.releaseGame, styles.margin]}>{this.props.gameRelease}</Text>
          <Text style={[styles.opunRegular, styles.publisherGame, styles.margin]}>{this.props.gamePublisher}</Text>
        </View>
        <View style={styles.flex}>
          <View style={styles.row}>
            {this.props.gameRate !== '' ? <View style={styles.discountTag}>
              <Text style={styles.discountText}>{this.props.gameRate}</Text>
            </View> : null}
            {this.props.gameDiscount !== '' ? <View style={styles.justify}>
              <Text style={[styles.opunRegular, styles.originalPrice]}>฿{this.props.gamePrice}</Text>
            </View> : <View style={styles.justify}>
              <Text style={[styles.opunRegular, styles.priceGame]}>฿{this.props.gamePrice}</Text>
            </View>}
            {this.props.gameDiscount !== '' ? <View style={styles.justify}>
              <Text style={[styles.opunRegular, styles.discountPrice]}>฿{this.props.gameDiscount}</Text>
            </View> : null}
            <Button compact={true} color={Colors.greenA700} dark={true} icon='cart' mode='contained' onPress={()=> alert('Add to cart')}>
              {I18n.t('button.buy')}
            </Button>
          </View>
          <View style={styles.marginBottom} />
          <View style={styles.descArea}>
            <Text style={styles.descText}>{this.props.gameDesc}</Text>
          </View>
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
    justifyContent: 'flex-start'
  },
  discountPrice: {
    color: Colors.greenA700,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right'
  },
  descArea: {
    backgroundColor: Colors.grey900,
    justifyContent: 'center'
  },
  descText: {
    color: Colors.white,
    fontFamily: 'OpunRegular',
    fontSize: 12
  },
  discountTag: {
    backgroundColor: Colors.redA700,
    borderColor: Colors.redA700,
    borderRadius: 2,
    borderWidth: 1,
    padding: 5
  },
  discountText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold'
  },
  flex: {
    flex: 1,
    alignItems: 'center'
  },
  gameImage: {
    height: 180,
    marginTop: 24,
    width: 360
  },
  gameImageBorder: {
    borderColor: Colors.grey900,
    borderRadius: 1,
    borderWidth: 1
  },
  headerGameName: {
    fontSize: 20
  },
  justify: {
    justifyContent: 'center',
    margin: 5
  },
  margin: {
    margin: 6
  },
  marginBottom: {
    marginBottom: 15
  },
  opunRegular: {
    fontFamily: 'OpunRegular'
  },
  originalPrice: {
    color: Colors.redA700,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid'
  },
  publisherGame: {
    fontSize: 10,
    textAlign: 'right'
  },
  releaseGame: {
    fontSize: 10,
  },
  priceGame: {
    color: Colors.greenA700,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right'
  },
  row: {
    flexDirection: 'row'
  }
});

export default Detail;

AppRegistry.registerComponent('Detail', ()=> Detail);