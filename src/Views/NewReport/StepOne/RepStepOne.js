import React,{ Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { getScreenings, getScreening } from "../../../Ducks/screeningReducer";
import { addReport, getReport } from "../../../Ducks/reportReducer";
import "./RepStepOne.scss";


class RepStepOne extends Component {
  constructor() {
    super();
    this.state = {
      attendance: 0,
      ratio: 0,
      reaction: "default"
    }
  }

  componentDidMount() {
    const { getScreenings, getScreening, getReport, report, screening } = this.props;
    getScreenings();
    getScreening(72);
    getReport(22);
    setTimeout(() => {
      this.setState({ attendance: report[0].attendance, ratio: report[0].ratio, reaction: report[0].reaction })
    }, 2000); 
    // if(report[0]) {
    //   getScreening(report[0].movieId);
    //   this.setState({attendance: report[0].attendance, ratio: report[0].ratio, reaction: report[0].reaction});
    // }
  }

  handleMovie = e => {
    let selected = this.props.screenings.filter(event => event.title.includes(e.target.value));
    this.props.getScreening(selected[0].id);
  }

  render() {
  const { screenings, screening, addReport, report } = this.props;
  const { attendance, ratio, reaction } = this.state;
  console.log(this.props);
  console.log(this.state);
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
            {!report[0] ?
              <>
                <select
                  required
                  defaultValue="default"
                  onChange={this.handleMovie}>
                  <option disabled hidden value="default" >Select screening</option>
                  {screeningList}
                </select>
              </>
              : <>
              {screening[0].title}
              </>
            }
          </div>
          <form className="stat-row-cont">
            <p className="screening-select">Attendance:</p>
            <div className="seat-inline-cont" >
              <input
                type="number"
                min="0"
                max={!screening[0] ? "2000" : `${screening[0].seat_count}`}
                required
                placeholder="#"
                className="seat-input"
                value={attendance}
                onChange={e => this.setState({ attendance: e.target.value })} />
              <p>/ {!screening[0] ? 'Seat count' : screening[0].seat_count}</p>
            </div>
          </form>
          <form className="stat-row-cont">
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
          </form>
          <div className="reac-row-cont">
            <p className="reaction-tt">Overall Reaction:</p>
            <select 
              defaultValue={reaction}
              onChange={e => this.setState({reaction: e.target.value})}>
                <option disabled hidden value="default" >Select reaction</option>
                <option value="Excellent">Excellent</option>
                <option value="Above Average">Above Average</option>
                <option value="Average">Average</option>
                <option value="Below Average">Below Average</option>
                <option value="Poor">Poor</option>
            </select>
          </div>
          <div className="link-cont">
            <Link to='/admin/reports' className="submit-btn" >Cancel Report</Link>
            <Link 
              to='/admin/report/step2'
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

export default withRouter(
  connect(
    mapStateToProps, {
      getScreenings, 
      getScreening, 
      addReport, 
      getReport})(RepStepOne));