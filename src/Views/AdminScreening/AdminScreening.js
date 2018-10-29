import React, { Component } from "react";
import { connect } from "react-redux";
import { getScreening } from "../../Ducks/screeningReducer";
import { withRouter, Link } from "react-router-dom";
import { getTheatres } from "../../Ducks/theatreReducer";
import { getFill } from "../../Ducks/favoritesReducer";
import "react-datepicker/dist/react-datepicker.css";
import "./AdminScreening.scss";

class AdminScreening extends Component {
  componentDidMount() {
    const { getScreening, getFill } = this.props;
    const { id } = this.props.match.params;
    getScreening(+id);
    getFill(+id);
  }

  renderContent = () => {
    const { screening, fill } = this.props;
    // const { date, seatCount, selectedTheatre } = this.state;
    // console.log(this.props);
    let screeningInfo = screening.map((e, i) => (
      <div className="main-single-screening-cont" key={i}>
        <h1 className="title-text">{e.title} Info</h1>
        <div className="single-screening-cont">
          <img
            src={e.img_url}
            alt={e.title}
            className="poster"
          />
          <p className="info-text">Title: {e.title}</p>
          <p className="info-text">Studio: {e.studio}</p>
          <p className="info-text">Release Date: {e.release_date}</p>
          <p className="info-text">Runtime: {!e.runtime ? "TBD" : `${e.runtime} minutes`}</p>
          <p className="info-text">Screening Date: {e.screening_date}</p>
          <p className="info-text">Theatre: {e.theatre_name}</p>
          <p className="info-text">Fill: {fill}/{e.seat_count}</p>
          <p className="info-text">Ratio: {(fill / e.seat_count).toFixed(1)}:1</p>
          <div className="data-btn-cont">
            <Link
              className="edit-btn"
              to={`/admin/screening/edit/${e.id}`}>Edit Screening
          </Link>
            <Link
              className="edit-btn"
              to={`/admin/data/${e.id}`}>View Screening Data
          </Link>
          </div>
        </div>
      </div>
    ));
    return <>{screeningInfo}</>;
  }
  render() {
    const { screening } = this.props;
    return (!screening[0] ? <p>Loading...</p> : this.renderContent());
  }
}

const mapStateToProps = ({
  screeningReducer,
  theatreReducer,
  userReducer,
  favoritesReducer
}) => ({
  ...screeningReducer,
  ...theatreReducer,
  ...userReducer,
  ...favoritesReducer
});

export default withRouter(connect(mapStateToProps, {getTheatres, getScreening, getFill})(AdminScreening));
