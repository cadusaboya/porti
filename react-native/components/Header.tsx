import React from 'react';
import { Appbar } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import BlankComponent from './BlankComponent';

const Header = () => {
    const navigation = useNavigation();
    const route = useRoute();

    // Function to navigate to the "Home" screen
    const navigateToHome = () => {
        navigation.goBack('');
    };

    // Conditionally render the "home" button only if the current screen is not the initialRouteName
    const renderHomeButton = () => {
        if (route.name !== 'Home' && route.name !== 'Welcome') {
            return <Appbar.Action icon="arrow-left" onPress={navigateToHome} />;
        }
        return <BlankComponent width={61.3} height={0} />;
    };

    // Conditionally render the "profile" button only if the current screen is not the "Registro" or "Welcome" screen
    const renderProfileButton = () => {
        if (route.name !== 'Registro' && route.name !== 'Welcome' && route.name !== 'Entrar' && route.name !== 'Profile') {
            return <Appbar.Action icon="account" onPress={() => navigation.navigate('Profile')} />
        }
        return <BlankComponent width={61.3} height={0} />;
    };

    return (
        <Appbar.Header>
            {renderHomeButton()}
            <Appbar.Content title="Factor" style={{ flex: 1, alignItems: 'center' }} />
            {renderProfileButton()}
        </Appbar.Header>
    );
};

export default Header;