import React, { Component } from 'react';
import { Animated, Text, View } from 'react-native';

class Alert extends Component {
  state = { fadeAnim: new Animated.Value(0), grow: new Animated.Value() };
  componentDidMount() {
    Animated.timing(
      // Animate over time
      //   this.state.fadeAnim,
      //   {
      //     toValue: 1,
      //     duration: 500
      //   },
      this.state.grow,
      {
        toValue: 100,
        duration: 1000
      }
    ).start();
  }
  render() {
    const { fadeAnim, grow } = this.state;
    return (
      <Animated.View
        style={{
          opacity: 1,
          height: grow,
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
