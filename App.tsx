import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { getListData } from './services';
import CarList from './components/CarList';

const SIZE = 50;

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function App() {
  const [carList, setCarList] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  // cars data
  useEffect(() => {
    getListData(page * SIZE, (page + 1) * SIZE).then((cars) => {
      setCarList(carList.concat(cars));
      setLoading(false);
    });
  }, [page]);

  const onEndReached = () => {
    if (!carList.length) return;
    if (loading) return;
    setLoading(true);
    setPage(page + 1);
  }

  return (
    <View style={Object.assign({}, styles.container, {
      width: screenWidth,
      height: screenHeight
    })}>
      <View></View>
      <CarList 
      data={carList} 
      onEndReached={onEndReached}></CarList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    overflow: 'hidden'
  },
  // filter: {
  //   height: 200
  // }
});
