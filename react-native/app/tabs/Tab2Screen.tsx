import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Tab2Screen = () => {
  return (
    <View style={styles.container}>
      <Text>Transactions</Text>
      {/* Add more transaction-related content here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Tab2Screen;
