import { useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, CheckBox, Button } from 'react-native-elements';
import Modal from 'react-native-modal';

import { PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import AsyncStorage from '@react-native-async-storage/async-storage';

import themeContext from '../config/themeContext';

export default function FilterScreen(props) {

  const theme = useContext(themeContext);

  const [modalVisible, setModalVisible] = useState(false);

  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);

  //Récupère les categories du store
  const checked = useSelector((state) => state.category)
  const dispatch = useDispatch()

  var filter = ["Musée", "Nature", "Site touristique"]

  //Vient cocher ou non les filtres en fonction des préselections de l'user
  useEffect(() => {
    function checkB(allCategory, selected) {
      for (var i = 0; i < selected.length; i++) {

        switch (allCategory.indexOf(selected[i])) {
          case 0:
            setCheck1(true);
            break;
          case 1:
            setCheck2(true);
            break;
          case 2:
            setCheck3(true);
            break;
        }
      }
    }
    checkB(filter, checked)
  }, [modalVisible])

  let [fontLoaded, error] = useFonts({ PressStart2P_400Regular });

  if (!fontLoaded) {
    return <AppLoading />
  }
  //au press sur valider les filtres sont sauvegardés en local storage et envoyé au store
  var updateFilter = () => {
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

    dispatch({ type: "addchecked", category: category })
    AsyncStorage.setItem("category", JSON.stringify(category))

    setModalVisible(false)
  }


  return (

    <View>

      <Button onPress={() => setModalVisible(true)}
        buttonStyle={[styles.buttonStyle, { backgroundColor: theme.background }]}
        icon={{
          name: 'filter',
          type: 'font-awesome',
          size: 18,
          color: '#4b667f',
        }}
        iconPosition='top'
        title={<Text style={{ fontSize: 10, color: '#4b667f', marginTop: 7 }}>Filtre</Text>}
      />


      <Modal
        backdropOpacity={0.3}
        isVisible={modalVisible}
        style={styles.contentView}
      >

        <View style={[styles.content, { backgroundColor: theme.background }]}>
          <Text style={[styles.contentTitle, { color: theme.color }]}>Filtres</Text>
          <Text style={{ color: theme.color, fontSize: 14, fontFamily: "PressStart2P_400Regular", marginBottom: 20, lineHeight: 30 }}>Modifiez vos catégories de point d'intérêt : </Text>
          <View style={{ alignItems: 'flex-start' }}>
            <CheckBox
              title="Musée"
              checked={check1}
              checkedColor={theme.color}
              onPress={() => setCheck1(!check1)}
              textStyle={{ color: theme.color, fontFamily: "PressStart2P_400Regular" }}
              containerStyle={{ backgroundColor: theme.background, borderWidth: 0 }}
            />

            <CheckBox
              title="Nature"
              checked={check2}
              checkedColor={theme.color}
              onPress={() => setCheck2(!check2)}
              textStyle={{ color: theme.color, fontFamily: "PressStart2P_400Regular" }}
              containerStyle={{ backgroundColor: theme.background, borderWidth: 0 }}
            />

            <CheckBox
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
            onPress={() => updateFilter()}>
            <Text
              style={[styles.buttonText, { color: theme.color }]}>Valider</Text>

          </TouchableOpacity>
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
    height: 500,

  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 20,
    fontFamily: "PressStart2P_400Regular",
  },
  button: {
    width: '50%',
    height: 50,
    borderRadius: 30,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 25,
  },
  buttonText: {
    fontFamily: "PressStart2P_400Regular",
    fontSize: 20,
  },
  buttonStyle: {
    height: 60,
    width: 60,
  },
  contentView: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});
