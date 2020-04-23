import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

const STATUS = {
  LOADING: 'LOADING',
  LOADED: 'LOADED',
  ERROR: 'ERROR'
}

class App extends Component {
  state = {
    textToSearch: '',
    usersList: [],
    status: STATUS.LOADED,
    error: undefined
  }

  handleText = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  searchUser = () => {
    const { textToSearch } = this.state;

    if (textToSearch !== '') {
      this.setState({
        status: STATUS.LOADING
      });
  
      axios
        .get(`https://api.github.com/search/users?q=${textToSearch}`)
        .then((response) => {
          this.setState({
            usersList: response.data.items,
            status: STATUS.LOADED
          });
        })
        .catch((error) => {
          this.setState({
            error: error.name,
            status: STATUS.ERROR
          });
        })
    } else {
      alert ('You should insert an user name.');
    }
  }

  render() {
    const { textToSearch, usersList, status, error } = this.state;

    return (
      <div className="App">
        <h1>github search</h1>
        <input className='input-search' id='textToSearch' name='textToSearch' type='text' value={textToSearch} onChange={this.handleText}></input>
        <button className='button-search' id='search' name='search' onClick={this.searchUser}>SEARCH</button>
        <div>
          {status === STATUS.LOADING && <div className='loading'>LOADING...</div>}
          {status === STATUS.LOADED && 
          <ul>
            {usersList.map((user, index) => (
              <li className='user' key={index}>{user.login}</li>
            ))}
          </ul>}
          {status === STATUS.ERROR && <div>{error}</div>}
        </div>
      </div>
    );
  }
}

export default App;
