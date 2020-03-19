import Firebase from '../configs/Firebase';

export const holderArray = [];

export const getProducts = ()=>{
  let dataRef = Firebase.firestore().collection('Store-Games/Games/Games');
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
    });
    holderArray = gameList;
  });
}

export const getAllProducts = ()=>{
  return holderArray;
}