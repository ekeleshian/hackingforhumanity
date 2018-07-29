/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { RNCamera } from 'react-native-camera';

import { subscribe_donor_alert_number, post_image_data_for_analysis } from './api';

type Props = {};

export default class App extends Component<Props> {
  state = { result: null };

  post_image_data = async base_64_image_data => {
    const result = await post_image_data_for_analysis({ base_64_image_data });
    this.setState(() => ({ result }));
  };

  add_phone_number = async subscribe_to_alerts_phone_number => {
    const result = await subscribe_donor_alert_number({ subscribe_to_alerts_phone_number });
    this.setState(() => ({ result }));
  };

  take_picture = async camera => {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    //  eslint-disable-next-line
    console.log(data.uri);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Help Someone in Need.</Text>
        <Text style={styles.instructions}>
          To get started, prepare your donation items for a photo
        </Text>
        <Button title={'Click to test API'} onPress={() => null} />
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
