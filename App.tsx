import { Dimensions, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';
import { getFilterData, getListData, setFilterWord } from './src/services';
import CarList from './src/CarList';
import Filter from './src/Filter';
import SelectModal from './src/SelectModal';

const SIZE = 50;

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function App() {
  const [carList, setCarList] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalList, setModalList] = useState<any[]>([]);

  // cars data
  useEffect(() => {
    if (page < 0) return;
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

  const onPress = (title: string) => {
    setVisible(!visible);
    setModalTitle(title);
    setModalList(getFilterData(title));
  }
  const onConfirm = () => {
    setLoading(true);
    setCarList([]);
    setPage(0);
    getListData(0, SIZE).then((cars) => {
      setCarList(cars);
      setLoading(false);
    });
    setVisible(false);
  }

  const onSelect = (name: string, type: 'add' | 'remove') => {
    setFilterWord(modalTitle, name, type);
  }
  return (
    <SafeAreaView style={Object.assign({}, styles.container, {
      width: screenWidth,
      height: screenHeight
    })}>
      <SelectModal 
        title={modalTitle}
        onConfirm={onConfirm} 
        visible={visible} 
        list={modalList}
        onSelect={onSelect}
        onCancel={() => setVisible(false)}></SelectModal>
      <View style={{ height: 70,}}>
        <Filter onPress={onPress}></Filter>
      </View>
      <CarList 
      data={carList} 
      onEndReached={onEndReached}></CarList>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    position: 'relative',
    marginTop: StatusBar.currentHeight || 0,
  }
});
