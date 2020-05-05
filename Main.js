import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
  Dimensions,
  PanResponder,
} from "react-native";
const people = [
  { id: "1", uri: require("./assets/women1.jpg") },
  { id: "2", uri: require("./assets/women2.jpg") },
  { id: "3", uri: require("./assets/women3.jpg") },
  { id: "4", uri: require("./assets/women4.jpg") },
  { id: "5", uri: require("./assets/women5.jpg") },
  { id: "6", uri: require("./assets/women6.jpg") },
  { id: "7", uri: require("./assets/women7.jpg") },
  { id: "8", uri: require("./assets/women1.jpg") },
  { id: "9", uri: require("./assets/women9.jpg") },
  { id: "10", uri: require("./assets/women10.jpg") },
  { id: "11", uri: require("./assets/women11.jpg") },
  { id: "12", uri: require("./assets/women12.jpg") },
  { id: "13", uri: require("./assets/women13.jpg") },
  { id: "14", uri: require("./assets/women14.jpg") },
  { id: "15", uri: require("./assets/women15.jpg") },
];
const SCREEN_WIDTH = Dimensions.get("window").width;

const SCREEN_HEIGHT = Dimensions.get("window").height;
class Main extends Component {
  constructor(props) {
    super(props);

    this.position = new Animated.ValueXY();
    this.state = {
      currentIndex: 0,
    };
  }

  componentWillMount() {
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        this.position.setValue({
          x: gesture.dx,
          y: gesture.dy,
        });
      },
      onPanResponderRelease: (event, gesture) => {},
    });
  }
  renderCards() {
    return people
      .map((item, i) => {
        return (
          <Animated.View
            {...this.PanResponder.panHandlers}
            key={item.id}
            style={[
              { transform: this.position.getTranslateTransform() },
              {
                height: SCREEN_HEIGHT - 120,
                width: SCREEN_WIDTH,
                padding: 10,
                position: "absolute",
              },
            ]}
          >
            <Image
              source={item.uri}
              style={{ flex: 1, width: null, height: null, borderRadius: 20 }}
            />
          </Animated.View>
        );
      })
      .reverse();
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 60 }}></View>
        <View style={{ flex: 1 }}>{this.renderCards()}</View>
        <View style={{ height: 60 }}></View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default Main;
