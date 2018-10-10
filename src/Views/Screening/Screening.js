import React, { Component } from "react";
import { connect } from "react-redux";
import './Screening.scss';

class Screening extends Component {
  constructor() {
    super();
    this.state = {
      claimed: false
    }
  }
  render() {
    let btnText = 'Get Passes!';
    if(this.state.claimed) {
      btnText = 'Claimed!'
    }
    const { screening } = this.props;
    console.log(screening);
    return (
      <div className="main-screening-cont">
          <h1 className="title-text">{screening.title} screening</h1>
        <div className="screening-cont">
            <img
              src={`http://image.tmdb.org/t/p/w200/${screening.poster_path}`}
              alt={screening.title}
              className="poster" />
            <p className="info-text">Title: {screening.title}</p>
            <p className="info-text">Studio: {screening.production_companies &&screening.production_companies[0].name}</p>
            <p className="info-text">Release Date: {screening.release_date}</p>
            <p className="info-text">Genre: {screening.genres && screening.genres[0].name}</p>
            <p><a className="info-text" href={screening.homepage}>Film Homepage</a></p>
            <p className="info-text">Synopsis: {screening.overview}</p>
            <p className="info-text">Runtime: {screening.runtime} minutes</p>
            {!this.state.claimed
              ? 
              <button 
                  className="add-btn" 
                  onClick={() => this.setState({claimed: !this.state.claimed})}>{btnText}
              </button>
              : 
              <p className="add-text">{btnText}</p>
            }
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer }) => ({ ...userReducer });

export default connect(mapStateToProps)(Screening);
