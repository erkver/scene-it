import React, { Component } from 'react';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import './App.css';
import store from "./Ducks/store";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: []
    }
  }

  componentDidMount() {
    axios.get('/api/moviesDb').then(res => {
      console.log(res.data);
      this.setState({movies: res.data});
    }).catch(err => console.log(err));
  }

  getMovies = () => {
    axios.get('/api/movies').then(res => {
      this.setState({ movies: res.data });
    }).catch(err => console.log(err));
  }

  sendToDb = (title, img_url, release_date, synopsis) => {
    axios.post('api/movies').then(res => {
      this.getMovies();
    }).catch(err => console.log(err));
  }
  render() {
    const { movies } = this.state;
    let movieList = movies.map((e, i) => {
      return <div key={i}>{e}</div>
    });
    return (
      <Provider store={store} >
        <BrowserRouter>
          <div className="App">
          {movieList}
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
