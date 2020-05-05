import React, { Component } from "react";
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  UIManager,
  StyleSheet,
} from "react-native";
const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const DURATION = 250;
export class Deck extends Component {
  // static defaultProps = {
  //   onSwipeLeft: () => {
  //     console.log("44");
  //   },
  //   onSwipeRight: () => {},
  // };
  constructor(props) {
    super(props);
    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          this.swipeRight();
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          this.swipeLeft();
        } else this.resetPosition();
      },
    });
    this.state = {
      panResponder,
      position,
      index: 0,
    };
  }
  componentWillReceiveProps(nextProp) {
    if (nextProp.data !== this.props.data) {
      this.setState({ index: 0 });
    }
  }
  componentWillUpdate() {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }
  swipeLeft() {
    Animated.timing(this.state.position, {
      toValue: { x: -SCREEN_WIDTH * 1.3, y: 0 },
      duration: DURATION,
    }).start(() => this.onSwipeLeftComplete());
  }
  onSwipeLeftComplete() {
    const { onSwipeLeft, data } = this.props;
    const item = data[this.state.index];

    this.state.position.setValue({ x: 0, y: 0 });
    this.setState({ index: this.state.index + 1 });
    onSwipeLeft(item);
  }
  onSwipeRightComplete() {
    const { onSwipeRight, data } = this.props;
    const item = data[this.state.index];
    onSwipeRight(item);
    this.state.position.setValue({ x: 0, y: 0 });
    this.setState({ index: this.state.index + 1 });
  }
  swipeRight() {
    Animated.timing(this.state.position, {
      toValue: { x: SCREEN_WIDTH, y: 0 },
      duration: DURATION,
    }).start(() => this.onSwipeRightComplete());
  }
  resetPosition() {
    Animated.spring(this.state.position, {
      toValue: { x: 0, y: 0 },
    }).start();
  }
  getCardStyle() {
    const { position } = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 2, 0, SCREEN_WIDTH * 2],
      outputRange: ["-120deg", "0deg", "120deg"],
    });
    return {
      ...this.state.position.getLayout(),
      transform: [{ rotate }],
    };
  }
  renderCards() {
    if (this.state.index >= this.props.data.length) {
      return this.props.renderNoMoreCards();
    }
    return this.props.data
      .map((item, i) => {
        if (i < this.state.index) {
          return null;
        }
        if (i === this.state.index) {
          return (
            <Animated.View
              key={item.id}
              style={[this.getCardStyle(), styles.cardStyle, { zIndex: 99 }]}
              {...this.state.panResponder.panHandlers}
            >
              {this.props.renderCards(item)}
            </Animated.View>
          );
        }

        return (
          <Animated.View
            key={item.id}
            style={[
              styles.cardStyle,
              { top: 10 * (i - this.state.index), zIndex: 5 },
            ]}
          >
            {this.props.renderCards(item)}
          </Animated.View>
        );
      })
      .reverse();
  }
  render() {
    return <View>{this.renderCards()}</View>;
  }
}

const styles = StyleSheet.create({
  cardStyle: {
    position: "absolute",
    width: SCREEN_WIDTH,
  },
});
export default Deck;
