import React from 'react';
import { useState } from 'react';
import { View, StyleSheet, Dimensions, Text, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { ButtonSolid } from 'react-native-ui-buttons';
import {useForm, Controller} from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { sendPasswordResetRequest } from '@/services/api/apiForgotPassword';
import SupportButton from '@/components/SupportButton';

const { width, height } = Dimensions.get('window');

export default function ForgotPassword() {
  const {
    control,
    handleSubmit,
    formState:  {
      errors
    }
  } = useForm();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigation = useNavigation();

  const onSubmit = async (data: FormData) => {
    try {
      setIsButtonDisabled(true);
      await sendPasswordResetRequest(data);
      Alert.alert('E-mail enviado', 'Verifique sua caixa de spam ou de entrada para redefinir sua senha');
      navigation.goBack();
    } catch (error) {
      setIsButtonDisabled(false);
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
            name='email'
            control={control}
            rules={{required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/}}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                label="Email"
                style={[styles.input, errors.email && styles.inputError]}
                value={value}
                onBlur={onBlur}
                onChangeText={(text) => onChange(text.toLowerCase())}
                keyboardType="email-address"
                returnKeyType="done"
              />
            )}
          />
          {errors.email && <Text style={styles.errorText}>Email inválido</Text>}
        </View>

      <View style={styles.buttonContainer}>
        <ButtonSolid
          title={'Recuperar Senha'}
          useColor={'rgb(0, 0, 0)'}
          onPress={handleSubmit(onSubmit)}
          disabled={isButtonDisabled}
          style={styles.button}
        />
      </View>
      <SupportButton />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    marginHorizontal: width * 0.1, // 10% of screen width
    marginVertical: height * 0.01, // 1% of screen height
  },
  buttonContainer: {
    marginVertical: height * 0.1, // 10% of screen height
    marginHorizontal: width * 0.2, // 20% of screen width
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 10,
    padding: 8,
    backgroundColor: '#E7E7E7',
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 0.2,
    height: height * 0.08, // 8% of screen height
    borderRadius: 4,
  },
  button: {
    borderRadius: 10,
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
  inputError: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    marginTop: 4,
  },
});