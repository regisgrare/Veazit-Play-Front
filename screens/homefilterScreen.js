import { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';

import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, CheckBox } from 'react-native-elements';

import { PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import AsyncStorage from '@react-native-async-storage/async-storage';

import themeContext from '../config/themeContext';

export default function HomefilterScreen(props) {

  const theme = useContext(themeContext);

  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);

  const dispatch = useDispatch()


  const checkBox = () => {
    let category = [];
    if (check1) {
      category.push("Musée")
    }
    if (check2) {
      category.push("Nature")
    }
    if (check3) {
      category.push("Site touristique")
    }
    //Mise en local storage des categories sélectionnées et envoi dans store de Rédux et redirection sur TutoScreen
    dispatch({ type: "addchecked", category: category })
    AsyncStorage.setItem("category", JSON.stringify(category))
    props.navigation.navigate('TutoScreen')

  }


  let [fontLoaded, error] = useFonts({ PressStart2P_400Regular });

  if (!fontLoaded) {
    return <AppLoading />
  }

  return (

    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={{ color: theme.color, fontSize: 15, fontFamily: "PressStart2P_400Regular", marginBottom: 25, lineHeight: 40 }}>Quelle(s) catégorie(s) de point d'intérêt souhaitez-vous Veaziter ?</Text>
      <View style={{ alignItems: 'flex-start' }}>
        <CheckBox
          center
          title="Musée"
          checked={check1}
          checkedColor={theme.color}
          onPress={() => setCheck1(!check1)}
          textStyle={{ color: theme.color, fontFamily: "PressStart2P_400Regular" }}
          containerStyle={{ backgroundColor: theme.background, borderWidth: 0 }}
        />

        <CheckBox
          center
          title="Nature"
          checked={check2}
          checkedColor={theme.color}
          onPress={() => setCheck2(!check2)}
          textStyle={{ color: theme.color, fontFamily: "PressStart2P_400Regular" }}
          containerStyle={{ backgroundColor: theme.background, borderWidth: 0 }}
        />

        <CheckBox
          center
          title="Site touristique"
          checked={check3}
          checkedColor={theme.color}
          onPress={() => setCheck3(!check3)}
          textStyle={{ color: theme.color, fontFamily: "PressStart2P_400Regular" }}
          containerStyle={{ backgroundColor: theme.background, borderWidth: 0 }}
        />

      </View>


      <TouchableOpacity
        style={[styles.button, { borderColor: theme.color }]}
        onPress={() => checkBox()}>
        <Text
          style={[styles.buttonText, { color: theme.color }]}>Valider</Text>
      </TouchableOpacity>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '50%',
    height: 50,
    borderRadius: 30,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  buttonText: {
    fontFamily: "PressStart2P_400Regular",
    fontSize: 20,
  },
});
