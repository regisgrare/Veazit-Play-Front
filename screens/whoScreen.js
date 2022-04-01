import { useContext } from 'react';

import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Avatar, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

import themeContext from '../config/themeContext';

export default function WhoScreen(props) {

  const theme = useContext(themeContext);

  return (

    <View style={[styles.content, { backgroundColor: theme.background }]}>
      <Text style={[styles.contentTitle, { color: theme.color }]}>Qui sommes-nous ?</Text>
      <View style={{alignItems:'center',justifyContent:'center', marginTop:15}}>

        <View style={{ alignItems: 'center', width: '70%', marginTop: 10,justifyContent:'center'}}>
          <Avatar
            source={{ uri: 'https://res.cloudinary.com/dualrskkc/image/upload/v1646842845/veazit/regis_iwb9wn.jpg' }}
            size={125}
            rounded={true}
            marginBottom={10}
          />
            <Text style={{ color: theme.color, fontSize: 18, fontWeight:'bold'}}>RÉGIS</Text>
        </View>


        <View style={{ alignItems: 'center', width: '70%', marginTop: 10,justifyContent:'center'}}>
          <Avatar
            source={{ uri: 'https://res.cloudinary.com/dualrskkc/image/upload/v1646841698/veazit/kevin_jrojd2.jpg' }}
            size={125}
            rounded={true}
            marginBottom={10}
          />
            <Text style={{ color: theme.color, fontSize: 18, fontWeight:'bold'}}>KEVIN</Text>
        </View>


        <View style={{ alignItems: 'center', width: '70%', marginTop: 10,justifyContent:'center'}}>
          <Avatar
            source={{ uri: 'https://res.cloudinary.com/dualrskkc/image/upload/v1646841698/veazit/nicolas_a7vwkl.jpg' }}
            size={125}
            rounded={true}
            marginBottom={10}
          />
            <Text style={{ color: theme.color, fontSize: 18, fontWeight:'bold'}}>NICOLAS</Text>
        </View>

      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => props.navigation.navigate('StackNavigation', { screen: 'ConnectScreen' })}>
          <View style={[styles.buttonPrevious, { borderColor: theme.color }]}>
            <Icon name='arrow-left' size={24} color={theme.color} />
          </View>
        </TouchableOpacity>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentTitle: {
    fontSize: 20,
    fontFamily: "PressStart2P_400Regular",
  },
  buttonPrevious: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 30,
    flexDirection: 'row'
  },
  avatar: {
    position: 'absolute',
    top: 0
  }
});