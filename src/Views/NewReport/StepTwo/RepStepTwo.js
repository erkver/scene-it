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
    // console.log(report);
    getScreening(report[0] && +report[0].movieid);
    getScenes(report[0] && +report[0].tr_id);
  }

  componentDidUpdate(prevProps) {
    const { scenes, scene, getScenes, report } = this.props;
    // console.log("scenes:", scenes,
    // "prevProps:", prevProps.scenes);
    if (scenes.length !== prevProps.scenes.length || scene.length !== prevProps.scene.length) {
      getScenes(report[0].tr_id);
    }
  }

  updateScenes = rID => {
    const { getScenes } = this.props;
    getScenes(rID);
  }

  renderScenes = () => {
    const { scenes, getScenes, user } = this.props;
    let sceneList = scenes.map((scene, i) => (
      <div className="scene-list-cont" key={i}>
        <Scene
          repScene={scene}
          user={user}
          updateScenes={getScenes}
        />
      </div>
    ));
    return (<><h3>Added Scenes:</h3>{sceneList}</>);
  }

  render() {
    const { scene } = this.state;
    const { report, screening, scenes, getScenes } = this.props;
    // console.log(this.props);
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
            <div className="add-btn-cont">
              <Link
                to={`/admin/report/final/${report[0] && report[0].tr_id}`}
                className="scene-btn" id="rev-link" >Review Report</Link>
              <button 
                className="scene-btn"
                onClick={() => {
                addScene(scene, report[0].tr_id);
                  this.setState({ scene: "" }, 
                  () => getScenes(report[0].tr_id))}} 
                >Add Scene</button>
            </div>
            <div className="link-cont">
              <Link
                to='/admin/report/step1'
                className="link-btn" >{`< Previous Step`}</Link>
              <Link 
                to='/admin/report/step3' 
                className="link-btn" >Next Step ></Link>
            </div>
          </div>
          <div className="bottom-scene-cont">
            {!scenes[0] 
              ? <></>
              : this.renderScenes()
            }
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