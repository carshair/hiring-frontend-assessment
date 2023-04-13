import React from 'react';
import { SafeAreaView, FlatList, StyleSheet, StatusBar } from 'react-native';
import CarListItem from './CarListItem';

type ListProps = { data: any[] };

const CarList = ({ data }: ListProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
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

export default CarList;