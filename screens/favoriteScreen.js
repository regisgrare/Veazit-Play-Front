import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

import { StyleSheet, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Text, ListItem, Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import themeContext from '../config/themeContext';

import { IP_URL } from '@env'

export default function FavoriteScreen(props) {

  const theme = useContext(themeContext);
  const tokenUser = useSelector(state => state.token);
  const isFocused = useIsFocused();
  const [listFavorite, setListFavorite] = useState([])

  useEffect(() => {
    async function favorite() {
      //Vient récupérer les favoris de l'utilisateur
      var rawResponse = await fetch(`${IP_URL}my-favorite?token=${tokenUser}`);
      var response = await rawResponse.json();
      if (response.result) {
        setListFavorite(response.myFavorite)
      }
    }
    favorite();
  }, [isFocused])


  var deleteThis = async (id) => {
    //Vient supprimer un élément des favoris
    const deletedArticle = await fetch(`${IP_URL}delete-favorite/${id}/${tokenUser}`,
      { method: 'DELETE' })
    const data = await deletedArticle.json()
    setListFavorite(data.myFavorite)
  }

  var favoriteCard = listFavorite.map((favori, i) => {
    return (
      <View key={i}>
        <ListItem
          containerStyle={[styles.containerList, { backgroundColor: theme.background }]}
        >
          <Image
            source={{ uri: favori.image }}
            style={{ width: 80, height: 80, borderRadius: 40 }}
          />
          <ListItem.Content>
            <Text style={{ color: 'white', fontFamily: "PressStart2P_400Regular", fontSize: 10, lineHeight: 15 }}>Lieu: <Text style={{ color: theme.color }}>{favori.title}</Text></Text>
            <Text style={{ color: 'white', fontFamily: "PressStart2P_400Regular", fontSize: 10, lineHeight: 15 }}>Categorie: <Text style={{ color: theme.color }}>{favori.category}</Text></Text>
            <Text style={{ color: 'white', fontFamily: "PressStart2P_400Regular", fontSize: 10, lineHeight: 15 }}>Latitude: <Text style={{ color: theme.color }}>{favori.latitude}</Text></Text>
            <Text style={{ color: 'white', fontFamily: "PressStart2P_400Regular", fontSize: 10, lineHeight: 15 }}>Longitude: <Text style={{ color: theme.color }}>{favori.longitude}</Text></Text>
          </ListItem.Content>

          <TouchableOpacity onPress={() => deleteThis(favori._id)}>
            <FontAwesomeIcon
              icon={faXmark}
              color='white'
              size={20} />
          </TouchableOpacity>

        </ListItem>
        <Divider />
      </View>
    )
  })

  return (
    <View style={[styles.content, { backgroundColor: theme.background }]}>
      <Text style={[styles.contentTitle, { color: theme.color }]}>Favoris</Text>

      <View style={{ width: '100%' }}>
        <ScrollView>
          <Divider />
          {favoriteCard}
        </ScrollView>
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
    alignItems: 'center',
  },
  contentTitle: {
    fontSize: 20,
    fontFamily: "PressStart2P_400Regular",
    marginTop: 50,
    marginBottom: 20,
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
});