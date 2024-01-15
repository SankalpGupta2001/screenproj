import React from 'react';
import { View, Text } from 'react-native';


const StarRating = ({ value, color, text }) => {
  const renderStars = () => {
    const stars = [];
    const roundedValue = Math.round(value * 2) / 2; // Round to nearest half

    for (let i = 1; i <= 5; i++) {
      const starIcon =
        i <= roundedValue
          ? <Text>⭐</Text>
          : i - 0.5 === roundedValue
          && <Text>⭐</Text>
          
      stars.push(
        <Text key={i} style={{ color }}>
          {starIcon}
        </Text>
      );
    }

    return stars;
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {renderStars()}
      {text && <Text>{text}</Text>}
    </View>
  );
};

export default StarRating;
