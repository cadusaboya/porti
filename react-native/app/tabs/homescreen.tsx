import React, { useState } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { Icon } from '@rneui/themed';
import navigate from '@/services/navigate';
import { sendWhatsapp } from '@/services/sendWhatsapp';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useAuth } from '@/hooks/useAuth';
import { fetchUserData } from '@/services/api/apiHomescreen';
import { handleServerError } from '@/services/handleServerError';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {

  const navigation = useNavigation();
  const { token, logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { handleNavigate } = navigate();

  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <View style={styles.row}>
              <View style={styles.supPosition}>
                <Icon
                  reverse
                  name='cash-multiple'
                  type= 'material-community'
                  color='black'
                  size={60}
                  onPress={() => handleNavigate('Calculator')} />
                <Text style={styles.buttonText}>Calculadora</Text>
              </View>
              <View style={styles.supPosition}>
                <Icon
                  reverse
                  name='clipboard-text-clock-outline'
                  type= 'material-community'
                  color='black'
                  size={60}
                  onPress={() => handleNavigate('Portfolios')} />
                <Text style={styles.buttonText}>Meus Portfolios</Text>
              </View>
        </View>
        <View style={styles.row}>
              <View style={styles.supPosition}>
                <Icon
                  reverse
                  name='face-agent'
                  type= 'material-community'
                  color='black'
                  size={60}
                  onPress={sendWhatsapp} />
                <Text style={styles.buttonText}>Suporte</Text>
              </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7E7E7',
  },
  overlay: {
    height: height * 0.15, // 20% of screen height
    marginBottom: height * 0.05, // 5% of screen height
    backgroundColor: '#1c1b1b',
    justifyContent: 'center',
  },
  saldo: {
    color: 'white',
    fontSize: width * 0.06, // 6% of screen width
    marginLeft: width * 0.05,
    fontWeight: 'bold',
    lineHeight: height * 0.04,
  },
  valor: {
    marginLeft: width * 0.15,
    color: 'white',
    fontSize: width * 0.06, // 6% of screen width
    fontWeight: 'bold',
    lineHeight: height * 0.04,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: height * 0.05, // 5% of screen height
  },
  buttonText: {
    color: 'black',
    fontSize: width * 0.03, // 4% of screen width
    fontWeight: 'bold',
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: height * 0.05, // 5% of screen height
  },
  supPosition: {
    justifyContent: 'center',
    alignItems: 'center',

    // Add these lines to add shading
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
},
  helpPosition: {
  position: 'absolute',
  bottom: height * 0.10, // 1.5% of screen height
  right: width * 0.055 , // Adjust right margin to 2% of screen width
  width: width * 0.06, // 11% of screen width
  height: height * 0.035, // 3.5% of screen height
},
});