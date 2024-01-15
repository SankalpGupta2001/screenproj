import React, { useState } from 'react';
import { View, Text, Image, Dimensions, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromFavorites, addToFavorites } from '../redux/actions/favorite';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import StarRating from '../components/StarRating';
import { updateQty, addToCart } from '../redux/actions/cart';



const ProductDetailScreen = ({ route, navigation }) => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const { product } = route.params;
    const [qty, setQty] = useState(10);

    const favoriteItems = useSelector((state) => state.favorite.favoriteItems);
    const isProductInFavorites = favoriteItems.some((item) => item.id === product.id);

    const dispatch = useDispatch();

    const handleFavoritesToggle = () => {
        if (isProductInFavorites) {
            dispatch(removeFromFavorites(product.id));
        } else {
            dispatch(addToFavorites(product));
            navigation.navigate("FavouiriteItems")
        }
    };

    const addToCartHandler = () => {
        dispatch(addToCart(product));
        navigation.navigate('CartItems');
    };

const { width } = Dimensions.get('window');


const isMobile = width < 768; // Assuming 768 is your breakpoint for mobile view


    return (
        <ScrollView style={{ padding: 10, backgroundColor: 'white' }}>
  <TouchableOpacity onPress={() => navigation.goBack()} style={{ backgroundColor: 'lightgrey', padding: 10, borderRadius: 5, marginBottom: 20 ,width:90}}>
    <Text style={{ fontWeight: 'bold' }}>  
Go Back</Text>
  </TouchableOpacity>


  <View style={{backgroundColor: '#F4F4F4',width:"100%",marginBottom:10}}>

  <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center',marginBottom:20 }}>{product.title}</Text>

  <View style={{ flexDirection: 'row', alignItems: 'center',marginLeft:isMobile?100:390,marginBottom:10}}>
  <StarRating value={product.rating} color="gold" text={`(${product.rating})`} />
  </View>
  </View>

  <View style={{ backgroundColor: 'white', borderRadius: 15, overflow: 'hidden', borderColor: '#ddd', borderWidth: 2, width: isMobile?350: 450,height:isMobile?500:550, alignSelf: 'center', marginBottom: 20 }}>
  <SwiperFlatList
    autoplay
    autoplayDelay={2}
    autoplayLoop
    index={2}
    showPagination
    paginationDefaultColor={'rgba(0,0,0,0.5)'}
    paginationActiveColor={'black'}
    paginationStyleItem={{ width: 8, height: 8, marginHorizontal: 4 }}
    data={product.images}
    renderItem={({ item }) => (
      <View style={{ width:isMobile?340:450,height:isMobile?450:450, borderRadius: 15, overflow: 'hidden' }}>
        <Image source={{ uri: item }} style={{ flex: 1, width: isMobile?340:450, height:isMobile?300: 400, borderTopLeftRadius: 15, borderTopRightRadius: 15 }} resizeMode="cover" />
      </View>
    )}
  />
</View>




  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center',marginLeft:isMobile?30:220}}>
          <Text style={{ fontSize: isMobile ? 20 : 20, fontWeight: 'bold', marginRight: 10, color: 'blue', borderRadius: 20, width: isMobile ? 120 : 120, marginLeft: isMobile ? 5 : 40, padding: 2 }}>${product.price}/piece</Text>
          <Text style={{ fontSize: isMobile ? 14 : 20,color:"white", fontWeight: 'bold', backgroundColor: 'blue', borderRadius: 20, width: isMobile ? 90 : 120, padding: 4 }}>{product.discountPercentage}% OFF</Text>
        </View>

        {/* {product.stock > 0 ? (
          <View style={{ backgroundColor: 'green', padding: 5, borderRadius: 5, width: isMobile ? 60 : 70, alignItems: 'center' }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>In Stock</Text>
          </View>
        ) : (
          <View style={{ backgroundColor: 'red', padding: 5, borderRadius: 5, width: isMobile ? 80 : 100, alignItems: 'center' }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Out of Stock</Text>
          </View>
        )} */}
      </View>
  





  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 ,marginBottom:20}}>
    <TouchableOpacity
      style={{ backgroundColor: 'green', padding: 10, borderRadius: 10, width: isMobile ? "40%"  : "20%" ,marginLeft:isMobile?10:100}}
      onPress={addToCartHandler}
    >
      <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' ,fontSize : isMobile ? 10 : 20,}}>Add To Cart</Text>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={handleFavoritesToggle}
      style={{ backgroundColor: 'green', padding: 10, borderRadius: 10, width : isMobile ? "40%" : "20%",marginRight:isMobile?10:100}}
    >
      <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold',fontSize : isMobile ? 10 : 20, }}>
        {isProductInFavorites ? 'Remove from Favorites' : 'Add to Favorites'}
      </Text>
    </TouchableOpacity>
  </View>



  <View style={{backgroundColor: '#F4F4F4',width:"100%"}}>
  <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', marginTop: 20 }}>
  <View style={{ width: isMobile?"100%":"70%", backgroundColor: '#F4F4F4', borderRadius: 10, padding: 20 }}>
    <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Product Details</Text>
    <Text style={{ fontSize: 16 }}>Description: {product.description}</Text>
    {/* Other details go here */}
  </View>
