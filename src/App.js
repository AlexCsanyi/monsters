import React, { Component } from "react";
import "./App.css";
import { CardList } from "./components/card-list/card-list.component";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      isLoaded: false,
      searchField: ""
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
    const { error, isLoaded, monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="App">
          <input
            type="search"
            placeholder={"search monsters"}
            onChange={e => this.setState({ searchField: e.target.value })}
          ></input>
          <CardList monsters={filteredMonsters}></CardList>
        </div>
      );
    }
  }
}
