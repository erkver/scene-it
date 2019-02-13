import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getScreenings, getScreening } from '../../../Ducks/screeningReducer';
import { getReport } from '../../../Ducks/reportReducer';
import axios from 'axios';
import './RepStepOne.scss';

class RepStepOne extends Component {
  constructor() {
    super();
    this.state = {
      attendance: 0,
      ratio: 0,
      reaction: 'default'
    };
  }

  componentDidMount() {
    const { getScreenings, getScreening, report } = this.props;
    if (report[0]) {
      getScreening(report[0].movieid);
      this.setState({
        attendance: report[0].attendance,
        ratio: report[0].ratio,
        reaction: report[0].reaction
      });
    } else {
      getScreenings();
    }
  }

  handleMovie = e => {
    let selected = this.props.screenings.filter(event =>
      event.title.includes(e.target.value)
    );
    console.log(selected);
    this.props.getScreening(selected[0].id);
  };

  createReport = (e, attendance, ratio, reaction, movieId) => {
    e.preventDefault();
    axios
      .post('/api/report', {
        attendance,
        ratio,
        reaction,
        movieId
      })
      .then(() => this.props.history.push('/admin/report/step2'))
      .catch(err => console.log(err));
  };

  editReport = (tr_id, attendance, ratio, reaction) => {
    axios
      .put(`/api/report/${tr_id}`, {
        attendance,
        ratio,
        reaction
      })
      .then(() => {
        console.log('Successfully edited report');
      })
      .catch(err => console.log(err));
  };

  renderScreenings = () => {
    const { screenings } = this.props;
    let screeningList = screenings.map((screening, i) => (
      <option className="screening-option-cont" key={i}>
        {screening.title}
      </option>
    ));
    return <>{screeningList}</>;
  };

  render() {
    const { screenings, screening, report } = this.props;
    const { attendance, ratio, reaction } = this.state;
    return (
      <div className="new-report-cont">
        <h1>{!report[0] ? 'Create Report' : 'Edit Report'}</h1>
        <div className="new-report-inner-cont">
          <form
            className="report-card1-cont"
            onSubmit={e =>
              this.createReport(
                e,
                +attendance,
                +ratio,
                reaction,
                screening[0].id
              )
            }
          >
            <div className="report-row-cont">
              <p className="screening-select">Title:</p>
              {!report[0] ? (
                <>
                  <select
                    required
                    defaultValue="default"
                    onChange={this.handleMovie}
                  >
                    <option disabled hidden value="default">
                      Select screening
                    </option>
                    {!screenings[0] ? <></> : this.renderScreenings()}
                  </select>
                </>
              ) : (
                <>
                  <p className="title-text">
                    {screening[0] && screening[0].title}
                  </p>
                </>
              )}
            </div>
            <div className="stat-row-cont">
              <p className="screening-select">Attendance:</p>
              <div className="seat-inline-cont">
                <input
                  type="number"
                  min="0"
                  max={!screening[0] ? '2000' : `${screening[0].seat_count}`}
                  required
                  placeholder="#"
                  className="seat-input"
                  value={attendance}
                  onChange={e => this.setState({ attendance: e.target.value })}
                />
                <p>
                  / {!screening[0] ? 'Seat count' : screening[0].seat_count}
                </p>
              </div>
            </div>
            <div className="stat-row-cont">
              <p className="ratio-tt">Booking Ratio:</p>
              <div className="ratio-inline-cont">
                <input
                  type="number"
                  min="1"
                  max="30"
                  required
                  placeholder="#"
                  className="seat-input"
                  value={ratio}
                  onChange={e => this.setState({ ratio: e.target.value })}
                />
                <p>: 1</p>
              </div>
            </div>
            <div className="reac-row-cont">
              <p className="reaction-tt">Overall Reaction:</p>
              <select
                value={reaction}
                required
                onChange={e => this.setState({ reaction: e.target.value })}
              >
                <option disabled hidden value="default">
                  Select reaction
                </option>
                <option value="Excellent">Excellent</option>
                <option value="Above Average">Above Average</option>
                <option value="Average">Average</option>
                <option value="Below Average">Below Average</option>
                <option value="Poor">Poor</option>
              </select>
            </div>
            {!report[0] ? (
              <div className="link-cont">
                <Link to="/admin/reports" className="submit-btn">
                  Cancel Report
                </Link>
                <button type="submit" className="submit-btn" value="submit">
                  Next Step
                </button>
              </div>
            ) : (
              <div className="link-cont">
                <Link
                  to={`/admin/report/final/${report[0].tr_id}`}
                  onClick={() =>
                    this.editReport(
                      report[0].tr_id,
                      +attendance,
                      +ratio,
                      reaction
                    )
                  }
                  className="submit-btn"
                >
                  Review Report
                </Link>
                <Link
                  to="/admin/report/step2"
                  onClick={() =>
                    this.editReport(
                      report[0].tr_id,
                      +attendance,
                      +ratio,
                      reaction
                    )
                  }
                  className="submit-btn"
                >
                  Edit Next Step
                </Link>
              </div>
            )}
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ screeningReducer, reportReducer, userReducer }) => ({
  ...screeningReducer,
  ...reportReducer,
  ...userReducer
});

export default connect(
  mapStateToProps,
  {
    getScreenings,
    getScreening,
    getReport
  }
)(RepStepOne);
