import React from 'react';
import { FlatList } from 'react-native';
import CarListItem from './CarListItem';

type ListProps = { 
  data: any[];
  onEndReached: () => void;
};

const CarList = ({ data , onEndReached }: ListProps) => {
  return (
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
  );
};
export default CarList;