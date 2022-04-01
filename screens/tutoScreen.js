import { useState, useContext } from 'react';

import { StyleSheet, View, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import { Text, Overlay } from 'react-native-elements';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUserAstronaut, faTrophy, faMapLocationDot, faFilter, faXmark } from '@fortawesome/free-solid-svg-icons'
import { faFortAwesome } from '@fortawesome/free-brands-svg-icons'

import { PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import imageFond from '../assets/tuto.jpg'

import themeContext from '../config/themeContext';

export default function TutoScreen(props) {

    const theme = useContext(themeContext);

    const [isVisible1, setIsVisible1] = useState(true)
    const [isVisible2, setIsVisible2] = useState(false)
    const [isVisible3, setIsVisible3] = useState(false)
    const [isVisible4, setIsVisible4] = useState(false)
    const [isVisible5, setIsVisible5] = useState(false)

    let [fontLoaded, error] = useFonts({ PressStart2P_400Regular });

    if (!fontLoaded) {
        return <AppLoading />
    }

    //Modal de tuto en passant à la suivante passe de true à false et false à true pour la suivante
    return (

        <View>
            <ImageBackground source={imageFond} style={styles.image} />

            <Overlay
                overlayStyle={[styles.overlayStyle, { borderColor: theme.color }]}
                isVisible={isVisible1}>

                <View style={[styles.overlayTuto, { backgroundColor: theme.background }]}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => { setIsVisible1(false); props.navigation.navigate('StackNavigation') }}>
                        <FontAwesomeIcon
                            icon={faXmark}
                            color='white'
                            size={25} />
                    </TouchableOpacity>

                    <View style={styles.titleContainer}>
                        <Text style={styles.titleWhite}>Tutoriel</Text>
                        <Text style={[styles.titleGreen, { color: theme.color }]}>Veazit & Play </Text>
                    </View>

                    <FontAwesomeIcon
                        icon={faMapLocationDot}
                        color='white'
                        size={75}
                        textAlign={'center'} />
                    <View>
                        <Text style={styles.textWhite}>Cet icône te montrera ta </Text>
                        <Text style={[styles.textGreen, { color: theme.color }]}>Carte de Veazit</Text>
                    </View>

                    <TouchableOpacity
                        style={[styles.button, { borderColor: theme.color }]}
                        onPress={() => { setIsVisible1(false); setIsVisible2(true) }}>
                        <Text
                            style={[styles.buttonText, { color: theme.color }]}>1/5</Text>
                    </TouchableOpacity>

                </View>
            </Overlay>

            <Overlay
                overlayStyle={[styles.overlayStyle, { borderColor: theme.color }]}
                isVisible={isVisible2}>

                <View style={[styles.overlayTuto, { backgroundColor: theme.background }]}>

                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => { setIsVisible2(false); props.navigation.navigate('StackNavigation') }}>
                        <FontAwesomeIcon
                            icon={faXmark}
                            color='white'
                            size={25} />
                    </TouchableOpacity>

                    <View style={styles.titleContainer}>
                        <Text style={styles.titleWhite}>Tutoriel</Text>
                        <Text style={[styles.titleGreen, { color: theme.color }]}>Veazit & Play </Text>
                    </View>

                    <FontAwesomeIcon
                        icon={faFilter}
                        color='white'
                        size={75}
                        textAlign={'center'} />
                    <View>
                        <Text style={styles.textWhite}>Cet icône te montrera tes </Text>
                        <Text style={[styles.textGreen, { color: theme.color }]}>Filtres de Veazit</Text>
                    </View>

                    <TouchableOpacity
                        style={[styles.button, { borderColor: theme.color }]}
                        onPress={() => { setIsVisible2(false); setIsVisible3(true) }}>
                        <Text
                            style={[styles.buttonText, { color: theme.color }]}>2/5</Text>
                    </TouchableOpacity>

                </View>
            </Overlay>

            <Overlay
                overlayStyle={[styles.overlayStyle, { borderColor: theme.color }]}
                isVisible={isVisible3}>

                <View style={[styles.overlayTuto, { backgroundColor: theme.background }]}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => { setIsVisible3(false); props.navigation.navigate('StackNavigation') }}>
                        <FontAwesomeIcon
                            icon={faXmark}
                            color='white'
                            size={25} />
                    </TouchableOpacity>

                    <View style={styles.titleContainer}>
                        <Text style={styles.titleWhite}>Tutoriel</Text>
                        <Text style={[styles.titleGreen, { color: theme.color }]}>Veazit & Play </Text>
                    </View>

                    <FontAwesomeIcon
                        icon={faFortAwesome}
                        color='white'
                        size={75}
                        textAlign={'center'} />
                    <View>
                        <Text style={styles.textWhite}>Cet icône te montrera des </Text>
                        <Text style={[styles.textGreen, { color: theme.color }]}>Quêtes de Veazit</Text>
                    </View>

                    <TouchableOpacity
                        style={[styles.button, { borderColor: theme.color }]}
                        onPress={() => { setIsVisible3(false); setIsVisible4(true) }}>
                        <Text
                            style={[styles.buttonText, { color: theme.color }]}>3/5</Text>
                    </TouchableOpacity>

                </View>
            </Overlay>

            <Overlay
                overlayStyle={[styles.overlayStyle, { borderColor: theme.color }]}
                isVisible={isVisible4}>

                <View style={[styles.overlayTuto, { backgroundColor: theme.background }]}>

                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => { setIsVisible4(false); props.navigation.navigate('StackNavigation') }}>
                        <FontAwesomeIcon
                            icon={faXmark}
                            color='white'
                            size={25} />
                    </TouchableOpacity>

                    <View style={styles.titleContainer}>
                        <Text style={styles.titleWhite}>Tutoriel</Text>
                        <Text style={[styles.titleGreen, { color: theme.color }]}>Veazit & Play </Text>
                    </View>

                    <FontAwesomeIcon
                        icon={faTrophy}
                        color='white'
                        size={75}
                        textAlign={'center'} />
                    <View>
                        <Text style={styles.textWhite}>Cet icône te montrera tes </Text>
                        <Text style={[styles.textGreen, { color: theme.color }]}>Trophées</Text>
                    </View>

                    <TouchableOpacity
                        style={[styles.button, { borderColor: theme.color }]}
                        onPress={() => { setIsVisible4(false); setIsVisible5(true) }}>
                        <Text
                            style={[styles.buttonText, { color: theme.color }]}>4/5</Text>
                    </TouchableOpacity>

                </View>
            </Overlay>

            <Overlay
                overlayStyle={[styles.overlayStyle, { borderColor: theme.color }]}
                isVisible={isVisible5}>

                <View style={[styles.overlayTuto, { backgroundColor: theme.background }]}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleWhite}>Tutoriel</Text>
                        <Text style={[styles.titleGreen, { color: theme.color }]}>Veazit & Play </Text>
                    </View>

                    <View>
                        <FontAwesomeIcon
                            icon={faUserAstronaut}
                            color='white'
                            size={75}
                            textAlign={'center'} />
                    </View>

                    <View>
                        <Text style={styles.textWhite}>Cet icône te montrera ton </Text>
                        <Text style={[styles.textGreen, { color: theme.color }]}>Profil Veaziter</Text>
                    </View>

                    <TouchableOpacity
                        style={[styles.button, { borderColor: theme.color }]}
                        onPress={() => { setIsVisible5(false); props.navigation.navigate('StackNavigation') }}>
                        <Text
                            style={[styles.buttonText, { color: theme.color }]}>Start</Text>
                        <Text
                            style={[styles.buttonText, { color: theme.color }]}>Veazit</Text>
                    </TouchableOpacity>

                </View>
            </Overlay>
        </View>


    );
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    overlayTuto: {
        width: 300,
        height: 500,
        justifyContent: 'space-around',
        alignItems: 'center',
        opacity: 1,
    },
    titleContainer: {
        marginTop: 20,
    },
    titleWhite: {
        color: 'white',
        fontSize: 25,
        textAlign: 'center',
        paddingHorizontal: 5,
        fontFamily: "PressStart2P_400Regular"
    },
    titleGreen: {
        fontSize: 18,
        textAlign: 'center',
        paddingHorizontal: 5,
        paddingTop: 10,
        fontFamily: "PressStart2P_400Regular"
    },
    textWhite: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
        paddingBottom: 10,
        fontFamily: "PressStart2P_400Regular"
    },
    textGreen: {
        fontSize: 15,
        textAlign: 'center',
        fontFamily: "PressStart2P_400Regular"
    },
    icone: {
        textAlign: 'center',
        justifyContent: 'center'
    },
    overlayStyle: {
        padding: 0,
        borderWidth: 2,
    },
    button: {
        width: '50%',
        height: 50,
        borderRadius: 30,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontFamily: "PressStart2P_400Regular",
        fontSize: 16,
    },
    closeButton: {
        position: 'absolute',
        right: 20,
        top: 20,
    },
});
