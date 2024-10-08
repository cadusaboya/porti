import { Alert } from 'react-native';
import { CommonActions, NavigationProp } from '@react-navigation/native';

export function handleServerError(logout: () => void, navigation: NavigationProp<any>) {
  logout(); // Log user out if the server is down and page fails to load
  Alert.alert( // Show error message and redirect to login page
    'Servidor indisponível',
    'Não foi possível carregar os dados, faça login novamente. Se o problema persistir, entre em contato com o suporte',
    [{
      text: 'OK',
      onPress: () => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Welcome' }]
          })
        );
      }
    }]
  );
}