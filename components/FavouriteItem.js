import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import Modal from 'react-native-modal';
import { addToCart } from '../redux/actions/cart';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const toggleContainer = () => {
    setModalVisible(!isModalVisible);
  };





  

  const handleaddToCart = () => {
    dispatch(addToCart(item));

  };

  const { width } = Dimensions.get('window');
  const isPhone = width < 600;

  return (
    <View style={isPhone ? styles.containerPhone : styles.containerLaptop}>
      <View style={isPhone ? styles.imageContainerPhone : styles.imageContainerLaptop}>
        <Image source={{ uri: item.thumbnail }} style={isPhone ? styles.imagePhone : styles.imageLaptop} />
      </View>
      <View style={isPhone ? styles.detailsContainerPhone : styles.detailsContainerLaptop}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price} price</Text>
        {!isPhone &&       <Text style={styles.description}>{item.description}</Text>}
        
      </View>
      <View style={styles.space} />
      

      <View style={styles.removeButtonContainer}>
        <TouchableOpacity onPress={handleaddToCart} style={styles.removeButton}>
          <Text style={styles.removeButtonText}>addToCart</Text>
        </TouchableOpacity>
        <Modal isVisible={isModalVisible}>
          <View style={styles.modalContainer}>
            <Text>This is a pop-up message!</Text>
            <TouchableOpacity onPress={toggleContainer}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Laptop styles
  containerLaptop: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: "80%",
    

  },
  imageContainerLaptop: {
    marginRight: 20,
  },
  imageLaptop: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  detailsContainerLaptop: {
    flex: 1,
    marginRight: 10,
  },

  // Phone styles
  containerPhone: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: "100%",
    marginBottom:10
  },
  imageContainerPhone: {
        marginBottom: 10,
        marginRight:10,
  },
  imagePhone: {
    
    width: 60,
    height: 60,
    resizeMode: 'cover',
  },
  detailsContainerPhone: {
    flex: 1,
    marginRight:5
  },

  // Common styles
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    marginTop: 5,
    fontSize: 14,
  },
  description: {
    marginTop: 5,
    fontSize: 12,
    color: '#555',
  },
  space: {
    height: 15,
  },
 
  removeButtonContainer: {
    // marginLeft: 10,
  },
  removeButtonText: {
    color: 'red',
  },
  removeButton: {
    backgroundColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight:20
  },
  quantityButton: {
    backgroundColor: '#ccc',
    padding: 8,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 16,
  },

});

export default CartItem;
