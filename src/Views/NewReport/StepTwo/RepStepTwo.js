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
    const { getScreening, report, getScenes } = this.props;
    console.log(report);
    getScreening(report[0] && +report[0].movieid);
    getScenes(report[0] && +report[0].tr_id);
  }

  componentDidUpdate(prevProps) {
    const { scenes, scene, getScenes, report } = this.props;
    // console.log("scenes:", scenes,
    // "prevProps:", prevProps.scenes);
    if(scenes.length !== prevProps.scenes.length) {
      getScenes(report[0].tr_id);
    }
  }

  updateScenes = rID => {
    const { getScenes } = this.props;
    getScenes(rID);
  }

  render() {
    const { scene } = this.state;
    const { report, screening, scenes, user } = this.props;
    console.log(this.props);
    let sceneList = scenes.map((scene, i) => (
      <div className="scene-list-cont" key={i}>
        <Scene 
          repScene={scene}
          user={user}
          updateScenes={this.updateScenes}
        />
      </div>
    ));
    return (
      <div className="step2-cont">
        <h1>{screening[0] ? `${screening[0].title} - Scenes` : "Scenes"}</h1>
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
              addScene(scene, report[0].tr_id);
              this.updateScenes(report[0].tr_id);
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