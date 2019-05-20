import React, { Component } from 'react';
import { Animated, Text, View } from 'react-native';

class Alert extends Component {
  state = { fadeAnim: new Animated.Value(0) };
  componentDidMount() {
    Animated.timing(
      // Animate over time
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: 500
      }
    ).start();
  }
  render() {
    const { fadeAnim } = this.state;
    return (
      <Animated.View
        style={{
          opacity: fadeAnim,
          display: 'block',
          flex: 1,
          backgroundColor: '#2EC4B6',
          padding: 10,
          borderRadius: 5,
          alignItems: 'center'
        }}
      >
        <Text style={{ color: '#fff', fontSize: 18 }}>
          {this.props.children}
        </Text>
      </Animated.View>
    );
  }
}

export default Alert;
