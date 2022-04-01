import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();

import React, { useEffect, useState, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { EventRegister } from 'react-native-event-listeners';

import HomepageScreen from './screens/homepageScreen';
import HomefilterScreen from './screens/homefilterScreen';
import MapScreen from './screens/mapScreen';
import ConnectScreen from './screens/connectScreen';
import FilterScreen from './screens/filterScreen';
import QuestScreen from './screens/questScreen';
import TrophyScreen from './screens/trophyScreen';
import SignupScreen from './screens/signupScreen';
import SigninScreen from './screens/signinScreen';
import TutoScreen from './screens/tutoScreen';
import ParameterScreen from './screens/parameterScreen';
import FavoriteScreen from './screens/favoriteScreen';
import ArchiveScreen from './screens/archiveScreen';
import HowtoScreen from './screens/howtoScreen';
import WhoScreen from './screens/whoScreen';

import theme from './config/theme';
import themeContext from './config/themeContext';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUserAstronaut, faMapLocationDot } from '@fortawesome/free-solid-svg-icons'
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux'
import token from './reducers/token';
import category from './reducers/category'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

//Store de Rédux
const store = createStore(combineReducers({ token, category }))

var fakeComponent = () => {
  return null
}

var StackNavigation = () => {

  const theme = useContext(themeContext);

  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color }) => {
        let iconName;
        if (route.name === 'Map') {
          iconName = faMapLocationDot
        } else if (route.name === 'Profil') {
          iconName = faUserAstronaut
        }
        return <FontAwesomeIcon icon={iconName} color={color} />;
      },
    })}

      tabBarOptions={{
        activeTintColor: theme.color,
        inactiveTintColor: '#4b667f',
        style: {
          backgroundColor: theme.background,
        }
      }}

    >
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Filtre" component={fakeComponent} options={{ tabBarButton: () => (<FilterScreen />), }} />
      <Tab.Screen name="Quête" component={fakeComponent} options={{ tabBarButton: () => (<QuestScreen />), }} />
      <Tab.Screen name="Trophée" component={fakeComponent} options={{ tabBarButton: () => (<TrophyScreen />), }} />
      <Tab.Screen name="Profil" component={ConnectScreen} />
    </Tab.Navigator>
  )
}


export default function App() {

  const [light, setLight] = useState(true);

  //Récupère la data de connect Screen 'dispatchée' pour attribuer la valeur à un booléen
  useEffect(() => {
    EventRegister.addEventListener('myCustomEvent', (data) => {
      setLight(data);
    })
  })


  return (
    //Condition ternaire, si light true alors ... sinon ...
    <themeContext.Provider value={light ? theme.dark : theme.light}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomepageScreen} />
            <Stack.Screen name="HomeFilter" component={HomefilterScreen} />
            <Stack.Screen name="TutoScreen" component={TutoScreen} />
            <Stack.Screen name="StackNavigation" component={StackNavigation} />
            <Stack.Screen name="SignUp" component={SignupScreen} />
            <Stack.Screen name="SignIn" component={SigninScreen} />
            <Stack.Screen name="Parameter" component={ParameterScreen} />
            <Stack.Screen name="Favorite" component={FavoriteScreen} />
            <Stack.Screen name="Archive" component={ArchiveScreen} />
            <Stack.Screen name="Howto" component={HowtoScreen} />
            <Stack.Screen name="Who" component={WhoScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </themeContext.Provider>
  );
}
