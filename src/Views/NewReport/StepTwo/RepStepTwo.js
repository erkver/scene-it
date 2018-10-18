import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { getScreenings, getScreening } from "../../../Ducks/screeningReducer";
import "./RepStepTwo.scss";


class RepStepTwo extends Component {
  constructor() {
    super();
    this.state = {
      scene: ''
    }
  }
  render() {
    const { scene } = this.state;
    return (
      <div className="step2-cont">
        <h1>Create Report</h1>
        <div className="scene-row-cont" >
          <p>Important Scenes:</p>
          <textarea
            required
            placeholder="Add one scene at a time"
            value={scene}
            rows="3"
            onChange={e => this.setState({ scene: e.target.value })}
          />
          <button>Add Scene</button>
          <div className="link-cont">
            <Link to='/admin/reports' className="submit-btn" >Cancel Report</Link>
            <Link to='/admin/add/report/2' className="submit-btn">Next Step</Link>
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

export default withRouter(connect(mapStateToProps, { getScreenings, getScreening })(RepStepTwo));