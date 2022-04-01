import { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Button, Avatar, Tooltip, colors } from 'react-native-elements';
import Modal from 'react-native-modal';
import { IP_URL } from '@env'
import { useSelector } from 'react-redux';
import axios from 'axios';

import { PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import themeContext from '../config/themeContext';

export default function TrophyScreen() {

  const theme = useContext(themeContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [badgeData, setBadgeData] = useState([])
  const [myBadge, setMyBadge] = useState([])

  const token = useSelector((state) => state.token)

  useEffect(() => {
    async function loadData() {
      //requête de l'ensemble des badges en BDD
      var rawResponse = await fetch(`${IP_URL}badgesData`);
      var response = await rawResponse.json();
      setBadgeData(response.badgeCollection);
    }
    loadData();
  }, [])

  useEffect(() => {
    async function getTrophy() {
      //requête des badges de l'utilisateur connecté
      axios.get(`${IP_URL}my-badges?token=${token}`).then((res) => {
        if (res.data.result) {
          setMyBadge(res.data.myBadge);
        }
      });
    }
    getTrophy()
  }, [modalVisible])


  let [fontLoaded, error] = useFonts({ PressStart2P_400Regular });
  if (!fontLoaded) {
    return <AppLoading />
  }
  var badgeCard = badgeData.map((badge, i) => {
    var imageUrl = `https://res.cloudinary.com/dualrskkc/image/upload/v1646835604/veazit/block_lmhkuy.png`

    if (token != '') {
      var count = myBadge.length
      if (count > 0 && i < count) {
        imageUrl = myBadge[i].img;
      }
    }

    return (
      <View key={i} style={{ flexDirection: "row" }}>
        <View style={{ flexDirection: "column", width: '50%' }}>
          <View style={{ alignItems: "center", marginBottom: 15 }} >
            <Avatar
              size={80}
              source={{ uri: imageUrl }}
            />
            <Text style={{ fontFamily: "PressStart2P_400Regular", fontSize: 12, marginTop: 10, color: "#fff" }} >{badge.title}</Text>
          </View>
        </View>
        <View style={{ marginTop: 15, width: "50%" }}>
          <Text style={{ fontFamily: "PressStart2P_400Regular", fontSize: 10, color: theme.color }} >{badge.description}</Text>
          <Tooltip
            containerStyle={{ width: 145, height: 130 }}
            popover={
              <Text style={{ fontFamily: "PressStart2P_400Regular", fontSize: 10 }}>
                {
                  `Il faut que tu veazites ${badge.condition / 100} lieu(x) pour débloquer ce badge`}
              </Text>
            }
          >
            <Text style={{ color: "#fff", fontFamily: "PressStart2P_400Regular", fontSize: 10 }}>Plus d'infos...</Text>
          </Tooltip>
        </View>
      </View>

    )
  })

  return (
    <View>

      <Button onPress={() => setModalVisible(true)}
        buttonStyle={[styles.buttonStyle, { backgroundColor: theme.background }]}
        icon={{
          name: 'trophy',
          type: 'font-awesome',
          size: 18,
          color: '#4b667f',
        }}
        iconPosition='top'
        title={<Text style={{ fontSize: 10, color: '#4b667f', marginTop: 7 }}>Trophée</Text>}
      />

      <Modal
        backdropOpacity={0.3}
        isVisible={modalVisible}
        onBackdropPress={() => { setModalVisible(false) }}
        style={styles.contentView}
      >
        <View style={[styles.content, { backgroundColor: theme.background }]}>

          <View style={{ alignItems: 'center', marginBottom: 20 }}>
            <Text style={[styles.contentTitle, { color: theme.color }]}>Trophées</Text>
          </View>
          <ScrollView >

            {badgeCard}
          </ScrollView >

        </View>

      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  content: {
    padding: 22,
    borderTopRightRadius: 17,
    borderTopLeftRadius: 17,
    height: 500,
  },
  contentTitle: {
    fontSize: 15,
    marginBottom: 12,
    fontFamily: "PressStart2P_400Regular",
  },
  contentView: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  buttonStyle: {
    height: 60,
    width: 60,
  },
});
