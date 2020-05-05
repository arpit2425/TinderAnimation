import React, { Component } from "react";
import { Card, Button } from "react-native-elements";
import { StyleSheet, Text, View } from "react-native";
import Ball from "./src/Ball";
import Deck from "./src/Deck";
const DATA = [
  {
    id: 1,
    text: "Card #1",
    uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg",
  },
  {
    id: 2,
    text: "Card #2",
    uri: "http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg",
  },
  // {
  //   id: 3,
  //   text: "Card #3",
  //   uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg",
  // },
  // {
  //   id: 4,
  //   text: "Card #4",
  //   uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg",
  // },
  // {
  //   id: 5,
  //   text: "Card #5",
  //   uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg",
  // },
  // {
  //   id: 6,
  //   text: "Card #6",
  //   uri: "http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg",
  // },
  // {
  //   id: 7,
  //   text: "Card #7",
  //   uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg",
  // },
  // {
  //   id: 8,
  //   text: "Card #8",
  //   uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg",
  // },
];

class App extends Component {
  renderCards(item) {
    return (
      <Card key={item.id} title={item.title} image={{ uri: item.uri }}>
        <Text>{item.text}</Text>
        <Text style={{ marginBottom: 20 }}>I can</Text>
        <Button
          icon={{ name: "code" }}
          title="View"
          backgroundColor="#03a9f4"
        ></Button>
      </Card>
    );
  }
  renderNoMoreCards() {
    return (
      <Card title="All Done">
        <Text>No more Content</Text>
        <Button title="Get More" backgroundColor="#03a9f4"></Button>
      </Card>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <Deck
          data={DATA}
          renderCards={this.renderCards}
          onSwipeLeft={() => {}}
          onSwipeRight={() => {}}
          renderNoMoreCards={this.renderNoMoreCards}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
export default App;
