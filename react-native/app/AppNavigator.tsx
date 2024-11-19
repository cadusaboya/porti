// AppNavigator.js

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './tabs/homescreen';
import Header from '@/components/Header';
import Register from './tabs/register';
import Welcome from './tabs/welcome';
import Login from './tabs/login';
import ForgotPassword from './tabs/forgotpassword';
import Profile from './tabs/profile';
import Calculator from './tabs/calculator';
import Result from './tabs/result';
import Portfolios from './tabs/portfolios';
import PortfolioDetails from './tabs/portfoliodetails';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        header: () => <Header />, // Use your custom header for all screens
      }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Registro" component={Register} />
      <Stack.Screen name="Entrar" component={Login} />
      <Stack.Screen name="Esqueci minha senha" component={ForgotPassword} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Calculator" component={Calculator} />
      <Stack.Screen name="Result" component={Result} />
      <Stack.Screen name="Portfolios" component={Portfolios} />
      <Stack.Screen name="PortfolioDetails" component={PortfolioDetails} />
    </Stack.Navigator>
  );
};

export default AppNavigator;