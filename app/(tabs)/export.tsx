import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ExportScreen: React.FC = () => {
  const handleExport = () => {
    // Add export logic here
    console.log('Exporting data...');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Export Screen</Text>
      <Button title="Export Data" onPress={handleExport} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default ExportScreen;
