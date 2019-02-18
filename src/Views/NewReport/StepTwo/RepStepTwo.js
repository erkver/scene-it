import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getScenes } from '../../../Ducks/sceneReducer';
import { getScreening } from '../../../Ducks/screeningReducer';
import Scene from '../../../Components/Scene/Scene';
import axios from 'axios';
import './RepStepTwo.scss';

class RepStepTwo extends Component {
  constructor() {
    super();
    this.state = {
      scene: '',
      scenes: []
    };
  }

  componentDidMount() {
    const { getScreening, report } = this.props;
    getScreening(report[0] && report[0].movieid);
    this.getAllScenes();
  }

  componentDidUpdate(prevProps, prevState) {
    const { scenes } = this.state;
    if (scenes.length !== prevState.scenes.length) {
      this.getAllScenes();
    }
  }

  getAllScenes = () => {
    const { report } = this.props;
    this.props
      .getScenes(report[0] && report[0].tr_id)
      .then(res => this.setState({ scenes: res.value.data }))
      .catch(err => console.log(err));
  };

  addScene = (e, scene, reportId) => {
    e.preventDefault();
    axios
      .post('/api/scene', { scene, reportId })
      .then(res => this.setState({ scenes: res.data, scene: '' }))
      .catch(err => console.log(err));
  };

  editScenes = (tS_id, scene) => {
    axios
      .put(`/api/scene/${tS_id}`, { scene })
      .then(res => this.setState({ scenes: res.data }))
      .catch(err => console.log(err));
  };

  deleteScenes = tS_id => {
    axios
      .delete(`/api/scene/${tS_id}`)
      .then(res => this.setState({ scenes: res.data }))
      .catch(err => console.log(err));
  };

  renderScenes = () => {
    const { scenes } = this.props;
    let sceneList = scenes.map((scene, i) => (
      <div className="scene-list-cont" key={i}>
        <Scene
          repScene={scene}
          editScene={this.editScenes}
          deleteScene={this.deleteScenes}
          repId={this.props.report[0].tr_id}
        />
      </div>
    ));
    return (
      <>
        <h3>Added Scenes:</h3>
        {sceneList}
      </>
    );
  };

  render() {
    const { scene } = this.state;
    const { report, screening, scenes } = this.props;
    return (
      <div className="step2-cont">
        <h1>{screening[0] ? `${screening[0].title} - Scenes` : 'Scenes'}</h1>
        <div className="scene-row-cont">
          <form
            className="scene-input-cont"
            onSubmit={e => this.addScene(e, scene, report[0].tr_id)}
          >
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
                className="scene-btn"
                id="rev-link"
              >
                Review Report
              </Link>
              <button className="scene-btn">Add Scene</button>
            </div>
            <div className="link-cont">
              <Link
                to="/admin/report/step1"
                className="link-btn"
              >{`< Previous Step`}</Link>
              <Link to="/admin/report/step3" className="link-btn">
                Next Step >
              </Link>
            </div>
          </form>
          <div className="bottom-scene-cont">
            {!scenes[0] ? <></> : this.renderScenes()}
          </div>
        </div>
      </div>
    );
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

export default connect(
  mapStateToProps,
  { getScreening, getScenes }
)(RepStepTwo);
