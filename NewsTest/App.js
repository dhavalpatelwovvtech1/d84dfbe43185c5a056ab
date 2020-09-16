import React, { Component } from 'react';
import {Text,View,StatusBar} from 'react-native'
import Home from './Screens/Home'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Details from './Screens/Details';

const Stack=createStackNavigator()

export default class App extends Component{
  render(){
    return(
      <NavigationContainer>
        <StatusBar backgroundColor='blue'/>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{title:'News',headerStyle:{backgroundColor:'blue'},headerTintColor:'white'}}/>
          <Stack.Screen name="Details" component={Details} options={{title:'News',headerStyle:{backgroundColor:'blue'},headerTintColor:'white'}}/>

          </Stack.Navigator>

      </NavigationContainer>
    )
  }
}