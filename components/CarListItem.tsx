import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

export type ICarListItemProps = { 
    name: string;
    price: string;
    color: string;
    pic: string;
    model: string;
    year: string;
};

const CarListItem = ({ name, price, color, pic, model, year }: ICarListItemProps) => (
  <View style={styles.item}>
    <View>
        <Image source={{uri: pic }} style={{width: '100%'}} />
        <View><Text>{name}</Text></View>
    </View>
    <View style={styles.bottom}>
      <View style={styles.line}>
          <Text style={styles.label}>品牌：</Text>
          <Text style={styles.title}>{model}</Text>
      </View>
      <View style={styles.line}>
          <Text style={styles.label}>年份：</Text>
          <Text style={styles.title}>{year}</Text>
      </View>
      <View style={styles.line}>
          <Text style={styles.label}>颜色：</Text>
          <Text style={styles.title}>{color}</Text>
      </View>
      <View style={styles.line}>
          <Text style={styles.label}>价格：</Text>
          <Text style={styles.title}>{price}</Text>
      </View>
    </View>
    
  </View>
);

const styles = StyleSheet.create({
    item: {
      backgroundColor: '#f9c2ff',
      marginVertical: 4,
      
      width: '100%'
      // marginHorizontal: 16,
    },
    title: {
      fontSize: 12,
      fontWeight: "700",
      textAlign: 'right',
      flex: 1,
    },
    label: {
      color: '#45587A',
      fontSize: 12,
      flex: 1,
    },
    line: {
      display: 'flex',
      flexDirection: 'row'
    },
    bottom: {
      padding: 10,
    }
});
export default CarListItem;