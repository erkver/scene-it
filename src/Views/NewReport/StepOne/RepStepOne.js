import React,{ Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { getScreenings, getScreening } from "../../../Ducks/screeningReducer";
import { addReport } from "../../../Ducks/reportReducer";
import "./RepStepOne.scss";


class RepStepOne extends Component {
  constructor() {
    super();
    this.state = {
      attendance: '',
      ratio: '',
      reaction: ''
    }
  }

  componentDidMount() {
    this.props.getScreenings();
  }

  handleMovie = e => {
    let selected = this.props.screenings.filter(event => event.title.includes(e.target.value));
    this.props.getScreening(selected[0].id);
  }

  render() {
  const { screenings, screening, addReport } = this.props;
  const { attendance, ratio, reaction } = this.state;
  console.log(screening);
  let screeningList = screenings.map((screening, i) => (
    <option
      className="screening-option-cont"
      key={i}>{screening.title}</option>
  ));
    return (
      <div className="new-report-cont">
        <h1>Create Report</h1>
        <div className="new-report-inner-cont">
          <div className="report-row-cont">
            <p className="screening-select">Title:</p>
            <select
              required
              defaultValue="default"
              onChange={this.handleMovie}>
              <option disabled hidden value="default" >Select screening</option>
              {screeningList}
            </select>
          </div>
          <div className="stat-row-cont">
            <p className="screening-select">Attendance:</p>
            <div className="seat-inline-cont" >
              <input
                type="number"
                min="0"
                max={`${screening.seat_count}`}
                required
                placeholder="#"
                className="seat-input"
                value={attendance}
                onChange={e => this.setState({ attendance: e.target.value })} />
              <p>/ {!screening[0] ? 'Seat count' : screening[0].seat_count}</p>
            </div>
          </div>
          <div className="stat-row-cont">
            <p className="ratio-tt">Booking Ratio:</p>
            <div className="ratio-inline-cont" >
              <input
                type="number"
                min=".5"
                max="30"
                required
                placeholder="#"
                className="seat-input"
                value={ratio}
                onChange={e => this.setState({ ratio: e.target.value })} />
              <p>: 1</p>
            </div>
          </div>
          <div className="stat-row-cont">
            <p className="reaction-tt">Overall Reaction:</p>
            <select 
              defaultValue="default"
              onChange={e => this.setState({reaction: e.target.value})}>
                <option disabled hidden value="default" >Select reaction</option>
                <option>Excellent</option>
                <option>Above Average</option>
                <option>Average</option>
                <option>Below Average</option>
                <option>Poor</option>
            </select>
          </div>
          <div className="link-cont">
            <Link to='/admin/reports' className="submit-btn" >Cancel Report</Link>
            <Link 
              to='/admin/add/report/step2'
              onClick={() => addReport(+attendance, +ratio, reaction, screening[0].id)} 
              className="submit-btn">Next Step</Link>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({
  screeningReducer,
  reportReducer,
  userReducer
}) => ({
  ...screeningReducer,
  ...reportReducer,
  ...userReducer
});

export default withRouter(connect(mapStateToProps, {getScreenings, getScreening, addReport})(RepStepOne));