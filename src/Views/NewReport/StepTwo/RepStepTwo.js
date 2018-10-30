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

  async componentDidMount() {
    const { getScreening, report, getScenes } = this.props;
    // console.log(report);
    const response = await report;
    getScreening(response[0].movieid);
    getScenes(response[0].tr_id);
  }

  componentDidUpdate(prevProps) {
    const { scenes, scene, getScenes, report } = this.props;
    // console.log("scenes:", scenes,
    // "prevProps:", prevProps);
    if (scenes.length !== prevProps.scenes.length || scene !== prevProps.scene) {
      getScenes(report[0].tr_id);
    }
  }

  updateScenes = rID => {
    const { getScenes } = this.props;
    getScenes(rID);
  }

  addScene = (e) => {
    const { scene } = this.state;
    const { addScene, report } = this.props;
    addScene(scene, report[0].tr_id);
    this.setState({ scene: "" });
    e.preventDefault();
  }

  renderScenes = () => {
    const { scenes } = this.props;
    let sceneList = scenes.map((scene, i) => (
      <div className="scene-list-cont" key={i}>
        <Scene repScene={scene}/>
      </div>
    ));
    return (<><h3>Added Scenes:</h3>{sceneList}</>);
  }

  render() {
    const { scene } = this.state;
    const { report, screening, scenes } = this.props;
    // console.log(this.props);
    return (
      <div className="step2-cont">
        <h1>{screening[0] ? `${screening[0].title} - Scenes` : "Scenes"}</h1>
        <div className="scene-row-cont" >
          <form className="scene-input-cont" onSubmit={this.addScene}>
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
                className="scene-btn" id="rev-link">Review Report</Link>
              <button 
                className="scene-btn"
                type="submit"
                // value="Submit"
                // onClick={() => this.addScene()} 
                >Add Scene</button>
            </div>
            <div className="link-cont">
              <Link
                to='/admin/report/step1'
                className="link-btn">{`< Previous Step`}</Link>
              <Link 
                to='/admin/report/step3' 
                className="link-btn">Next Step ></Link>
            </div>
          </form>
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