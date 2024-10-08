import React from 'react';
import { View, StyleSheet } from 'react-native';


// White box component for UI
const WhiteBox = ({ children, width, height, innerContainerPadding = 20, borderRadius = 10 }) => {
  return (
    <View style={[styles.container, { width, height, borderRadius: borderRadius }]}>
      <View style={[styles.innerContainer, { padding: innerContainerPadding }]}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    overflow: 'hidden',
  },
  innerContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
});

export default WhiteBox;