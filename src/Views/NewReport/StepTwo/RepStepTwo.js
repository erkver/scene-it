import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { addScene, getScenes } from "../../../Ducks/sceneReducer";
import { getScreening } from "../../../Ducks/screeningReducer";
import Scene from "../../../Components/Scene/Scene";
import "./RepStepTwo.scss";


class RepStepTwo extends Component {
  constructor() {
    super();
    this.state = {
      scene: ''
    }
  }

  componentDidMount() {
    const { getScreening, report, getScenes, scenes } = this.props;
    getScreening(report[0].movieid);
    getScenes(report[0].tr_id);
  }

  sceneUpdate = reportid => {
    const { getScenes } = this.props;
    getScenes(reportid);
  }

  render() {
    const { scene } = this.state;
    const { report, screening, scenes, user, getScenes } = this.props;
    console.log(this.props);
    let sceneList = scenes.map((scene, i) => (
      <div className="scene-list-cont" key={i}>
        <Scene 
          repScene={scene}
          user={user}
          sceneUpdate={this.sceneUpdate}
        />
      </div>
    ));
    return (
      <div className="step2-cont">
        <h1>{!screening[0] ? `${screening[0].title} - Scenes` : "Scenes"}</h1>
        <div className="scene-row-cont" >
          <div className="scene-input-cont">
            <p>Important Scenes:</p>
            <textarea
              required
              placeholder="Add one scene at a time"
              value={scene}
              rows="3"
              onChange={e => this.setState({ scene: e.target.value })}
            />
            <button onClick={() => {
              addScene(scene, report[0].tr_id).then(response => {
                console.log(response);
                getScenes(report[0].tr_id);
              }); 
              this.setState({scene: ""})}} 
              >Add Scene</button>
            <div className="link-cont">
              <Link to='/admin/reports/review' className="submit-btn" >Review Report</Link>
              <Link 
                to='/admin/report/step3' 
                className="submit-btn" >Next Step</Link>
            </div>
          </div>
          <div className="bottom-scene-cont">
            {!scenes[0] ?
              <>
              </>
              :
              <h3>Added Scenes:</h3>
            }
            {sceneList}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({
  reportReducer,
  userReducer,
  sceneReducer,
  screeningReducer
}) => ({
  ...reportReducer,
  ...userReducer,
  ...sceneReducer,
  ...screeningReducer
});

export default withRouter(connect(mapStateToProps, { addScene, getScreening, getScenes })(RepStepTwo));