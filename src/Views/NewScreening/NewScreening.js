import React, { Component } from "react";
import { connect } from "react-redux";
import { getMovies, getMovie } from "../../Ducks/adminReducer";
import { getTheatres } from "../../Ducks/theatreReducer";
import { addScreening } from "../../Ducks/screeningReducer";
import { getUser } from "../../Ducks/userReducer";
import { Link, withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import moment from 'moment';
import "./NewScreening.scss";
import "react-datepicker/dist/react-datepicker.css";



class NewScreening extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      selectedTheatre: {},
      seatCount: ""
    }
    this.handleDate = this.handleDate.bind(this);
    this.handleMovie = this.handleMovie.bind(this);
    this.handleTheatre = this.handleTheatre.bind(this);
    this.clearInputs = this.clearInputs.bind(this);
  }

  componentDidMount() {
    this.props.getMovies();
    this.props.getTheatres();
    this.props.getUser();
  }

  handleDate(date) {
    this.setState({startDate: date})
  }

  handleMovie(e) {
    let selMovie = this.props.movies.filter(event => event.title.includes(e.target.value));
    this.props.getMovie(selMovie[0].id);
    this.setState({selectedMovie: this.props.movie});
  }

  handleTheatre(e) {
    let theatre = this.props.theatres.filter(event => event.theatre_name.includes(e.target.value));
    this.setState({ selectedTheatre: theatre });
  }

  clearInputs() {
    this.setState({seatCount: ""})
  }

  render() {
    const { movies, theatres, addScreening, movie, user } = this.props;
    const { startDate, seatCount, selectedTheatre } = this.state;
    // console.log(this.state);
    // console.log(this.props);
    let movieList = movies.map((movie, i) => (
      <option 
      className="movie-option-cont" 
      key={i}
      onClick={() => this.setState({selectedMovie: movie})}>{movie.title}</option>
    ));
    let theatreList = theatres.map((theatre, i) => (
      <option 
      className="theatre-option-cont" 
      key={i}
      onClick={() => this.setState({selectedTheatre: theatre})}>{theatre.theatre_name}</option>
    ));
    return (
      <div className="new-screening-cont">
        <h1 className="title-text">Add Screening</h1>
        <div className="new-screening-inner-cont">
          <div className="mov-row-cont">
            <p className="desc-text">Title:</p>
            <select 
              required
              onChange={this.handleMovie}>
              {movieList}
            </select>
          </div>
          <div className="mov-row-cont">
            <p className="desc-text">Theatre:</p>
            <select 
              required
              onChange={this.handleTheatre} >
              {theatreList}
            </select>
          </div>
          <div className="mov-row-cont">
            <p className="desc-text">Screening Date and Time:</p>
              <DatePicker 
                selected={startDate}
                onChange={this.handleDate}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
                dateFormat="LLL"
                timeCaption="time"
                className="date-cont"
                placeholderText="Click to select date"
                required
              />
          </div>
          <div className="mov-row-cont" onSubmit={e => this.setState({seatCount: e.target.value})}>
            <p className="desc-text">Seat Count:</p>
            <input 
              type="number"
              min="0"
              required 
              placeholder="#" 
              className="seat-input" 
              value={seatCount}
              onChange={e => this.setState({seatCount: e.target.value})} />
          </div>
          <Link
            to='/' 
            className="submit-btn"
            onClick={() => {addScreening(
              movie.title, 
              `http://image.tmdb.org/t/p/w200/${movie.poster_path}`, 
              movie.release_date, 
              movie.overview, 
              true, 
              startDate._d, 
              user.data.user_id, 
              movie.production_companies[0].name, 
              movie.genres[0].name, 
              movie.homepage, 
              movie.runtime,
              selectedTheatre[0].theatre_id,
              +seatCount
              ); 
              this.clearInputs()
            }}
            >Submit Screening</Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ screeningReducer, adminReducer, theatreReducer, userReducer }) => ({
  ...screeningReducer,
  ...adminReducer,
  ...theatreReducer,
  ...userReducer
});

export default withRouter(connect(mapStateToProps, {getMovies, getTheatres, getMovie, addScreening, getUser})(NewScreening));