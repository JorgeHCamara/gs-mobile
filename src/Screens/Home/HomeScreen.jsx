import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import PlantScreen from '../Plants/PlantScreen';
import { createStackNavigator } from '@react-navigation/stack';
import ViewPlantScreen from '../Plants/ViewPlantScreen';
import AddPlantScreen from '../Plants/AddPlantScreen';
import InfoScreen from '../Info/InfoScreen';
import AccountScreen from '../Conta/AccountScreen';
import HomePage from './HomePage';

// Outras telas do seu aplicativo
const Screen1 = () => <View><Text>Olá</Text></View>
const Screen2 = () => <View><Text>Screen2</Text></View>

const PlantStackNavigator = createStackNavigator();

const PlantStack = () => {
  return (
    <PlantStackNavigator.Navigator initialRouteName="Plantas">
      <PlantStackNavigator.Screen name="Plantas" component={PlantScreen} />
      <PlantStackNavigator.Screen name="AddPlant" component={AddPlantScreen} />
      <PlantStackNavigator.Screen name="ViewPlant" component={ViewPlantScreen} />
    </PlantStackNavigator.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const HomeScreen = () => {

  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Home" 
        component={Screen1}
        options={{ 
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Plantas" 
        component={PlantStack} 
        options={{ 
          tabBarIcon: ({ color, size }) => (
            <Icon name="md-nutrition-outline" color={color} size={size} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Conta" 
        component={AccountScreen} 
        options={{ 
          tabBarIcon: ({ color, size }) => (
            <Icon name="md-person-outline" color={color} size={size} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Info" 
        component={InfoScreen} 
        options={{ 
          tabBarIcon: ({ color, size }) => (
            <Icon name="information-circle" color={color} size={size} />
          ),
        }} 
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
