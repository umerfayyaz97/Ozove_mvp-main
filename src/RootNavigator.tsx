import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SplashScreen from './Screens/SplashScreen/SplashScreen';
import LoginScreen from './Screens/Login/LoginScreen';
import MainScreen from './Screens/Main/MainScreen';
import Verify from './Screens/Login/Verify';
import UserRegistration from './Screens/Login/UserRegistration';
import TestScreen from './Screens/Main/TestScreen';
import AccountScreen from './Screens/Main/AccountScreen';
import CustomDrawerContent from './Components/CustomDrawerContent';
import BookingsScreen from './Screens/Main/BookingsScreen';
import HelpScreen from './Screens/Main/HelpScreen';
import AppSettingsScreen from './Screens/Main/AppSettingsScreen';
import QrScanner from './Screens/Main/Payment/QrScanner';
import Scanner from './Screens/Main/Payment/Scanner';
import PaymentScreen from './Screens/Main/Payment/PaymentScreen';

// Create the necessary navigators
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Define the Drawer Navigator
const MainDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
      }}>
      <Drawer.Screen name="Main" component={MainScreen} />
      <Drawer.Screen name="Account" component={AccountScreen} />
      <Drawer.Screen name="Bookings" component={BookingsScreen} />
      <Drawer.Screen name="Help" component={HelpScreen} />
      <Drawer.Screen name="AppSettings" component={AppSettingsScreen} />
    </Drawer.Navigator>
  );
};

// Define the Root Navigator
const RootNavigator = ({isSignedIn}: any) => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Splash" options={{headerShown: false}}>
        {(props: any) => <SplashScreen {...props} isSignedIn={isSignedIn} />}
      </Stack.Screen>
      {isSignedIn ? (
        <Stack.Screen
          name="Main"
          component={MainDrawerNavigator}
          options={{headerShown: false}}
        />
      ) : (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
      )}
      <Stack.Screen
        name="Verify"
        component={Verify}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="QRScanner"
        component={QrScanner}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="scanner"
        component={Scanner}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Payment_screen"
        component={PaymentScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="User_Registration"
        component={UserRegistration}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Test"
        component={TestScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
