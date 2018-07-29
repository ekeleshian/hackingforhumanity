/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import api from './api';

type Props = {};
export default class App extends Component<Props> {
  state = { result: null };

  handle_api_test = async () => {
    this.setState(() => ({ result: { hello: 'world' } }));
    // console.log('helloe');
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Help Someone in Need.</Text>
        <Text style={styles.instructions}>
          To get started, prepare your donation items for a photo
        </Text>
        <Button title={'Click to test API'} onPress={this.handle_api_test} />
        <Text>API: {JSON.stringify(this.state.result, null, 2)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    padding: 20,
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});
