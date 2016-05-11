import React from 'react';
import {View, Text, StyleSheet} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
    },
    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
    },
    instructions: {
        textAlign: "center",
        color: "#333333",
        marginBottom: 5,
    },
});

class Register extends React.Component {
  render(){
    return (
      <View style={styles.container}>
        <Text>Register page</Text>
        <Button onPress={Actions.home}> Go to Home</Button>
        <Button onPress={Actions.pop}>Back</Button>
      </View>
    );
  }
};

module.exports = Register;