</View>
</View>

</ScrollView>


  );
};

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  goBackButton: {
    backgroundColor: 'lightgrey',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  cardHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
  },
  goBackText: {
    fontWeight: 'bold',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  totalAmount: {
    fontSize: 24,
    color: 'green',
    fontWeight: 'bold',
  },
  carouselContainer: {
    backgroundColor: 'white',
    borderRadius: '100%',
    overflow: 'hidden',
    borderColor: 'black',
    marginRight: 10,
    width: '60%',
    height: 500,
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  carouselImageContainer: {
    width,
    height: 0.3 * width,
  },
  carouselImage: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  productDetailsContainer: {
    flexDirection: 'row',
  },
  detailsContainer: {
    height: 0.3 * width,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginLeft: 10,
    padding: 15,
    width: '40%',
    marginRight: '5%',
  },
  summaryContainer: {
    height: 0.3 * width,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    width: '40%',
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cardBody: {},
  cardText: {
    fontSize: 16,
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addToFavoritesButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    width: '40%',
  },
  addToCartButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    width: '40%',
  },
});

export default ProductDetailScreen;














            {/* <View style={styles.productDetailsContainer}>
        <View style={styles.detailsContainer}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Product Details</Text>
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.productName}>{product.title}</Text>
            <Text style={styles.description}>Category: {product.category}</Text>
            <Text style={styles.description} numberOfLines={5}>
              Description: {product.description}
            </Text>
            <Text style={styles.description}>Reviews: {product.rating}</Text>
            <StarRating value={product.rating} color="gold" text={`(${product.rating})`} />
          </View>
          <TouchableOpacity
            onPress={handleFavoritesToggle}
            style={{ backgroundColor: 'rgba(10, 0, 0, 0.1)', padding: 10, borderRadius: 10 }}
          >
            <Text style={styles.buttonText}>
              {isProductInFavorites ? 'Remove from Favorites' : 'Add to Favorites'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.summaryContainer}>
          <View style={styles.cardheader}>
            <Text>Summary</Text>
          </View>
          <Text style={styles.description}>{product.title}</Text>
          <Text style={styles.description}>Brand: {product.brand}</Text>
          <Text style={styles.description}>Price: {product.price}</Text>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            {product.stock > 0 ? (
              <>
                <Text style={{ ...styles.cardText, color: 'grey' }}>Status: In Stock</Text>
                <View style={{ ...styles.qtyContainer, height: 100, alignItems: 'center', justifyContent: 'center' }}>
                  <Picker
                    selectedValue={cartItems.find((item) => item.id === product.id)?.qty || 1}
                    onValueChange={(value) => handleQuantityChange(value)}
                    style={{ padding: 5, width: 200, alignItems: 'center', justifyContent: 'center' }}
                  >
                    {[...Array(10).keys()].map((x) => (
                      <Picker.Item key={x + 1} label={`${x + 1}`} value={x + 1} />
                    ))}
                  </Picker>
                </View>
                
              </>
            ) : (
              <Text style={styles.cardText}>Status: Out Of Stock</Text>
            )}
          </View>
        </View>
      </View> */}

