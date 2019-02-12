import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTheatres } from '../../Ducks/theatreReducer';
import { getScreening } from '../../Ducks/screeningReducer';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import './NewScreening.scss';

class NewScreening extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      theatres: [],
      startDate: moment(),
      selectedTheatre: {},
      selectedMovie: {},
      seatCount: 0,
      newMov: true
    };
    this.handleDate = this.handleDate.bind(this);
    this.handleMovie = this.handleMovie.bind(this);
    this.handleTheatre = this.handleTheatre.bind(this);
    this.clearInputs = this.clearInputs.bind(this);
  }

  componentDidMount() {
    const { path } = this.props.match;
    const { id } = this.props.match.params;
    this.getMovies();
    this.props.getTheatres();
    if (id && path.includes('edit')) {
      this.props.getScreening(+id).then(result => {
        const { data } = result.value;
        this.setState({
          startDate: moment(data[0].screening_date),
          selectedTheatre: {
            theatre_name: data[0].theatre_name,
            theatre_id: data[0].theatre_id
          },
          seatCount: data[0].seat_count,
          newMov: false
        });
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.path !== prevProps.match.path) {
      this.setState({ newMov: !this.state.newMov });
    }
  }

  getMovies = () => {
    axios
      .get('/api/movies')
      .then(res => {
        console.log(res);
        this.setState({ movies: res.data.results });
      })
      .catch(err => alert(err));
  };

  handleDate(date) {
    this.setState({ startDate: date });
  }

  handleMovie(e) {
    let selMovie = this.state.movies.filter(event =>
      event.title.match(e.target.value)
    );
    axios.get(`/api/movie/${selMovie[0].id}`).then(res => {
      console.log(res);
      this.setState({ selectedMovie: res.data });
    });
  }

  handleTheatre(e) {
    let theatre = this.props.theatres.filter(event =>
      event.theatre_name.includes(e.target.value)
    );
    this.setState({ selectedTheatre: theatre });
  }

  clearInputs() {
    this.setState({ seatCount: 0 });
  }

  addScreening = (
    title,
    img_url,
    release_date,
    synopsis,
    isScreening,
    screening_date,
    userId,
    studio,
    genre,
    mov_url,
    runtime,
    theatreId,
    seat_count
  ) => {
    axios
      .post('/api/screening', {
        title,
        img_url,
        release_date,
        synopsis,
        isScreening,
        screening_date,
        userId,
        studio,
        genre,
        mov_url,
        runtime,
        theatreId,
        seat_count
      })
      .then(res => {
        this.props.history.push('/');
        this.clearInputs();
      })
      .catch(err => alert(err));
  };

  editScreening = (id, screening_date, theatreId, seat_count) => {
    axios
      .put(`/api/screening/${id}`, {
        screening_date,
        theatreId,
        seat_count
      })
      .then(res => {
        this.props.history.push('/');
        this.clearInputs();
      })
      .catch(err => alert(err));
  };

  render() {
    const { theatres, user, screening } = this.props;
    const {
      startDate,
      seatCount,
      selectedTheatre,
      newMov,
      selectedMovie
    } = this.state;
    let movieList = this.state.movies.map((movie, i) => (
      <option className="movie-option-cont" key={i}>
        {movie.title}
      </option>
    ));
    let theatreList = theatres.map((theatre, i) => (
      <option
        className="theatre-option-cont"
        key={i}
        value={theatre.theatre_name}
        onClick={() => this.setState({ selectedTheatre: theatre.theatre_name })}
      >
        {theatre.theatre_name}
      </option>
    ));
    return (
      <div className="new-screening-cont">
        <h1 className="title-text">
          {newMov
            ? 'Add Screening'
            : `Edit ${screening[0] && screening[0].title} screening`}
        </h1>
        <div className="new-screening-inner-cont">
          <div className="mov-row-cont">
            <p className="desc-text">Title:</p>
            {!newMov ? (
              <>
                <h3>{screening[0] && screening[0].title}</h3>
              </>
            ) : (
              <>
                <select
                  required
                  defaultValue="default"
                  onChange={this.handleMovie}
                >
                  <option disabled hidden value="default">
                    Select movie
                  </option>
                  {movieList}
                </select>
              </>
            )}
          </div>
          <div className="mov-row-cont">
            <p className="desc-text">Theatre:</p>
            <select
              required
              defaultValue="default"
              value={selectedTheatre ? selectedTheatre.theatre_name : 'default'}
              onChange={this.handleTheatre}
            >
              <option disabled hidden value="default">
                Select theatre
              </option>
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
          <div className="mov-row-cont">
            <p className="desc-text">Seat Count:</p>
            <input
              type="number"
              min="0"
              required
              placeholder="#"
              className="seat-input"
              value={seatCount}
              onChange={e => this.setState({ seatCount: e.target.value })}
            />
          </div>
          {!newMov ? (
            <>
              <button
                className="submit-btn"
                onClick={() =>
                  this.editScreening(
                    screening[0].id,
                    moment(startDate._d).format('lll'),
                    selectedTheatre.theatre_id || selectedTheatre[0].theatre_id,
                    +seatCount
                  )
                }
              >
                Submit Edit
              </button>
            </>
          ) : (
            <>
              <button
                className="submit-btn"
                onClick={() =>
                  this.addScreening(
                    selectedMovie.title,
                    `http://image.tmdb.org/t/p/original/${
                      selectedMovie.poster_path
                    }`,
                    moment(selectedMovie.release_date).format('ll'),
                    selectedMovie.overview,
                    true,
                    moment(startDate._d).format('lll'),
                    user.user_id,
                    selectedMovie.production_companies[0].name,
                    selectedMovie.genres[0].name || 'N/A',
                    selectedMovie.homepage,
                    selectedMovie.runtime || 'N/A',
                    selectedTheatre[0].theatre_id,
                    +seatCount
                  )
                }
              >
                Submit Screening
              </button>
            </>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state.userReducer;
  const { theatres } = state.theatreReducer;
  const { screening } = state.screeningReducer;
  return { user, theatres, screening };
};

export default connect(
  mapStateToProps,
  {
    getTheatres,
    getScreening
  }
)(NewScreening);
