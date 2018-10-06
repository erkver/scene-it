import React,{ Component } from "react";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      movies: []
    }
  }
  render() {
    const { movies } = this.state;
    let movieList = movies.map((e, i) => {
      return <div key={i}>{e}</div>
  });
    return (
      <div>
        {movieList}
      </div>
    );
  }
}

export default Home;