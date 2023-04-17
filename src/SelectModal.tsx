import { Button, StyleSheet, View, Text, Pressable } from 'react-native';

const SelectModal = ({ list, title, visible, onConfirm, onCancel, onSelect }: any) => {
    return (
        visible && <View style={styles.cover}>
        <View style={styles.half}>
          <View><Text style={styles.title}>{title}</Text></View>
          
            {list && list.map((slist: string[]) => {
                return (
                    <View style={styles.selectwrapper}>
                        {
                            slist.map((name) => {
                                return (
                                    <Pressable key={name} style={styles.select} onPress={() => onSelect(name, 'add')}>
                                        <Text style={styles.btntext}>{name}</Text>
                                    </Pressable>
                                )
                            })
                        }
                    </View>
                )
            })}
          
          <View style={styles.confirm}>
            <View style={styles.button}>
              <Button title="Confirm" onPress={onConfirm}/>
            </View>
            <View style={styles.button}>
              <Button color={'#ccc'} title="Cancel" onPress={onCancel}/>
            </View>
          </View>
          
        </View>
      </View>
    )
}
const styles = StyleSheet.create({
    cover: {
      position: 'absolute',
      zIndex: 100,
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.3)'
    },
    half: {
      position: 'absolute',
      zIndex: 101,
      left: '30%',
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.9)'
    },
    confirm: {
      position: 'absolute',
      zIndex: 101,
      left: 5,
      right: 5,
      bottom: 30,
      display: 'flex',
      marginHorizontal: 15,
      flexDirection: 'row',
      alignItems: 'flex-end'
    },
    button: {
      marginRight: 20,
    },
    select: {
        borderRadius: 10,
        border: '1px solid #4B5563',
        backgroundColor: '#E5E7EB',
        marginLeft: 10
    },
    btntext: {
        fontSize: 14,
        lineHeight: 25,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#4B5563',
        textAlign: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        
    },
    selectwrapper: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        paddingRight: 10
    },
    title: {
        fontWeight: '700',
        fontSize: 15,
        textAlign: 'center',
        lineHeight: 30
    }
  });
export default SelectModal;