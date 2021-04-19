/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';

const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');

const App = () => {
  const [ballAnimation, setBallAnimation] = useState(new Animated.Value(0));

  const ballBorderAnimation = {
    borderRadius: ballAnimation,
  };

  const animatedBall = () => {
    Animated.timing(ballAnimation, {
      toValue: -400,
      duration: 1500,
    }).start();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => animatedBall()}>
        <Animated.View
          style={[styles.ball, ballBorderAnimation]}></Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: width,
    alignItems: 'center',
  },
  ball: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: 100,
    backgroundColor: '#7BA0D2',
  },
});

export default App;
