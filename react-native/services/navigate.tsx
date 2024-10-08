import { useNavigation } from '@react-navigation/native';

const navigate = () => {
    const navigation = useNavigation();

    // This function receives a string and navigates to the screen with the same name
    const handleNavigate = (menu) => {
        console.log(`Navigating to ${menu}`);
        navigation.navigate(menu);
      };

    return { handleNavigate };
    
};

export default navigate