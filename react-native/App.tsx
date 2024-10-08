import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './app/AppNavigator';
import { registerRootComponent } from 'expo';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './context/AuthContext'; // Update the file path here
import { CopilotProvider } from "react-native-copilot";

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <CopilotProvider>
            <AppNavigator />
          </CopilotProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </AuthProvider>
  );
}

registerRootComponent(App);