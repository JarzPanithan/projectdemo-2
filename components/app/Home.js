import React, { Component } from 'react';
import { AppRegistry, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Card, Colors } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';
import I18n from '../../utils/i18n/I18n';
import Firebase from '../../configs/Firebase';
import * as Font from 'expo-font';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      preorderGames: [],
      discountGames: [],
      preorderLoading: false,
      discountLoading: false,
      fontLoaded: false
    }
    this.getPreOrderGames = this.getPreOrderGames.bind(this);
    this.getDiscountGames = this.getDiscountGames.bind(this);
  }

  componentDidMount = ()=>{
    this.getPreOrderGames();
    this.getDiscountGames();
    this.loadingFont();
  }

  getPreOrderGames = async()=>{
    try {
      this.setState({preorderLoading: true});
      let dataRef = Firebase.firestore().collection('Store-Games/Games/Pre-Order-Games');
      dataRef.get().then((snapshot)=>{
        const gameList = [];
        snapshot.forEach((doc)=>{
          let data = doc.data();
          const gameId = data.id;
          const gameName = data.name;
          const gameImage = data.image;
          const gameDesc = data.description;
          const gamePrice = data.price;
          const gameDiscount = data.discount;
          const gameRate = data.rate;
          const gameRelease = data.release;
          const gamePublisher = data.publisher;
          gameList.push({
            id: gameId,
            name: gameName,
            img: gameImage,
            desc: gameDesc,
            price: gamePrice,
            discount: gameDiscount,
            rate: gameRate,
            release: gameRelease,
            publisher: gamePublisher
          });
          this.setState({
            preorderGames: gameList,
            preorderLoading: false
          });
        });
      }).catch((error)=>{
        this.setState({preorderLoading: false});
        console.log(error.message);
      });
    } catch (error){
      this.setState({preorderLoading: false});
      console.log(error.message);
    }
  }

  getDiscountGames = async()=>{
    try {
      this.setState({discountLoading: true});
      let dataRef = Firebase.firestore().collection('Store-Games/Games/Discount-Games');
      dataRef.get().then((snapshot)=>{
        const gameList = [];
        snapshot.forEach((doc)=>{
          let data = doc.data();
          const gameId = data.id;
          const gameName = data.name;
          const gameImage = data.image;
          const gameDesc = data.description;
          const gamePrice = data.price;
          const gameDiscount = data.discount;
          const gameRate = data.rate;
          const gameRelease = data.release;
          const gamePublisher = data.publisher;
          gameList.push({
            id: gameId,
            name: gameName,
            img: gameImage,
            desc: gameDesc,
            price: gamePrice,
            discount: gameDiscount,
            rate: gameRate,
            release: gameRelease,
            publisher: gamePublisher
          });
          this.setState({
            discountGames: gameList,
            discountLoading: false
          });
        });
      }).catch((error)=>{
        this.setState({discountLoading: false});
        console.log(error.message);
      });
    } catch (error){
      this.setState({discountLoading: false});
      console.log(error.message);
    }
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
    const preorder = this.state.preorderGames;
    const discount = this.state.discountGames;
    const isPreforderLoading = this.state.preorderLoading;
    const isDiscountLoading = this.state.discountLoading;
    const isFontLoaded = this.state.fontLoaded;

    return(
      <ScrollView>
        {isFontLoaded ? <View style={styles.container}>
          <View style={styles.header}>
            <Text style={[styles.headerArticle, styles.opunRegular]}>{I18n.t('preorder')}</Text>
          </View>
          {isPreforderLoading === true ? <View style={styles.middleLoading}>
          <ActivityIndicator color={Colors.greenA700} size={50} />
          <Text style={styles.loadingText}>{I18n.t('loading')}</Text>
          </View> :
          <SafeAreaView>
            <FlatList
              data={preorder}
              horizontal={true}
              keyExtractor={(item, index)=> index.toString()}
              renderItem={({item})=>
              <Card elevation={10} style={styles.cardList}>
                <TouchableOpacity onPress={()=> Actions.game({gameName: item.name, gameImage: item.img, gameDesc: item.desc, gamePrice: item.price,
                 gameDiscount: item.discount, gameRate: item.rate, gameRelease: item.release, gamePublisher: item.publisher})}>
                  <Card.Cover source={{uri: item.img}} style={styles.imageGame} />
                </TouchableOpacity>  
                <Card.Content>
                  <View style={styles.row}>
                    <Text style={[styles.opunRegular, styles.titleGame]}>{item.name}</Text>
                    <View style={styles.flex}>
                      <Text style={[styles.opunRegular, styles.priceGame]}>฿{item.price}</Text>
                    </View>
                  </View>
                </Card.Content>
              </Card>}
            />
          </SafeAreaView>}
          <View style={styles.row}>
            <View style={styles.header} />
            <Text style={[styles.headerArticle, styles.opunRegular]}>{I18n.t('discount')}</Text>
          </View>
          {isDiscountLoading === true ? <View style={styles.middleLoading}>
          <ActivityIndicator color={Colors.greenA700} size={50} />
          <Text style={styles.loadingText}>{I18n.t('loading')}</Text>
          </View> :
          <SafeAreaView>
            <FlatList
              data={discount}
              horizontal={true}
              keyExtractor={(item, index)=> index.toString()}
              renderItem={({item})=>
              <Card elevation={10} style={styles.cardList}>
                <TouchableOpacity onPress={()=> Actions.game({gameName: item.name, gameImage: item.img, gameDesc: item.desc, gamePrice: item.price,
                 gameDiscount: item.discount, gameRate: item.rate, gameRelease: item.release, gamePublisher: item.publisher})}>
                  <Card.Cover source={{uri: item.img}} style={styles.imageGame} />
                </TouchableOpacity>
                <Card.Content>
                  <View style={styles.row}>
                    <Text style={[styles.opunRegular, styles.titleGame]}>{item.name}</Text>
                  </View>
                  <View style={styles.row}>
                    <View style={styles.discountTag}>
                      <Text style={styles.discountText}>{item.rate}</Text>
                    </View>
                    <View style={styles.flex}>
                      <Text style={[styles.opunRegular, styles.originalPrice]}>฿{item.price}</Text>
                    </View>
                    <View style={styles.flex}>
                      <Text style={[styles.opunRegular, styles.discountPrice]}>฿{item.discount}</Text>
                    </View>
                  </View>
                </Card.Content>
              </Card>}
            />
          </SafeAreaView>}
        </View> : null}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  cardList: {
    padding: 10
  },
  container: {
    backgroundColor: Colors.grey100,
    flex: 1,
    justifyContent: 'center'
  },
  discountPrice: {
    color: Colors.greenA700,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right'
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
    fontSize: 16,
    fontWeight: 'bold'
  },
  flex: {
    flex: 1
  },
  header: {
    alignItems: 'flex-start',
    marginTop: 20,
    paddingLeft: 20
  },
  headerArticle: {
    fontSize: 18
  },
  imageGame: {
    width: 340
  },
  loadingText: {
    color: Colors.greenA700,
    fontSize: 18,
    marginTop: 10
  },
  middleLoading: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  moreGameButton: {
    marginLeft: 130
  },
  originalPrice: {
    color: Colors.redA700,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid'
  },
  opunRegular: {
    fontFamily: 'OpunRegular'
  },
  priceGame: {
    color: Colors.greenA700,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right'
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  searchArea: {
    alignItems: 'center'
  },
  searchBar: {
    marginTop: 30,
    width: '90%'
  },
  spaceBetween: {
    margin: 5
  },
  titleGame: {
    fontSize: 16
  }
});

export default Home;

AppRegistry.registerComponent('Home', ()=> Home);