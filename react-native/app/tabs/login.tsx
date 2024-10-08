import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import { TextInput } from 'react-native-paper';
import { ButtonSolid } from 'react-native-ui-buttons';
import {useForm, Controller} from 'react-hook-form';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { loginUser } from '@/services/api/apiLogin';
import { useNavigation, CommonActions } from '@react-navigation/native';
import navigate from '@/services/navigate';
import SupportButton from '@/components/SupportButton';

const { width, height } = Dimensions.get('window');

const Login = () => {
  const {
    control,
    handleSubmit,
    formState:  {
      errors
    }
  } = useForm();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigation = useNavigation();
  const { login } = useAuth();
  const { handleNavigate } = navigate();


  const onSubmit = async (data: FormData) => {
    try {
      setIsButtonDisabled(true);
      const token = await loginUser(data); // Try logging in
      await login(token); // Save token on Auth
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        })
      );
    } catch (error) {
      setIsButtonDisabled(false); // Set the button back to enabled if login fails
      }
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
      <Controller
        name='username'
        control={control}
        rules={{required: true}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
          label="Usuário"
          style={[styles.input, errors.username && styles.inputError]}
          value={value}
          onBlur={onBlur}
          onChangeText={(text) => onChange(text.toLowerCase())}
          returnKeyType="next"
        />
        )}
      />

        {errors.username && <Text style={styles.errorText}>Campo obrigatório</Text>}
      </View>

      <View style={styles.box}>
        <Controller
          name='password'
          control={control}
          rules={{required: true}}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
            label="Senha"
            style={[styles.input, errors.password && styles.inputError]}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            secureTextEntry
            returnKeyType="done"
          />
          )}
        />
        {errors.password && <Text style={styles.errorText}>Campo obrigatório</Text>}
        <TouchableOpacity onPress={() => handleNavigate('Esqueci minha senha')}>
          <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <ButtonSolid
          title={'Entrar'}
          useColor={'rgb(0, 0, 0)'}
          onPress={handleSubmit(onSubmit)}
          disabled={isButtonDisabled}
          style={styles.button}
          textStyle={styles.buttonText}
        />
      </View>

      <SupportButton />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    marginHorizontal: width * 0.1,
    marginVertical: height * 0.01,
  },
  buttonContainer: {
    marginVertical: height * 0.1,
    marginHorizontal: width * 0.2,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 10,
    padding: 8,
    backgroundColor: '#E7E7E7',
  },
  forgotPassword: {
    marginTop: 8,
    alignSelf: 'flex-end',
    color: 'blue',
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 0.2,
    height: height * 0.08,
    borderRadius: 4,
  },
  button: {
    borderRadius: 10,
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
  inputError: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    marginTop: 4,
  },
});

export default Login;