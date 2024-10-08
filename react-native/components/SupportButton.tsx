import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Icon } from '@rneui/themed';
import { sendWhatsapp } from '@/services/sendWhatsapp';

const { width, height } = Dimensions.get('window');


// Support button to open support chat on Whatsapp
const SupportButton = () => {
  return (
      <View style={styles.supPosition}>
        <Icon
            reverse
            name='face-agent'
            type= 'material-community'
            color='black'
            size={20}
            onPress={sendWhatsapp} />
      </View>
  );
};

const styles = StyleSheet.create({
    supPosition: {
      position: 'absolute',
      bottom: height * 0.25,
      right: width * 0.055,
      width: width * 0.06,
      height: height * 0.035,
  },
});

export default SupportButton;