import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

import { StyleSheet, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Text, ListItem, Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

import themeContext from '../config/themeContext';

import { IP_URL } from '@env'

export default function ArchiveScreen(props) {

  const theme = useContext(themeContext);
  const tokenUser = useSelector(state => state.token);
  const isFocused = useIsFocused();
  const [listArchive, setListArchive] = useState([])

  useEffect(() => {
    async function favorite() {
      //Vient récupérer l'historique des visites de l'utilisateur
      var rawResponse = await fetch(`${IP_URL}my-archive?token=${tokenUser}`);
      var response = await rawResponse.json();
      if (response.result) {
        setListArchive(response.myArchive)
      }
    }
    favorite();
  }, [isFocused])

  var oldCard = listArchive.map((old, i) => {
    return (
      <View key={i}>
        <ListItem
          containerStyle={[styles.containerList, { backgroundColor: theme.background }]}
        >
          <Image
            source={{ uri: old.image }}
            style={{ width: 80, height: 80, borderRadius: 40 }}
          />
          <ListItem.Content>
            <Text style={{ color: 'white', fontFamily: "PressStart2P_400Regular", fontSize: 10, lineHeight: 15 }}>Lieu: <Text style={{ color: theme.color }}>{old.title}</Text></Text>
            <Text style={{ color: 'white', fontFamily: "PressStart2P_400Regular", fontSize: 10, lineHeight: 15 }}>Categorie: <Text style={{ color: theme.color }}>{old.category}</Text></Text>
            <Text style={{ color: 'white', fontFamily: "PressStart2P_400Regular", fontSize: 10, lineHeight: 15 }}>Latitude: <Text style={{ color: theme.color }}>{old.latitude}</Text></Text>
            <Text style={{ color: 'white', fontFamily: "PressStart2P_400Regular", fontSize: 10, lineHeight: 15 }}>Longitude: <Text style={{ color: theme.color }}>{old.longitude}</Text></Text>
          </ListItem.Content>
        </ListItem>
        <Divider />
      </View>
    )
  })

  return (
    <View style={[styles.content, { backgroundColor: theme.background }]}>
      <Text style={[styles.contentTitle, { color: theme.color }]}>Archives</Text>

      <View style={{ width: '100%' }}>
        <ScrollView>
          <Divider />
          {oldCard}
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