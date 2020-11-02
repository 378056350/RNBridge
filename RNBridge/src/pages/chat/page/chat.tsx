import React, {useEffect, useState, useRef} from 'react';
import {View, Text, Button, Image, TouchableOpacity, AppRegistry} from 'react-native';


const styles = {
  container: {
    flex: 1,
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center"
  },
  name: {
    fontSize: 30
  }
};

const Chat = () => {
  
  return (
    <View style={styles.container}>
      <Text style={styles.name}>Chat</Text>
    </View>
  );
};

export default Chat;
