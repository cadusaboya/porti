import { Linking } from 'react-native';

// Function to send a WhatsApp message to a specific phone number
export const sendWhatsapp = () => {
    const phoneNumber = '5591984147769';  // Note: remove the '+' sign for the universal link
    const message = 'Olá, estou com um problema referente ao aplicativo Factor. Você pode me ajudar?';
    const encodedMessage = encodeURIComponent(message);

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    Linking.openURL(whatsappUrl)
        .then(() => console.log('WhatsApp opened'))
        .catch((error) => console.error('Error opening WhatsApp:', error));
};