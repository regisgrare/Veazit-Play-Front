import { useEffect, useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { EventRegister } from 'react-native-event-listeners'

import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Avatar, Button, Overlay } from 'react-native-elements'
import ProgressBar from "react-native-animated-progress";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMapPin, faCamera, faGopuram, faTree, faHeart, faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons'

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';

import { PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import axios from 'axios';

import { IP_URL, GOOGLE_MAPS_APIKEY } from '@env'

import themeContext from '../config/themeContext';

//customisation de la Map
var mapStyle = [
  {
    "featureType": "all",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "landscape",
    "elementType": "all",
    "stylers": [
      {
        "color": "#AFFFA0"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "all",
    "stylers": [
      {
        "color": "#EAFFE5"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.government",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f9f8c7"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#59A499"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#F0FF8D"
      },
      {
        "weight": 2.2
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit.station.airport",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit.station.airport",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#fdfabf"
      }
    ]
  },
  {
    "featureType": "transit.station.bus",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "transit.station.bus",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "transit.station.rail",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "on"
      },
      {
        "color": "#1A87D6"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
]

export default function MapScreen() {

  const theme = useContext(themeContext);

  const [currentPosition, setCurrentPosition] = useState({})
  const [visible, setVisible] = useState(false);
  const [bestList, setBestList] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState(false)
  const [visibleWin, setVisibleWin] = useState(false)
  const [poiScore, setPoiScore] = useState(0)
  const [poiSelected, setPoiSelected] = useState(0)
  const [updateScore, setUpdateScore] = useState(false)
  const [firstLaunch, setFirstLaunch] = useState(true)
  const [infoMsg, setInfoMsg] = useState('')
  const [directionVisible, setDirectionVisible] = useState(false)

  const [originLocation, setOriginLocation] = useState({})
  const [destinationLocation, setDestinationLocation] = useState({})

  const token = useSelector((state) => state.token)
  const checked = useSelector((state) => state.category)

  const [userScore, setUserScore] = useState(0)
  const [userLevel, setUserLevel] = useState(0)
  const [duration, setDuration] = useState('')
  const [distance, setDistance] = useState('')

  const isFocused = useIsFocused();

  //Liste des POI en dur
  var poi = [{ title: 'Bassin La Paix', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ', latitude: -21.020110692131183, longitude: 55.66926374606402, categorie: 'Nature', score: 100, image: 'https://res.cloudinary.com/dualrskkc/image/upload/v1646813911/veazit/unknown_lgsmmw.jpg' },
  { title: 'Anse des cascades', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ', latitude: -21.177591548568518, longitude: 55.83068689565736, categorie: 'Nature', score: 100, image: 'https://res.cloudinary.com/dualrskkc/image/upload/v1646813911/veazit/unknown_lgsmmw.jpg' },
  { title: 'La Vanilleraie, Domaine du Grand Hazier', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ', latitude: -20.898463033811716, longitude: 55.59040358066711, categorie: 'Musée', score: 100, image: 'https://res.cloudinary.com/dualrskkc/image/upload/v1646813911/veazit/unknown_lgsmmw.jpg' },
  { title: "Musée de l'Imprimerie et de la Communication graphique", description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ', latitude: 45.76511763913665, longitude: 4.834717377872742, categorie: 'Musée', score: 100, image: 'https://res.cloudinary.com/dualrskkc/image/upload/v1646988019/veazit/visites/museeImprimerie_ecyfon.jpg' },
  { title: 'Musée des Moulages', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ', latitude: 45.75224289744716, longitude: 4.854372604035073, categorie: 'Musée', score: 100, image: `https://res.cloudinary.com/dualrskkc/image/upload/v1646988020/veazit/visites/museeMoulage_bofvir.jpg` },
  { title: 'Parc Sergent Blandan', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ', latitude: 45.74555369377989, longitude: 4.854344965036273, categorie: 'Nature', score: 100, image: 'https://res.cloudinary.com/dualrskkc/image/upload/v1646988022/veazit/visites/parcSergentBlandant_h1uc1p.png' },
  { title: 'Place Bellecour', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ', latitude: 45.75859390463612, longitude: 4.8320457057347275, categorie: 'Site touristique', score: 100, image: 'https://res.cloudinary.com/dualrskkc/image/upload/v1646988020/veazit/visites/placeBellecour_ectxum.jpg' },
  { title: 'Mur des Canuts', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ', latitude: 45.77962208717258, longitude: 4.8279484099319765, categorie: 'Site touristique', score: 100, image: 'https://res.cloudinary.com/dualrskkc/image/upload/v1646988019/veazit/visites/murDesCanuts_qfzlbs.jpg' },
  { title: 'La Basilique Notre Dame de Fourvière', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ', latitude: 45.7620670402596, longitude: 4.821810608525698, categorie: 'Site touristique', score: 100, image: 'https://res.cloudinary.com/dualrskkc/image/upload/v1646988019/veazit/visites/basiliqueFourviere_dagzii.jpg' },
  { title: 'Cathédrale Saint-Jean-Baptiste', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ', latitude: 45.760991647055846, longitude: 4.827343942121724, categorie: 'Site touristique', score: 100, image: 'https://res.cloudinary.com/dualrskkc/image/upload/v1646988019/veazit/visites/cathedraleSaintJeanBaptiste_ihal5e.jpg' },
  { title: 'Musée Lumière', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ', latitude: 45.7626670402596, longitude: 4.821810608525698, categorie: 'Musée', score: 100, image: 'https://res.cloudinary.com/dualrskkc/image/upload/v1646988022/veazit/visites/muse%CC%81eLumiere_gvh9nx.jpg' },
  { title: 'Parc Sisley', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ', latitude: 45.753937790936725, longitude: 4.867428054262551, categorie: 'Nature', score: 100, image: 'https://res.cloudinary.com/dualrskkc/image/upload/v1646988019/veazit/visites/parcSisley_rbopfi.jpg' },
  { title: 'Parc du Grillon', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ', latitude: 45.74026227041241, longitude: 4.7740899070069895, categorie: 'Nature', score: 100, image: 'https://res.cloudinary.com/dualrskkc/image/upload/v1646988020/veazit/visites/parcGrillon_w484ln.jpg' },]

  //Modale qui va décrire un POI
  var showOverlay = (title, description) => {
    setTitle(title)
    setDescription(description)
    setVisible(true)
  }

  var listPointOfInterest = poi.map((lieu, i) => {

    let iconCustom = faMapPin
    switch (lieu.categorie) {
      case 'Musée':
        iconCustom = faGopuram
        break;
      case 'Nature':
        iconCustom = faTree
        break;
      case 'Site touristique':
        iconCustom = faCamera
        break;
    }

    //Créé des marqueurs en fonction des filtres sélectionnés
    for (var j = 0; j < checked.length; j++) {
      if (lieu.categorie == checked[j]) {
        return (
          <Marker
            key={i}
            coordinate={{ latitude: lieu.latitude, longitude: lieu.longitude }}
            onPress={() => { showOverlay(lieu.title, lieu.description); setPoiSelected(i) }}>
            <FontAwesomeIcon icon={iconCustom} color='#B53471' size={25} />
          </Marker>
        )
      }
    }
  })

  //demande pour exploiter la géoloc' de l'user et renvoie les données dans une variable d'état
  useEffect(() => {
    async function askPermissions() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        setLocation(true)
        Location.watchPositionAsync({ distanceInterval: 2 },
          (location) => {
            setCurrentPosition({ latitude: location.coords.latitude, longitude: location.coords.longitude })
          }
        );
      }
    }
    askPermissions();
  }, []);

  //requête pour obtenir les utilisateurs au backend (route best-users)
  //si user connecté récupère l'ensemble de ses infos
  useEffect(() => {
    async function bestUser() {
      axios.get(`${IP_URL}best-users?token=${token}`).then((res) => {
        var userData = res.data.bestUserName;
        var userDataToken = res.data.user;
        //trie en ordre décroissant
        userData.sort((a, b) => {
          return b.score - a.score
        })
        //Si moins de trois users en BDD, montre le 1er sinon montre 3
        if (userData.length <= 3) {
          userData = userData.slice(0, 1)
        } else {
          userData = userData.slice(0, 3)
        }
        setBestList(userData);
        if (res.data.result) {
          var calculScore = (userDataToken.score % 1000) / 10
          var calculLevel = parseInt(1 + Math.floor(userDataToken.score / 1000))
          var nextLv = 1000 - (10 * calculScore)
          setUserLevel(calculLevel)
          setUserScore(calculScore)
          setInfoMsg(`Prochain niveau dans ${nextLv} pts`)
          if (firstLaunch && userDataToken) {
            setFirstLaunch(false)
            EventRegister.emit('myCustomEvent', userDataToken.apparence);
          }
        } else {
          setUserScore(0)
          setUserLevel(1)
          setInfoMsg('Inscris toi pour jouer avec Veazit')
        }
      });
    }

    bestUser();
  }, [isFocused, token, updateScore])

  var launchNavigation = async (destLatitude, destLongitude) => {
    //ADD NAVIGATION
    setVisible(false)
    setOriginLocation(currentPosition)
    setDestinationLocation({ latitude: destLatitude, longitude: destLongitude })
    setDirectionVisible(true)

    setTimeout(() => {
      setVisibleWin(true);
      setDirectionVisible(false)
    }, 10000); //DEMODAY simuler la marche 
  }

  var calculateTravel = (km, min) => {

    var distanceToTravel = km.toFixed(2)
    var estimatedKm = `Trajet estimé: ${distanceToTravel} KM`

    var timeToTravel = min
    var timeToTravelMin = (timeToTravel % 60).toFixed(0)
    var timeToTravelHour = Math.floor(timeToTravel / 60)
    var estimatedTime = ""

    if (timeToTravelHour > 0) {
      estimatedTime = `Durée estimée: ${timeToTravelHour} H ${timeToTravelMin} min`
    } else {
      estimatedTime = `Durée estimée: ${timeToTravelMin} min`
    }

    setDistance(estimatedKm)
    setDuration(estimatedTime)
  }

  var addScore = async (longitude, latitude, title, description, image, category) => {

    if (token == '') {
      setInfoMsg('Inscris toi pour jouer avec Veazit')
    } else {
      //requête pour actualiser les données de l'utilisateur
      await fetch(`${IP_URL}best-users?`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `score=${poiScore}&token=${token}&longitude=${longitude}&latitude=${latitude}&title=${title}&description=${description}&image=${image}&category=${category}`,
      });
    }
    setVisibleWin(false)
    setUpdateScore(!updateScore)
  }

  var addToFavorite = async (longitude, latitude, title, description, image, category) => {
    //requête pour actualiser les favoris de l'utilisateur
    await fetch(`${IP_URL}add-favorite?`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `token=${token}&longitude=${longitude}&latitude=${latitude}&title=${title}&description=${description}&image=${image}&category=${category}`,
    });
  }

  //Créé une card pour users du scoreboard
  var bestUserCard = bestList.map((user, i) => {
    return (
      <View key={i} style={styles.cardPlayer} >
        <Avatar
          size={55}
          rounded
          source={{ uri: user.avatar }}
          containerStyle={{
            borderColor: '#c0c0c0',
            borderStyle: 'solid',
            borderWidth: 3,
          }}
        />

        <View style={styles.detailPlayer}>
          <Text style={styles.nameScorePlayer}>{user.username}</Text>
          <Text style={styles.nameScorePlayer}>{user.score}</Text>
        </View>
      </View>
    )
  })

  let [fontLoaded, error] = useFonts({ PressStart2P_400Regular });
  if (!fontLoaded) {
    return <AppLoading />
  }

  return (
    <View style={styles.container}>
      <View style={[styles.subtitle, { backgroundColor: theme.background }]}>
        <Text style={[styles.desc, { color: theme.color }]}>
          Nos meilleurs Veaziteurs
        </Text>
      </View>

      <View style={[styles.best, { backgroundColor: theme.background }]}>
        {bestUserCard}
      </View>

      {directionVisible &&
        <View style={{ alignItems: "center" }} backgroundColor={theme.background} >
          <Text style={{ color: "white", fontFamily: "PressStart2P_400Regular", fontSize: 10, marginBottom: 5, marginTop: 5 }}>{distance}</Text>
          <Text style={{ color: "white", fontFamily: "PressStart2P_400Regular", fontSize: 10, marginBottom: 5 }}>{duration}</Text>
        </View>
      }

      <Overlay
        isVisible={visible}
        onBackdropPress={() => { setVisible(false) }}
        overlayStyle={[styles.overlayStyle, { borderColor: theme.color, backgroundColor: theme.background }]}
      >
        <TouchableOpacity
          style={styles.loveButton}
          onPress={() => addToFavorite(poi[poiSelected].longitude, poi[poiSelected].latitude, poi[poiSelected].title, poi[poiSelected].description, poi[poiSelected].image, poi[poiSelected].categorie)}>
          <FontAwesomeIcon icon={faHeart} color='white' size={25} />
        </TouchableOpacity>

        <View style={styles.overlayPoi}>
          <Image
            source={{ uri: poi[poiSelected].image }}
            style={styles.item}
          />
          <Text style={[styles.titleOverlay, { color: theme.color }]}>{title}</Text>
          <Text style={[styles.descOverlay, { color: theme.color }]}>{description}</Text>
          <TouchableOpacity
            style={[styles.button, { borderColor: theme.color }]}
            onPress={() => {
              launchNavigation(poi[poiSelected].latitude, poi[poiSelected].longitude);
              setPoiScore(poi[poiSelected].score);
            }}>
            <Text
              style={[styles.buttonText, { color: theme.color }]}>Go veazit</Text>
          </TouchableOpacity>


        </View>
      </Overlay>

      <Overlay
        isVisible={visibleWin}
        overlayStyle={[styles.overlayStyle, { borderColor: theme.color, backgroundColor: theme.background }]}
      >
        <View style={styles.overlayPoi}>
          <Image
            source={require('../assets/clap.jpg')}
            style={styles.item}
          />
          <Text style={[styles.titleOverlay, { color: theme.color }]}>Félicitations tu remportes:</Text>
          <Text style={[styles.descOverlay, { color: theme.color }]}>+ {poiScore} points !</Text>

          <TouchableOpacity
            style={[styles.button, { borderColor: theme.color }]}
            onPress={() => addScore(poi[poiSelected].longitude, poi[poiSelected].latitude, poi[poiSelected].title, poi[poiSelected].description, poi[poiSelected].image, poi[poiSelected].categorie)}>
            <Text
              style={[styles.buttonText, { color: theme.color }]}>Veazited</Text>
          </TouchableOpacity>
        </View>

      </Overlay>

      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
        showsUserLocation={location}
        showsCompass={true}
        showsMyLocationButton={location}
        toolbarEnabled={false}
        initialRegion={{
          latitude: 45.764354538707636,
          longitude: 4.835240947932835,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* <Marker
          coordinate={{ latitude: 45.75933548310976, longitude: 4.855602295766094 }}>
          <FontAwesomeIcon icon={faLocationCrosshairs} color='blue' size={25} />
        </Marker> */}

        {directionVisible &&
          <MapViewDirections
            origin={currentPosition}
            destination={destinationLocation}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="hotpink"
            onReady={result => {
              calculateTravel(result.distance, result.duration)
            }}
            onError={(errorMessage) => {
              console.log(errorMessage)
            }}
          />
        }

        {listPointOfInterest}

      </MapView>

      <View style={[styles.progressContainer, { backgroundColor: theme.background }]}>
        < Text style={{ color: "white", fontFamily: "PressStart2P_400Regular", fontSize: 10 }} > Niveau: {userLevel} </Text>
      </View>

      <ProgressBar progress={userScore} height={20} backgroundColor={theme.color} />

      <View style={[styles.progressContainer, { backgroundColor: theme.background }]}>
        <Text style={{ color: "white", fontFamily: "PressStart2P_400Regular", fontSize: 10 }} >{infoMsg}</Text>
      </View>

    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: 30,
  },
  overlayPoi: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 500,
  },
  item: {
    width: 150,
    height: 150,
    borderRadius: 100,
    margin: 30
  },
  best: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5
  },
  cardPlayer: {
    flexDirection: 'row'
  },
  subtitle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '10%',
  },
  desc: {
    fontSize: 13,
    fontFamily: "PressStart2P_400Regular",
    justifyContent: 'center'
  },
  detailPlayer: {
    justifyContent: 'center',
    marginLeft: 3
  },
  nameScorePlayer: {
    color: 'white',
  },
  progressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 25
  },
  overlayStyle: {
    padding: 0,
    borderWidth: 2,
  },
  titleOverlay: {
    fontSize: 13,
    fontFamily: "PressStart2P_400Regular",
    padding: 5,
  },
  descOverlay: {
    marginTop: 20,
    fontSize: 11,
    fontFamily: "PressStart2P_400Regular",
    padding: 5,
  },
  button: {
    width: '65%',
    marginVertical: 20,
    height: 50,
    borderRadius: 30,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: "PressStart2P_400Regular",
    fontSize: 18,
  },
  loveButton: {
    position: 'absolute',
    zIndex: 1,
    top: 20,
    right: 20,
  },
});
