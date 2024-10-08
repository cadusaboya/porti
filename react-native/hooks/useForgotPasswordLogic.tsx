import { useState, useEffect, useRef } from 'react';
import { Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { sendPasswordResetRequest } from '@/services/api/apiForgotPassword';
import { checkEmptyFields, validateEmail } from '@/services/validateData';

type FormData = {
  username: string;
  email: string;
};

const useForgotPasswordLogic = () => {
  const { register, setValue, handleSubmit: handleFormSubmit, setError, clearErrors, formState: { errors } } = useForm<FormData>();
  const navigation = useNavigation();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const onSubmit = async (data: FormData) => {
    setIsButtonDisabled(true);
    clearErrors();
    let hasErrors = false;

    // Check for errors
    let ValidEmail = validateEmail(data.email, setError);
    let NoEmptyFields = checkEmptyFields(data, setError);
    
    hasErrors = ValidEmail ||
                NoEmptyFields;

    // If all validations pass, proceed with sending password reset request
    if (!hasErrors) {
      try {
        await sendPasswordResetRequest(data);
        Alert.alert('E-mail enviado', 'Verifique sua caixa de spam ou de entrada para redefinir sua senha');
        navigation.goBack();
      } catch (error) {
        setIsButtonDisabled(false);
      }
    } else {
      Alert.alert('Erro', 'Por favor, preencha todos os campos corretamente.');
      setIsButtonDisabled(false);
    }
  };

  // Save the variables on RHF
  useEffect(() => {
    register('username');
    register('email');
  }, [register]);

  const usernameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);

  return { 
    onSubmit, 
    isButtonDisabled, 
    setValue, 
    usernameRef, 
    emailRef, 
    errors, 
    handleSubmit: handleFormSubmit 
  };
};

export default useForgotPasswordLogic;