import React from 'react';
import { SafeAreaView, FlatList, StyleSheet, StatusBar, FlatListProps } from 'react-native';
import CarListItem from './CarListItem';

type ListProps = { 
  data: any[];
  onEndReached: () => void;
};

const CarList = ({ data , onEndReached }: ListProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
          numColumns={2}
          data={data}
          renderItem={({item}) => <CarListItem  
              name={item.car} 
              color={item.car_color} 
              model={item.car_model} 
              year={item.car_model_year} 
              url={item.url} 
              price={item.price}
          />}
          onEndReached={() => onEndReached()}
          keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    height: '100%',
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: StatusBar.currentHeight || 0,
  },
  filter: {
    height: 200
  }
});
export default CarList;