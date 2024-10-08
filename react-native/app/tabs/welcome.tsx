import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, Animated, Dimensions } from 'react-native';
import useWelcomeAnimation from '@/hooks/useWelcomeAnimation';
import SupportButton from '@/components/SupportButton';
import navigate from '@/services/navigate';

const { width, height } = Dimensions.get('window');

const Welcome = () => {
  const { textIndex, fadeAnim, texts, subtexts, images } = useWelcomeAnimation();
  const { handleNavigate } = navigate();

  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <Animated.View style={[styles.center_animation, { opacity: fadeAnim }]}>
          <Text style={styles.saldo}>{texts[textIndex]}</Text>
          <Text style={styles.saldo2}>{subtexts[textIndex]}</Text>
          <Image source={images[textIndex]} style={[styles.image]} resizeMode="contain" />
        </Animated.View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNavigate('Registro')}
          >
            <Text style={styles.buttonText}>Criar Conta</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNavigate('Entrar')}
          >
            <Text style={styles.buttonText}>Já sou usuário</Text>
          </TouchableOpacity>               
        </View>
      </View>
      <SupportButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7E7E7',
  },
  image: {
    marginTop: height * 0.01,
    marginBottom: height * 0.05,
    height: height * 0.3, // 30% of screen height
    width: width * 0.5, // 50% of screen width
  },
  saldo: {
    color: 'black',
    marginTop: height * 0.08, // 8% from top
    fontSize: width * 0.06, // Font size based on screen width
    textAlign: 'center', // Center text horizontally
    fontWeight: 'bold',
    lineHeight: height * 0.04,
  },
  saldo2: {
    color: 'black',
    fontSize: width * 0.04, // Font size based on screen width
    textAlign: 'center', // Center text horizontally
    paddingHorizontal: width * 0.05,
    marginVertical: height * 0.02,
  },
  buttonContainer: {
    alignItems: 'center', // Center buttons horizontally
    marginTop: height * 0.05,
  },
  button: {
    width: width * 0.8, // Adjust button width to 80% of screen width
    height: height * 0.07, // 7% of screen height
    backgroundColor: '#1c1b1b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: height * 0.015, // 1.5% of screen height

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
  buttonText: {
    color: 'white',
    fontSize: width * 0.04, // Font size based on screen width
    fontWeight: 'bold',
    lineHeight: height * 0.03,
  },
  center: {
    alignItems: 'center', // Center content horizontally
    justifyContent: 'center', // Center content vertically
    flex: 1, // Take up full height of screen
  },
  center_animation: {
    alignItems: 'center', // Center content horizontally
    justifyContent: 'center', // Center content vertically
  },
});

export default Welcome;