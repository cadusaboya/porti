// screens/Profile.tsx
import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet, Text, Alert, ActivityIndicator, Dimensions } from 'react-native';
import { Avatar } from '@rneui/themed';
import { Cell, Separator, TableView } from 'react-native-tableview-simple';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { ButtonSolid } from 'react-native-ui-buttons';
import { fetchUserProfile } from '@/services/api/apiProfile';
import { useAuth } from '@/hooks/useAuth';
import { requestDeletion } from '@/services/api/apiDeleteAccount';
import { handleServerError } from '@/services/handleServerError';

const { height, width } = Dimensions.get('window');

export default function Profile() {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const { token, logout } = useAuth();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // Fetch user profile from the backend
  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const fetchedUserProfile = await fetchUserProfile(token);
        setUserData(fetchedUserProfile);
      } catch(error) {
        handleServerError(logout, navigation);
      }
    };
  
    getUserProfile();
  }, []);

  // Logout user
  const handleLogout = () => {
    setIsButtonDisabled(true);
    logout();
    Alert.alert('Sucesso', 'Redirecionando ao menu principal', [
      {
        text: 'OK',
        onPress: () => {
          setIsButtonDisabled(false);
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Welcome' }],
            }));},},]);
      };

      const handleDelete = () => {
        Alert.alert(
          'Deletar conta',
          'Tem certeza? Após confirmar a solitação, sua conta será deletada permanentemente e seu acesso desabilitado.',
          [
            {
              text: 'No',
              onPress: () => {},
              style: 'cancel',
            },
            {
              text: 'Yes',
              onPress: async () => {
                setIsButtonDisabled(true);
                try {
                  await requestDeletion(token);
                  Alert.alert('Sucesso', 'Seu pedido foi enviado ao suporte, em até 24 horas os dados serão deletados e voce será informado', [
                    {
                      text: 'OK',
                      onPress: () => {
                        setIsButtonDisabled(false);
                        navigation.dispatch(
                          CommonActions.reset({
                            index: 0,
                            routes: [{ name: 'Welcome' }],
                          })
                        );
                      },
                    },
                  ]);
                } catch(error) {
                  handleServerError(logout, navigation);
                } 
              },
            },
          ],
          { cancelable: false }
        );
      };

  if (!userData) {
    return (
      <View style={styles.load_container}>
        <ActivityIndicator size="large" color="#b5b5b5" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.nome}>
        <Avatar
          size={width * 0.3}
          rounded
          title={userData.username.substring(0, 2).toUpperCase()}
          containerStyle={{ backgroundColor: 'coral' }}
        />
        <Text style={styles.nombre}>{userData.username}</Text>
      </View>

      <TableView appearance="light" style={styles.table}>
        <FlatList
          data={[
            { id: 1, title: 'Nome Completo:', detail: userData.fullname },
            { id: 3, title: 'CPF:', detail: userData.cpf },
            { id: 4, title: 'E-mail:', detail: userData.email },
            { id: 5, title: 'Telefone:', detail: userData.telefone },
          ]}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, separators }) => (
            <Cell
              cellStyle="RightDetail"
              title={item.title}
              detail={item.detail}
              onHighlightRow={separators.highlight}
              onUnHighlightRow={separators.unhighlight}
            />
          )}
          ItemSeparatorComponent={({ highlighted }) => (
            <Separator isHidden={highlighted} />
          )}
        />
      </TableView>

      <View style={styles.but}>
        <ButtonSolid
          title={'Sair'}
          useColor={'rgb(200, 0, 0)'}
          onPress={handleLogout}
          disabled={isButtonDisabled}
          style={styles.button}
          textStyle={styles.buttonText}
        />
        <ButtonSolid
          title={'Deletar conta'}
          useColor={'rgb(200, 0, 0)'}
          onPress={handleDelete}
          disabled={isButtonDisabled}
          style={styles.buttonDelete}
          textStyle={styles.buttonText}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7E7E7',
  },
  load_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  table: {
    marginTop: height * 0.05,
    borderRadius: width * 0.3,
  },
  nome: {
    marginTop: height * 0.05,
    alignItems: 'center',
  },
  nombre: {
    fontSize: width * 0.06,
    marginTop: height * 0.015,
  },
  but: {
    marginVertical: height * 0.04,
    marginHorizontal: width * 0.1,
  },
  button: {
    borderRadius: width * 0.1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonDelete: {
    borderRadius: width * 0.1,
    width: width * 0.40,
    alignSelf: 'center',
    marginTop: height * 0.03,
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
    fontWeight: 'bold',
  },
});