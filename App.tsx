import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { GET_CARS, Request } from './services';
import CarList from './components/CarList';

export default function App() {
  const [carList, setCarList] = useState([]);
  // cars data
  useEffect(() => {
    Request(GET_CARS).then((data) => {
      setCarList(data.slice(0, 50));
    });

    // Request(GET_PICS_SMALL).then((data) => {
    //   console.log(data);
    // })
  }, []);

  return (
    <View style={styles.container}>
      <CarList data={carList}></CarList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#fff',
    flexDirection: 'row',
    width: '100%'
  },
});
