import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import QuranList from '../../components/QuranList';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <QuranList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
});

export default App;