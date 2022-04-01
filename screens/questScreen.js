import { useState, useContext } from 'react';

import { StyleSheet,  View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import Modal from 'react-native-modal';

import themeContext from '../config/themeContext';

export default function QuestScreen() {

  const theme = useContext(themeContext);

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>

      <Button onPress={() => setModalVisible(true)}
                      buttonStyle={[styles.buttonStyle,{backgroundColor:theme.background}]}
                      icon={{
                        name: 'fort-awesome',
                        type: 'font-awesome',
                        size: 18,
                        color: '#4b667f',
                      }}
                      iconPosition='top'
                      title={<Text style={{ fontSize: 10, color:'#4b667f', marginTop:7 }}>Quête</Text>}
      />

      
      <Modal
          backdropOpacity={0.3}
          isVisible={modalVisible}
          onBackdropPress={() => {setModalVisible(false)}}
          style={styles.contentView}
        >

          <View style={[styles.content,{backgroundColor:theme.background}]}>
            <Text style={[styles.contentTitle,{color: theme.color}]}>Quêtes</Text>
          </View>

        </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  content: {
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 17,
    borderTopLeftRadius: 17,
    height:500,
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
    fontFamily: "PressStart2P_400Regular",
  },
  buttonStyle: {
    height: 60,
    width: 60,
    marginLeft:20,
    marginRight:20,
  },
  contentView: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});
