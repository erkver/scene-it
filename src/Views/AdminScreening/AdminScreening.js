import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getScreening, clearScreenings } from '../../Ducks/screeningReducer';
import { Link } from 'react-router-dom';
import Spinner from '../../Components/Spinner/Spinner';
import 'react-datepicker/dist/react-datepicker.css';
import './AdminScreening.scss';
import axios from 'axios';

class AdminScreening extends Component {
  constructor() {
    super();
    this.state = {
      fill: 0
    };
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getScreening(+id);
    axios
      .get(`/api/favorites?mov_id=${id}`)
      .then(res => {
        this.setState({ fill: res.data });
      })
      .catch(err => alert(err));
  }

  componentWillUnmount() {
    this.props.clearScreenings();
  }

  renderContent = () => {
    const { fill } = this.state;
    let screeningInfo = this.props.screening.map((e, i) => (
      <div className="main-single-screening-cont" key={i}>
        <h1 className="title-text">{e.title} Info</h1>
        <div className="single-screening-cont">
          <img src={e.img_url} alt={e.title} className="poster" />
          <p className="info-text">Title: {e.title}</p>
          <p className="info-text">Studio: {e.studio}</p>
          <p className="info-text">Release Date: {e.release_date}</p>
          <p className="info-text">
            Runtime: {!e.runtime ? 'TBD' : `${e.runtime} minutes`}
          </p>
          <p className="info-text">Screening Date: {e.screening_date}</p>
          <p className="info-text">Theatre: {e.theatre_name}</p>
          <p className="info-text">
            Fill: {fill}/{e.seat_count}
          </p>
          <p className="info-text">
            Ratio: {(fill / e.seat_count).toFixed(1)}:1
          </p>
          <div className="data-btn-cont">
            <Link className="edit-btn" to={`/admin/screening/edit/${e.id}`}>
              Edit Screening
            </Link>
            <Link className="edit-btn" to={`/admin/data/${e.id}`}>
              View Screening Data
            </Link>
          </div>
        </div>
      </div>
    ));
    return <>{screeningInfo}</>;
  };
  render() {
    return !this.props.screening[0] ? <Spinner /> : this.renderContent();
  }
}

const mapStateToProps = ({ screeningReducer }) => ({ ...screeningReducer });

export default connect(
  mapStateToProps,
  { getScreening, clearScreenings }
)(AdminScreening);
