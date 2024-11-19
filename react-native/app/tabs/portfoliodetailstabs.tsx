import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import your individual tab screens
import PortfolioTransactions from './portfoliotransactions';  // Create this screen component
import Tab2Screen from './Tab2Screen';  // Create this screen component

const Tab = createBottomTabNavigator();

const PortfolioDetailsTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Overview" component={Tab2Screen} />
      <Tab.Screen name="Transactions" component={PortfolioTransactions} />
      <Tab.Screen name="Outros" component={Tab2Screen} />
    </Tab.Navigator>
  );
};

export default PortfolioDetailsTabs;
