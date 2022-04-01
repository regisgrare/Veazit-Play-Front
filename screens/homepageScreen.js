import { useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';

import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import AsyncStorage from '@react-native-async-storage/async-storage';

import themeContext from '../config/themeContext';

export default function HomepageScreen(props) {
  //définition du thème selon préférence user
  const theme = useContext(themeContext);

  const [pseudo, setPseudo] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const dispatch = useDispatch();

  //Récupère les valeurs du local storage et envoie vers le store Redux category et token
  useEffect(() => {
    AsyncStorage.getItem('pseudo', function (error, pseudo) {
      if (pseudo) {
        AsyncStorage.getItem('category', function (error, category) {
          //Category est une string, il faut parser pour récupérer l'info sous forme de tableau
          if (category) {
            var categoryParse = JSON.parse(category)
            dispatch({ type: "addchecked", category: categoryParse })
          }
        });
        AsyncStorage.getItem('token', function (error, token) {
          if (token) {
            dispatch({ type: 'addToken', token: token })
          }
        });
        props.navigation.navigate('StackNavigation')
      }
    });
  }, []);

  let [fontLoaded, error] = useFonts({ PressStart2P_400Regular });

  if (!fontLoaded) {
    return <AppLoading />
  }

  //Mise en local storage du pseudo et redirection vers HomeFilter si pseudo != null
  var submitPseudo = () => {
    if (pseudo != '') {
      setErrorMsg('')
      AsyncStorage.setItem("pseudo", pseudo);
      props.navigation.navigate("HomeFilter");
    } else {
      setErrorMsg('Merci de remplir le champs')
    }
  }

  return (
    //Récupère le style de container et thème
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={{ color: theme.color, fontSize: 50, fontFamily: "PressStart2P_400Regular" }}>Veazit</Text>
      <Text style={{ color: "#D1D8E0", fontSize: 50, fontFamily: "PressStart2P_400Regular" }}>&</Text>
      <Text style={{ color: theme.color, fontSize: 50, marginBottom: 50, fontFamily: "PressStart2P_400Regular" }}>Play</Text>

      <SafeAreaView>
        <Input
          onChangeText={(val) => setPseudo(val)}
          value={pseudo}
          containerStyle={{ width: 275 }}
          inputStyle={{ marginLeft: 10, color: '#fff' }}
          placeholder='Entrez votre pseudo'
          leftIcon={
            <Icon
              name='user-astronaut'
              size={24}
              color={theme.color}
            />
          }
        />
      </SafeAreaView>

      <Text style={styles.error}>{errorMsg}</Text>

      <TouchableOpacity
        style={[styles.button, { borderColor: theme.color }]}
        onPress={() => submitPseudo()}>
        <Text
          style={[styles.buttonText, { color: theme.color }]}>Start</Text>
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
    marginTop: 10,
  },
  buttonText: {
    fontFamily: "PressStart2P_400Regular",
    fontSize: 20,
  },
  error: {
    color: 'red',
    fontFamily: "PressStart2P_400Regular",
    fontSize: 12,
    marginVertical: 5,
  },
});
