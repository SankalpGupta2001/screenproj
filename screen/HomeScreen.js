import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, TextInput, Dimensions } from 'react-native';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { addToCart } from '../redux/actions/cart';
import { addToFavorites } from '../redux/actions/favorite';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();



  const { width } = Dimensions.get('window');


  const isMobile = width < 768; 

  useEffect(() => {
    fetchData();


  }, []);


  const fetchData = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products');
      setProducts(response.data.products);
      setFilteredProducts(response.data.products); 
 
      setLoading(false);


    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data. Please try again.');
      setLoading(false);
    }
  };

  const [filteredProducts, setFilteredProducts] = useState([]);


  const handleSearch = () => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(lowerCaseQuery) ||
        product.description.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };


  const handleToCart = (product) => {
    dispatch(addToCart(product));
 

  }

  const handleToFavourite = (product) => {
    dispatch(addToFavorites(product))
  }




  const Product = ({ product }) => (
    <View style={styles.productContainer}>
    <TouchableOpacity
    
    onPress={() => navigation.navigate('ProductDetails', { product })}
  >
    <Image source={{ uri: product.thumbnail }} style={styles.productImage} />
  </TouchableOpacity>

    <View style={styles.productInfo}>
      <Text style={styles.productName}>{product.title}</Text>
      <Text style={styles.productDesc}>{product.description}</Text>
      <Text style={styles.priceText}>${product.price} price</Text>
    </View>

    
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
  <TouchableOpacity
    style={{
      backgroundColor: 'green',
      padding: 6,
      paddingTop: 0,
      borderRadius: 10,
      width: isMobile ? '40%' : '20%',
      marginLeft: isMobile ? 10 : 20,

      left: 0
    }}
    onPress={() => handleToCart(product)}
  >
    <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: isMobile ? 10 : 14 }}>
      Add To Cart
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    onPress={() => handleToFavourite(product)}
    style={{
      backgroundColor: 'green',
      padding: 0,
      borderRadius: 10,
      width: isMobile ? '40%' : '35%',
      marginRight: isMobile ? 10 : 20,
    }}
  >
    <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: isMobile ? 10 : 16 }}>
      Add To Favorites
    </Text>
  </TouchableOpacity>
</View>
</View>
  );








  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 2; 
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

 
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };




  const paginatedProducts = filteredProducts && filteredProducts.length > 0
    ? filteredProducts.slice(
      (currentPage - 1) * productsPerPage,
      currentPage * productsPerPage
    )
    : [];


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container}>
        
        <View style={[styles.navbar,{flexWrap:isMobile ? "wrap-reverse":null}]}>
      
          <View style={styles.searchBarContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search Products"
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
              onSubmitEditing={handleSearch} // Trigger search on submit
    
            />
          </View>

      
              <View style={{flexDirection:'row',marginLeft:isMobile && 180}}>
          <TouchableOpacity
            style={[styles.squareButton,{
              marginRight:10}]}
            onPress={() => navigation.navigate('CartItems')}
          >
            <Text style={{ fontSize: 28 }}>🛒</Text>
          </TouchableOpacity>

          
          <TouchableOpacity
            style={styles.squareButton}
            onPress={() => navigation.navigate('FavouiriteItems')}
          >
            <Text style={{ fontSize: 28 }}>✉</Text>
          </TouchableOpacity>
          </View>
      
        </View>  


        <Text style={styles.heading}>Recommended Products</Text>
        {loading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <View>
            <View style={styles.productRow}>
              <View style={styles.productRow}>
                {paginatedProducts.map((product) => (
                  <Product key={product.id} product={product} />
                ))}
              </View>

            </View>
            <View style={styles.paginationContainer}>
              <TouchableOpacity
                onPress={handlePrevPage}
                style={[styles.paginationButton, { opacity: currentPage === 1 ? 0.5 : 1 }]}
                disabled={currentPage === 1}
              >
                <Text style={styles.paginationButtonText}>Previous</Text>
              </TouchableOpacity>
              <Text style={styles.currentPageText}>Page {currentPage}</Text>
              <TouchableOpacity
                onPress={handleNextPage}
                style={[
                  styles.paginationButton,
                  { opacity: currentPage === totalPages ? 0.5 : 1 },
                ]}
                disabled={currentPage === totalPages}
              >
                <Text style={styles.paginationButtonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const { width, height } = Dimensions.get('window');
const productContainerWidth = width >= 600 ? 500 : width * 0.85;
const productContainerHeight = width >= 600 ? 500 : 350;

const searchBarWidth = width >= 600 ? '50%' : '100%';
const searchBarMargin = width >= 600 ? 'auto' : 0;



const isMobile = width < 768;
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  navbar: {
    marginBottom: 60,
    flexDirection:"row"

  },

  searchBarContainer: {
    width: searchBarWidth,
    margin: searchBarMargin,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },

  searchInput: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  squareButton: {
    backgroundColor: 'lightgrey',
    padding: 2,
    borderRadius: 20,
    width: 50,
    alignItems: "center",
    

  },

  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
  },
  paginationButton: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  paginationButtonText: {
    color: 'white',
  },
  currentPageText: {
    fontSize: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  productRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productContainer: {
    width: productContainerWidth,
    height: productContainerHeight,
    marginRight: width >= 600 ? 160 : 0,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: width >= 600 ? 250 : 150,
    marginBottom: width >= 600 ? 50 : 10,
  },
  productInfo: {
    padding: 10,
    marginBottom: 10
  },
  productName: {
    fontSize: width >= 600 ? 20 : 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productDesc: {
    fontSize: width >= 600 ? 16 : 12,
    marginBottom: 5,
  },
  priceText: {
    fontSize: width >= 600 ? 18 : 16,
    fontWeight: 'bold',
    color: 'black',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginTop: 10,
  },
});


export default HomeScreen;
