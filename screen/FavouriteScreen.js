import React from 'react';
import { View, FlatList, StyleSheet, Dimensions ,Text} from 'react-native';
import { useSelector } from 'react-redux';
import FavoriteItem from '../components/FavouriteItem';
import { ScrollView } from 'react-native-virtualized-view';

const FavoritesScreen = () => {
  const favoriteItems = useSelector((state) => state.favorite.favoriteItems);
  const { width } = Dimensions.get('window');
  const isPhone = width < 600;

  return (
    <ScrollView>
      <View>

      {favoriteItems.length === 0 && 
          <Text style={styles.emptyCartMessage}>No items in the FavouiriteScreen. Add items to your FavouiriteScreen!</Text>
      }
        {isPhone ? (
          <>
            <View style={styles.maincontainer}>

              <View style={styles.container}>
                <FlatList
                  data={favoriteItems}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => <FavoriteItem item={item} />}
                />
              </View>
            </View>
          </>
        ) : (
          <>
            <View style={styles.maincontainer}>
              <View style={styles.container}>
                <FlatList
                  data={favoriteItems}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => <FavoriteItem item={item} />}
                />
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
    width: isPhone ? '100%' : '70%',
  },
  maincontainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default FavoritesScreen;
