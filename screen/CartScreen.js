import React from 'react';
import { View, FlatList, StyleSheet ,Dimensions} from 'react-native';
import { useSelector } from 'react-redux';
import CartItem from '../components/CartItem';
import TotalCard from '../components/TotalCard';
// import { ScrollView } from 'react-native-gesture-handler';
import { ScrollView } from 'react-native-virtualized-view'

const CartScreen = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { width } = Dimensions.get('window');
  const isPhone = width < 600; // You can adjust the breakpoint as needed
  console.log(cartItems,"cart");


  return (
    <ScrollView >
      <View>
    {isPhone ? (
      <>
      
      <View style={styles.maincontainer}>
      <View style={{ width: "100%", height: 200, marginBottom: 20, backgroundColor: '#FFFFFF', borderRadius: 10, borderWidth: 1, borderColor: '#ccc' ,marginBottom:20}}>
          <TotalCard cartItems={cartItems} />
        </View>

      
            <View style={styles.container}>
                <FlatList
                  data={cartItems}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => <CartItem item={item} />}
                />
              </View>


      
        
        
      </View>


      </>
    ) : (
      <>
      <View style={styles.maincontainer}>
      <View style={styles.container}>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <CartItem item={item} />}
          />
        </View>
        <View style={{ width: 300, height: 200, marginRight: 40, marginTop: 20, backgroundColor: '#FFFFFF', borderRadius: 10, borderWidth: 1, borderColor: '#ccc' }}>
          <TotalCard cartItems={cartItems} />
        </View>
      </View>
        
      </>
    )}
    </View>
  </ScrollView>
  


  );
};

const { width } = Dimensions.get('window');
const isPhone = width < 600;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    width: isPhone?"100%":"70%"
    

  },
  maincontainer:{
    flexDirection: 'row', 
    flexWrap:'wrap'
  },
 


});

export default CartScreen;

