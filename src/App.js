import React, { Component } from "react";
import "./App.css";
import { CardList } from "./components/card-list/card-list.component";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(
        users => {
          this.setState({
            isLoaded: true,
            monsters: users
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    const { error, isLoaded, monsters } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="App">
          <CardList monsters={monsters}></CardList>
        </div>
      );
    }
  }
}
