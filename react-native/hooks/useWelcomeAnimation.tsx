import { useEffect, useState, useRef } from 'react';
import { Animated } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import preloadImages from '../services/preloadImages';

const useWelcomeAnimation = () => {
  const [textIndex, setTextIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Load texts, subtexts and images from each screen
  const texts = [
    'Receba imediatamente',
    'Tudo ao seu alcance',
    'Relatórios'
  ];

  const subtexts = [
    'Receba o pagamento pelo plantão no mesmo dia em que ele é realizado',
    'Acompanhe a sua agenda de plantões de maneira eficiente',
    'Obtenha relatórios detalhados sobre os seus plantões e ganhos'
  ];

  const images = [
    require('@/assets/images/placeholder_1.png'),
    require('@/assets/images/placeholder_2.png'),
    require('@/assets/images/placeholder_3.png')
  ];

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();

    // Pre load images
    async function loadResourcesAndDataAsync() {
      await preloadImages(images);
    }

    loadResourcesAndDataAsync();
    SplashScreen.hideAsync();

    // Animation to run each one for 5 seconds, where the 1st second is fading in and the last one is fading out
    const initialDelay = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, 4000);

    const interval = setInterval(() => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.delay(3000),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start();

      setTextIndex(prevIndex => (prevIndex + 1) % texts.length);
    }, 5000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, [fadeAnim, texts.length]);

  return { textIndex, fadeAnim, texts, subtexts, images };
};

export default useWelcomeAnimation;