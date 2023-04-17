import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

export type ICarListItemProps = { 
    name: string;
    price: string;
    color: string;
    url: string;
    model: string;
    year: string;
};

const CarListItem = ({ name, price, color, url, model, year }: ICarListItemProps) => {
  const colorObj = {'background': (color || '').toLowerCase()};
  return (<View style={styles.item}>
    <View style={styles.card}>
      <View style={{position: 'relative'}}>
          <Image style={styles.images} source={{uri: url }} />
          <View style={styles.covers}><Text style={styles.coverText}>{name}</Text></View>
      </View>
      <View style={styles.bottom}>
        <View style={styles.line}>
            <Text style={styles.label}>Brand：</Text>
            <Text style={styles.title}>{model}</Text>
        </View>
        <View style={styles.line}>
            <Text style={styles.label}>Year：</Text>
            <Text style={styles.title}>{year}</Text>
        </View>
        <View style={styles.line}>
            <Text style={styles.label}>Color：</Text>
            <Text style={styles.title}>{color}</Text>
            <View style={Object.assign({}, styles.color, colorObj)}></View>
        </View>
        <View style={styles.line}>
            <Text style={styles.label}>Price：</Text>
            <Text style={styles.title}>{price}</Text>
        </View>
      </View>
    </View>
  </View>);
}

const styles = StyleSheet.create({
    item: {
      width: '50%',
      padding: 5
    },
    card: {
      borderRadius: 5,
      overflow: "hidden",
      backgroundColor: '#F3F4F6',
    },
    title: {
      fontSize: 12,
      fontWeight: "700",
      textAlign: 'right',
      flex: 1
    },
    label: {
      color: '#45587A',
      fontSize: 12,
    },
    line: {
      display: 'flex',
      flexDirection: 'row'
    },
    bottom: {
      padding: 10,
    },
    images: {
      height: 180,
    },
    covers: {
      position: 'absolute',
      bottom: 0,
      height: 25,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
      paddingLeft: 5
    },
    coverText: {
      fontSize: 13,
      lineHeight: 25,
      fontWeight: "700",
    },
    color: {
      borderRadius: 11,
      width: 11,
      height: 11,
      marginLeft: 3,
      marginTop: 2
    }
});
export default CarListItem;