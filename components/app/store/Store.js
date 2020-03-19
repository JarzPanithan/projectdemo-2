import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Button, Card, Colors, Searchbar } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';
import I18n from '../../../utils/i18n/I18n';
import Firebase from '../../../configs/Firebase';
import * as Font from 'expo-font';

class Store extends Component {
  constructor(props){
    super(props);
    this.state = {
      allGames: [],
      searchGames: '',
      loading: false,
      refreshing: false,
      fontLoaded: false
    }
    this.showItem = 5;
    this.holderArray = [];
    this.getAllGames = this.getAllGames.bind(this);
    this.sortByName = this.sortByName.bind(this);
    this.sortByPrice = this.sortByPrice.bind(this);
    // this.handleLoadMore = this.handleLoadMore.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.searchFilterFunction = this.searchFilterFunction.bind(this);
  }

  componentDidMount = ()=>{
    this.getAllGames();
    this.loadingFont();
  }

  getAllGames = async()=>{
    try {
      this.setState({loading: true});
      let dataRef = Firebase.firestore().collection('Store-Games/Games/Games').limit(this.showItem);
      // let dataRef = Firebase.firestore().collection('Store-Games/Games/Games');
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
            allGames: gameList,
            loading: false
          });
          this.holderArray = gameList;
        });
      }).catch((error)=>{
        this.setState({loading: false});
        console.log(error.message);
      });
    } catch (error){
      this.setState({loading: false});
      console.log(error.message);
    }
  }

  sortByName = async()=>{
    try {
      this.setState({loading: true});
      let dataRef = Firebase.firestore().collection('Store-Games/Games/Games').orderBy('name');
      dataRef.get().then((snapshot)=>{
        const gameList = [];
        snapshot.forEach((doc)=>{
          let data = doc.data();
          const gameId = data.id;
          const gameImage = data.image;
          const gameName = data.name;
          const gamePrice = data.price;
          const gameDesc = data.description;
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
            allGames: gameList,
            loading: false
          });
          this.holderArray = gameList;
        });
      });
    } catch (error){
      console.log(error.message);
    }
  }

  sortByPrice = async()=>{
    try {
      this.setState({loading: true});
      let dataRef = Firebase.firestore().collection('Store-Games/Games/Games').orderBy('price');
      dataRef.get().then((snapshot)=>{
        const gameList = [];
        snapshot.forEach((doc)=>{
          let data = doc.data();
          const gameId = data.id;
          const gameImage = data.image;
          const gameName = data.name;
          const gamePrice = data.price;
          const gameDesc = data.description;
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
            allGames: gameList,
            loading: false
          });
          this.holderArray = gameList;
        });
      });
    } catch (error){
      console.log(error.message);
    }
  }

  onRefresh = async()=>{
    try {
      this.setState({refreshing: true});
      this.getAllGames().then(()=>{
        this.setState({refreshing: false});
      });
    } catch (error){
      this.setState({refreshing: false});
      console.log(error.message);
    }
  }

  // handleLoadMore = ()=>{
  //   const isLoading = this.state.loading;
  //   if (!isLoading){
  //     this.showItem = this.showItem + 10;
  //     this.getAllGames(this.showItem);
  //   }
  // }

  // renderSearchGames = ()=>{
  //   const search = this.state.searchGames;

  //   return(
  //     <View style={styles.searchArea}>
  //       <Searchbar
  //         autoCapitalize='none'
  //         autoCorrect={false}
  //         onChangeText={(text) => this.searchFilterFunction(text)}
  //         placeholder={I18n.t('placeholderSearchGame')}
  //         style={styles.searchBar}
  //         value={search}
  //       />
  //       <View style={styles.marginTop} />
  //     </View>
  //   );
  // }

  renderSeperators = ()=>{
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: Colors.grey900
        }}
      />
    );
  }

  // renderFooter = ()=>{
  //   const isLoading = this.state.loading;
  //   if (!isLoading){
  //     return(
  //       <View style={styles.marginTop}>
  //         <ActivityIndicator color={Colors.greenA700} size={40} />
  //       </View>
  //     );
  //   }
  // }

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

  searchFilterFunction = (text)=>{
    const newData = this.holderArray.filter((item)=> {
      const itemData = `${item.name.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      allGames: newData,
      searchGames: text
    });
  }

  render(){
    const games = this.state.allGames;
    const search = this.state.searchGames;
    const isLoading = this.state.loading;
    const isRefreshing = this.state.refreshing;
    const isFontLoaded = this.state.fontLoaded;

    return(
      <View style={styles.container}>
        {isLoading === true && isFontLoaded ? <View style={styles.middleLoading}>
          <ActivityIndicator color={Colors.greenA700} size={50} />
          <Text style={styles.loadingText}>{I18n.t('loading')}</Text>
        </View> : <View>
        <View style={styles.searchArea}>
          <View style={styles.marginTop} />
          <Searchbar
            onChangeText={(text) => this.searchFilterFunction(text)}
            placeholder={I18n.t('placeholderSearchGame')}
            style={styles.searchBar}
            value={search}
          />
          <View style={styles.marginTop} />
        </View>
        <View style={[styles.row, styles.marginBottom, styles.justifyContent]}>
          <Text style={styles.sort}>{I18n.t('sortBy')}</Text>
            <Button compact={true} color={Colors.greenA700} dark={true} mode='outlined' onPress={this.sortByName}>
              {I18n.t('button.sortAlphabet')}
            </Button>
            <Button compact={true} color={Colors.greenA700} dark={true} mode='outlined' onPress={this.sortByPrice}>
              {I18n.t('button.sortPrice')}
            </Button>
            {/* <Button compact={true} color={Colors.greenA700} dark={true} mode='outlined' onPress={()=> alert('Sort by Release Date')}>
              {I18n.t('button.sortRelease')}
            </Button> */}
        </View>
        <FlatList
          data={games}
          extraData={this.state}
          initialNumToRender={10}
          ItemSeparatorComponent={this.renderSeperators}
          keyExtractor={(item, index)=> index.toString()}
          maxToRenderPerBatch={15}
          // ListFooterComponent={this.renderFooter}
          // ListHeaderComponent={this.renderSearchGames}
          legacyImplementation={true}
          onEndReachedThreshold={0.4}
          // onEndReached={this.handleLoadMore}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={this.onRefresh}
            />}
          removeClippedSubviews={true}
          updateCellsBatchingPeriod={70}
          windowSize={30}
          renderItem={({item})=>
          <Card elevation={10} style={styles.cardList}>
            <TouchableOpacity onPress={()=> Actions.game({gameName: item.name, gameImage: item.img, gameDesc: item.desc, gamePrice: item.price,
             gameDiscount: item.discount, gameRate: item.rate, gameRelease: item.release, gamePublisher: item.publisher})}>
              <Card.Cover source={{uri: item.img}} style={styles.imageGame} />
            </TouchableOpacity>
            <Card.Content>
              <View>
                {item.name.length <= 25 ? <Text style={[styles.opunRegular, styles.titleGame]}>{item.name}</Text> :
                <Text style={[styles.opunRegular, styles.smallTitleGame]}>{item.name}</Text>}
                <View style={styles.row}>
                  <Text style={[styles.opunRegular, styles.releaseGame]}>{item.release}</Text>
                  <Text style={[styles.opunRegular, styles.publisherGame, styles.flex]}>{item.publisher}</Text>
                </View>
                <View style={styles.row}>
                  {item.rate !== '' ? <View style={styles.discountTag}>
                    <Text style={styles.discountText}>{item.rate}</Text>
                  </View> : null}
                  {item.discount !== '' ? <View style={styles.flex}>
                    <Text style={[styles.opunRegular, styles.originalPrice]}>฿{item.price}</Text>
                  </View> :
                  <View style={styles.flex}>
                    <Text style={[styles.opunRegular, styles.priceGame]}>฿{item.price}</Text>
                  </View>}
                  {item.discount !== '' ? <View style={styles.flex}>
                    <Text style={[styles.opunRegular, styles.discountPrice]}>฿{item.discount}</Text>
                  </View> : null}
                </View>
              </View>
            </Card.Content>
          </Card>}
        />
        </View>}
      </View>
    );
  }
}

export default Store;

const styles = StyleSheet.create({
  cardList: {
    padding: 10
  },
  column: {
    flexDirection: 'column'
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  discountPrice: {
    color: Colors.greenA700,
    fontSize: 18,
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
  imageGame: {
    width: 340
  },
  justifyContent: {
    justifyContent: 'center'
  },
  marginBottom: {
    marginBottom: 8
  },
  marginTop: {
    marginTop: 10
  },
  middleLoading: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadingText: {
    color: Colors.greenA700,
    fontSize: 18,
    marginTop: 10
  },
  priceGame: {
    color: Colors.greenA700,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right'
  },
  originalPrice: {
    color: Colors.redA700,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid'
  },
  opunRegular: {
    fontFamily: 'OpunRegular'
  },
  publisherGame: {
    fontSize: 10,
    textAlign: 'right'
  },
  releaseGame: {
    fontSize: 10,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  searchArea: {
    alignItems: 'center',
  },
  searchBar: {
    marginTop: 30,
    width: '90%'
  },
  smallTitleGame: {
    fontSize: 14
  },
  sort: {
    fontSize: 14
  },
  titleGame: {
    fontSize: 16
  }
});

AppRegistry.registerComponent('Store', ()=> Store);