import { Pressable, StyleSheet, Text, View } from 'react-native';

type FilterProps = { 
    year?: string;
    brand?: string;
    color?: string;
    onPress: (type: string) => void;
};

function Button({ title, onPress }: any) {
    return (
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.btntext}>{title}</Text>
      </Pressable>
    );
}

const Filter = ({ year, brand, color, onPress }: FilterProps) => {
    return (
      <View style={styles.filter}>
        <View style={styles.item}>
          <Text style={styles.text}>Brand:</Text>
          <Button onPress={() => onPress('brand')} title={brand ?? "Brand"}/>
        </View>
        <View style={styles.item}>
          <Text style={styles.text}>Year:</Text>
          <Button onPress={() => onPress('year')} title={year ?? "Year"}/>
        </View>
        <View style={styles.item}>
          <Text style={styles.text}>Color:</Text>
          <Button onPress={() => onPress('color')} title={color ?? "Color"}/>
        </View>
      </View>
    )
}
const styles = StyleSheet.create({
    filter: {
      display: 'flex',
      flex: 1,
      flexDirection: 'row',
      marginHorizontal: 5
    },
    item: {
      paddingLeft: 5,
      flex: 1,
      display: 'flex'
    },
    text: {
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 5
    },
    button: {
        borderRadius: 10,
        border: '1px solid #4B5563',
        backgroundColor: '#E5E7EB'
    },
    btntext: {
        fontSize: 14,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#4B5563',
        textAlign: 'center'
    }
  });
export default Filter;