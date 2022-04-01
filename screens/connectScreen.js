import { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { EventRegister } from 'react-native-event-listeners'
import { useIsFocused } from '@react-navigation/native';

import { StyleSheet, Text, View } from 'react-native';
import { ListItem, Switch, Divider, Avatar } from 'react-native-elements'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPowerOff, faGear, faHeart, faCoins, faFolder, faCircleHalfStroke, faQuestion } from '@fortawesome/free-solid-svg-icons'

import themeContext from '../config/themeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { IP_URL } from '@env'

export default function ConnectScreen(props) {

  const [light, setLight] = useState(true)
  const [userName, setUserName] = useState('');
  const [score, setScore] = useState(0);
  const [imageUrl, setImageUrl] = useState('https://res.cloudinary.com/dualrskkc/image/upload/v1646813911/veazit/unknown_lgsmmw.jpg')

  const theme = useContext(themeContext);

  const tokenUser = useSelector(state => state.token);
  const dispatch = useDispatch();

  const isFocused = useIsFocused();

  useEffect(() => {
    var verifyUser = () => {
      if (!tokenUser) {
        props.navigation.navigate("SignUp")
      }
    }
    async function scoreData() {
      var rawResponse = await fetch(`${IP_URL}best-users?token=${tokenUser}`);
      var response = await rawResponse.json();

      if (response.result) {
        setScore(response.user.score);
        setUserName(response.user.username)
        setImageUrl(response.user.avatar)
        setLight(!response.user.apparence)
      }

    }
    scoreData();
    verifyUser()
  }, [isFocused])

  //vient déconnecter l'user en retirant le token de l'user en local storage
  var disconnect = () => {
    props.navigation.navigate('SignUp')
    AsyncStorage.removeItem('token');
    dispatch({ type: 'addToken', token: '' })
  }

  //Vient 'dispatch' la valeur que l'user attribue et envoie l'info en BDD
  var updateTheme = async (value) => {

    setLight(value);
    EventRegister.emit('myCustomEvent', light);

    await fetch(`${IP_URL}/update-theme?`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `token=${tokenUser}&apparence=${light}`,
    });

  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>

      <View style={{
        alignItems: 'center',
        marginVertical: 20,
      }}>
        <Avatar
          size={200}
          rounded
          source={{ uri: imageUrl }}
          containerStyle={{ marginVertical: 25 }}
        />
        <Text style={[styles.contentTitle, { color: theme.color }]}>{userName}</Text>
        <Text style={[styles.contentDesc, { color: theme.color }]}>Score:{score}</Text>
      </View>

      <ListItem
        containerStyle={[styles.containerList, { backgroundColor: theme.background }]}
        onPress={() => props.navigation.navigate('Parameter')}>
        <FontAwesomeIcon icon={faGear} color={theme.color} size={20} textAlign={'center'} />
        <ListItem.Content>
          <Text style={[styles.textList, { color: theme.color }]}>Paramètres</Text>
        </ListItem.Content>
      </ListItem>

      <Divider />

      <ListItem containerStyle={[styles.containerList, { backgroundColor: theme.background }]}>
        <FontAwesomeIcon icon={faCircleHalfStroke} color={theme.color} size={20} textAlign={'center'} />
        <ListItem.Content>
          <Text style={[styles.textList, { color: theme.color }]}>Apparence</Text>
        </ListItem.Content>
        <Switch
          color={"#06D4B6"}
          value={light}
          onValueChange={(value) => updateTheme(value)}
        />
      </ListItem>

      <Divider />

      <ListItem
        containerStyle={[styles.containerList, { backgroundColor: theme.background }]}
        onPress={() => props.navigation.navigate('Favorite')}>
        <FontAwesomeIcon icon={faHeart} color={theme.color} size={20} textAlign={'center'} />
        <ListItem.Content>
          <Text style={[styles.textList, { color: theme.color }]}>Favoris POI</Text>
        </ListItem.Content>
      </ListItem>

      <Divider />

      <ListItem
        containerStyle={[styles.containerList, { backgroundColor: theme.background }]}
        onPress={() => props.navigation.navigate('Archive')}>
        <FontAwesomeIcon icon={faFolder} color={theme.color} size={20} textAlign={'center'} />
        <ListItem.Content>
          <Text style={[styles.textList, { color: theme.color }]}>Archives POI</Text>
        </ListItem.Content>
      </ListItem>

      <Divider />

      <ListItem
        containerStyle={[styles.containerList, { backgroundColor: theme.background }]}
        onPress={() => props.navigation.navigate('Howto')}>
        <FontAwesomeIcon icon={faCoins} color={theme.color} size={20} textAlign={'center'} />
        <ListItem.Content>
          <Text style={[styles.textList, { color: theme.color }]}>Comment gagner des points ?</Text>
        </ListItem.Content>
      </ListItem>

      <Divider />

      <ListItem
        containerStyle={[styles.containerList, { backgroundColor: theme.background }]}
        onPress={() => props.navigation.navigate('Who')}>
        <FontAwesomeIcon icon={faQuestion} color={theme.color} size={20} textAlign={'center'} />
        <ListItem.Content>
          <Text style={[styles.textList, { color: theme.color }]}>À propos de nous</Text>
        </ListItem.Content>
      </ListItem>

      <Divider />

      <ListItem
        containerStyle={[styles.containerList, { backgroundColor: theme.background }]}
        onPress={() => disconnect()}>
        <FontAwesomeIcon icon={faPowerOff} color="#EA4335" size={20} textAlign={'center'} />
        <ListItem.Content>
          <Text style={{
            fontSize: 10,
            fontFamily: "PressStart2P_400Regular",
            color: "#EA4335",
          }}>Deconnexion</Text>
        </ListItem.Content>
      </ListItem>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  contentTitle: {
    fontSize: 24,
    marginBottom: 20,
    fontFamily: "PressStart2P_400Regular",
  },
  contentDesc: {
    fontSize: 16,
    marginBottom: 20,
    fontFamily: "PressStart2P_400Regular",
  },
  containerList: {
    height: 50,
  },
  textList: {
    fontSize: 10,
    fontFamily: "PressStart2P_400Regular",
  }
});
