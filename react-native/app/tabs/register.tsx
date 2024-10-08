import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, Dimensions, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import { ButtonSolid } from 'react-native-ui-buttons';
import SupportButton from '@/components/SupportButton';
import {useForm, Controller} from 'react-hook-form';
import { createUser } from '@/services/api/apiRegister';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import PrivacyPolicy from '@/components/PrivacyPolicy';
import Checkbox from 'expo-checkbox';

const { width, height } = Dimensions.get('window');

const Register = () => {
    const {
      control,
      handleSubmit,
      watch,
      formState:  {
        errors
      }
    } = useForm();
    const password = watch('password');
    const navigation = useNavigation();
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const onSubmit = async (data: FormData) => {
      try {
          setIsButtonDisabled(true);
          await createUser(data);
          navigation.goBack();
      } finally {
        setIsButtonDisabled(false);
        }
    };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
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
              returnKeyType="next"
            />
            )}
          />
          {errors.password && <Text style={styles.errorText}>Campo obrigatório</Text>}
        </View> 

        <View style={styles.box}>
          <Controller
            name='repeat_password'
            control={control}
            rules={{required: {value: true, message: 'Campo obrigatório'}, 
                    validate: (value) => value === password || 'As senhas não coincidem'}}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                label="Repetir Senha"
                style={[styles.input, errors.repeat_password && styles.inputError]}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                secureTextEntry
                returnKeyType="next"
              />
            )}
          />
          {errors.repeat_password && <Text style={styles.errorText}>{errors.repeat_password.message}</Text>}
        </View>

        <View style={styles.box}>
          <Controller
            name='fullname'
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                label="Nome Completo"
                style={[styles.input, errors.fullname && styles.inputError]}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                returnKeyType="next"
              />
            )}
          />
          {errors.fullname && <Text style={styles.errorText}>Campo obrigatório</Text>}
        </View>

        <View style={styles.box}>
          <Controller
            name='cpf'
            control={control}
            rules={{required: true, pattern: /^\d{11}$/}}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                label="CPF"
                style={[styles.input, errors.cpf && styles.inputError]}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                returnKeyType="next"
              />
            )}
          />
          {errors.cpf && <Text style={styles.errorText}>CPF inválido</Text>}
        </View>

        <View style={styles.box}>
          <Controller
            name='telefone'
            control={control}
            rules={{required: true, pattern: /^\d{11}$/}}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                label="Telefone"
                style={[styles.input, errors.telefone && styles.inputError]}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                returnKeyType="next"
              />
            )}
          />
          {errors.telefone && <Text style={styles.errorText}>Telefone inválido</Text>}
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

        
        <PrivacyPolicy />
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={isChecked}
            onValueChange={setIsChecked}
            style={styles.checkbox}
            color={isChecked ? 'green' : undefined}
          />
          <Text style={styles.label}>Eu li e concordo com a Política de Privacidade</Text>
        </View>

        <View style={styles.buttonContainer}>
          <ButtonSolid
            title={'Criar Conta'}
            useColor={'rgb(0, 0, 0)'}
            onPress={handleSubmit(onSubmit)}
            style={styles.button}
            textStyle={styles.buttonText}
            disabled={isButtonDisabled || !isChecked}
          />
        </View>
      </ScrollView>
      <SupportButton />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7E7E7',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  box: {
    marginHorizontal: width * 0.1, // 10% of screen width
    marginVertical: height * 0.01, // 1% of screen height
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 0.2,
    height: height * 0.07, // 7% of screen height
    borderRadius: 4,
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    marginTop: 4,
  },
  buttonContainer: {
    marginVertical: height * 0.02, // 5% of screen height
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    width: width * 0.6, // Adjust button width to 80% of screen width
    height: height * 0.06, // 7% of screen height
    backgroundColor: '#1c1b1b',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: height * 0.015, // 1.5% of screen height
    paddingHorizontal: width * 0.05, // 5% of screen width
    paddingVertical: height * 0.01, // 1% of screen height

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
  },

  checkboxContainer: {
    flexDirection: 'row',
    marginTop: height * 0.02,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: height * 0.01,
  },
});

export default Register;