import React from 'react';
import { SafeAreaView, FlatList, StyleSheet, StatusBar } from 'react-native';
import CarListItem from './CarListItem';

type ListProps = { data: any[] };

const CarList = ({ data }: ListProps) => {
  return (
    <FlatList style={styles.container}
        data={data}
        renderItem={({item}) => <CarListItem  
            name={item.car} 
            color={item.color} 
            model={item.car_model} 
            year={item.car_model_year} 
            pic={item.pic} 
            price={item.price}
        />}
        keyExtractor={item => item.id}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    // alignItems: 'flex-start',
    // marginTop: StatusBar.currentHeight || 0,
  },
});

export default CarList;