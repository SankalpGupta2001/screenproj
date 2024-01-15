// components/TotalCard.js
import React ,{useState} from 'react';
import { View, Text, StyleSheet ,TouchableOpacity} from 'react-native';
import { addToFavorites, removeFromFavorites } from '../redux/actions/favorite';
import { useDispatch, useSelector } from 'react-redux';
import { initiatePurchase } from '../redux/actions/cart';


const TotalCard = ({ cartItems }) => {
    console.log(cartItems,"uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu")
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  const dispatch = useDispatch();

  const calculateTotalCost = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = item.price || 0;
      const itemQty = item.qty || 1;
      return total + itemPrice * itemQty;
    }, 0);
  };

  const calculateTotalItems = () => {
    return cartItems.reduce((totalItems, item) => {
      const itemQty = item.qty || 1;
      return totalItems + parseInt(itemQty, 10); // Convert to number
    }, 0);
  

  }

  const handlePurchase = () => {
    dispatch(initiatePurchase(cartItems));
    setPurchaseComplete(true);
    // You can also navigate to a success screen or perform other actions after purchase
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>Summary</Text>
                    </View>
                    <Text style={styles.totalText}>Total Items: {calculateTotalItems()}</Text>
      <Text style={styles.totalAmount}>Total Cost: ${calculateTotalCost().toFixed(2)}</Text>
      {purchaseComplete ? (
        <View style={styles.successMessage}>
          <Text style={styles.successText}>Purchase Successful ✓</Text>
        </View>
      ) : (
        <TouchableOpacity onPress={handlePurchase} style={styles.purchaseButton}>
          <Text style={styles.buttonText}>Purchase</Text>
        </TouchableOpacity>
      )}


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  cardHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
    marginBottom: 10,
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
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  purchaseButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  successMessage: {
    backgroundColor: 'lightgreen',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  successText: {
    color: 'green',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },

});

export default TotalCard;
