import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class AppHeader extends React.Component {

  render() {
    return (
      <Text style={styles.header}>
        Pocket Dictionary
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    fontSize: 30,
    fontWeight: '500',
    textAlign: 'center',
    backgroundColor: '#1F84D4',
    padding: 10,
    color: 'white',
    fontFamily: 'Quicksand',
    paddingTop: 20,
  },
})