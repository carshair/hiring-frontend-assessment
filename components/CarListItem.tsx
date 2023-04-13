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

const CarListItem = ({ name, price, color, pic, model, year }: ItemProps) => (
  <View style={styles.item}>
    <View>
        <Image source={{uri: pic }} style={{width: 400, height: 400}} />
        <View><Text>{name}</Text></View>
    </View>
    
    <View>
        <Text style={styles.title}>品牌：</Text>
        <Text style={styles.title}>{model}</Text>
    </View>
    <View>
        <Text style={styles.title}>年份：</Text>
        <Text style={styles.title}>{year}</Text>
    </View>
    <View>
        <Text style={styles.title}>颜色：</Text>
        <Text style={styles.title}>{color}</Text>
    </View>
    <View>
        <Text style={styles.title}>价格：</Text>
        <Text style={styles.title}>{price}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
});
export default CarListItem;