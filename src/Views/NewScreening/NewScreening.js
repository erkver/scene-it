import React, { Component } from "react";
import { connect } from "react-redux";
import { getMovies } from "../../Ducks/adminReducer";
import { getTheatres } from "../../Ducks/theatreReducer";
import './NewScreening.scss';
import { withRouter } from "react-router-dom";

class NewScreening extends Component {

  componentDidMount() {
    this.props.getMovies();
    this.props.getTheatres();
  }
  render() {
    const { movies } = this.props;
    console.log(this.props);
    return (
      <div className="new-screening-cont">
        <h1 className="title-text">Add Screening</h1>
        <div className="new-screening-inner-cont">
          <form>
            <p className="desc-text">Title:</p>
            <div className="screening-dropdown">
                <p className="dropdown-item">Message Board</p>
            </div>
            <p className="desc-text">Screening Date: </p>
            <div className="date-cont" >
              <input type="number" placeholder=""  />
            </div>
            <p className="desc-text">Screening Time: {movies.release_date}</p>
            <p className="desc-text">Seat Count: {movies.genres && movies.genres[0].name}</p>
            <button>Submit Screening</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, adminReducer, theatreReducer }) => ({
  ...userReducer,
  ...adminReducer,
  ...theatreReducer
});

export default withRouter(connect(mapStateToProps, {getMovies, getTheatres})(NewScreening));