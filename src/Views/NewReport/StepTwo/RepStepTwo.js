import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { addScene } from "../../../Ducks/reportReducer";
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
    const { report } = this.props;
    // console.log(report[0] && report[0].tr_id);
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
          <button onClick={() => {
            addScene(scene, report[0].tr_id); 
            this.setState({scene: ""})}} 
            >Add Scene</button>
          <div className="link-cont">
            <Link to='/admin/reports/review' className="submit-btn" >Review Report</Link>
            <Link 
              to='/admin/add/report/step3' 
              className="submit-btn" >Next Step</Link>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({
  reportReducer,
  userReducer
}) => ({
  ...reportReducer,
  ...userReducer
});

export default withRouter(connect(mapStateToProps, { addScene })(RepStepTwo));