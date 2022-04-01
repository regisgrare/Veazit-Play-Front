import { useContext } from 'react';

import { StyleSheet,  View,TouchableOpacity, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

import themeContext from '../config/themeContext';

export default function HowtoScreen(props) {

  const theme = useContext(themeContext);

  return (

    <View style={[styles.content,{backgroundColor:theme.background}]}>
        <Text style={[styles.contentTitle,{color: theme.color}]}>Comment Veazit fonctionne ?</Text>

        
        <ScrollView >
          <View>
            <Text style={styles.question}>Comment gagner des points ?</Text>
            <Text style={[styles.desc,{color:theme.color}]}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Text>
          </View>

          <View>
            <Text style={styles.question}>Comment gagner des trophées ?</Text>
            <Text style={[styles.desc,{color:theme.color}]}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </Text>
          </View>

          <View>
            <Text style={styles.question}>Comment monter de niveau ?</Text>
            <Text style={[styles.desc,{color:theme.color}]}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </Text>
          </View>

          <View>
            <Text style={styles.question}>Il y a t'il une limite de score ?</Text>
            <Text style={[styles.desc,{color:theme.color}]}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </Text>
          </View>

        </ScrollView>

        <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => props.navigation.navigate('StackNavigation', { screen: 'ConnectScreen' })}>
                <View style={[styles.buttonPrevious,{borderColor: theme.color}]}>
                    <Icon name='arrow-left' size={24} color={theme.color}/>
                </View>
            </TouchableOpacity>
        </View>
    </View>

  );
}

const styles = StyleSheet.create({
    content: {
        flex:1,
        alignItems: 'center',
      },
      contentTitle: {
        fontSize: 20,
        fontFamily: "PressStart2P_400Regular",
        marginTop:50
      },
      buttonPrevious: {
        borderWidth: 1,
        borderRadius: 10,
        padding:10,
        },
        buttonContainer:{
            position:'absolute',
            bottom:50,
            left:30,
            flexDirection:'row'
        },
      question:{
        marginTop:20,
        marginHorizontal:5,
        fontSize: 16,
        fontFamily: "PressStart2P_400Regular",
        color:'white'
      },
      desc:{
        marginTop:10,
        marginHorizontal:5,
        fontSize: 12,
        fontFamily: "PressStart2P_400Regular",
      }
});