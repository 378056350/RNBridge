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

const Sort = () => {
  
  return (
    <View style={styles.container}>
      <Text style={styles.name}>Sort</Text>
    </View>
  );
};

export default Sort;
