import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import './Scene.scss';

class Scene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sceneInput: '',
      edit: false
    };
  }

  componentDidMount() {
    const { repScene } = this.props;
    if (repScene) {
      this.setState({ sceneInput: repScene.scene });
    }
  }

  editScene = () => {
    this.props.editScenes(
      this.props.repScene.ts_id,
      this.state.sceneInput,
      this.props.repId
    );
    this.setState({ edit: !this.state.edit });
  };

  deleteScene = () => {
    const { repScene } = this.props;
    this.props.deleteScenes(repScene.ts_id, this.props.repId);
    this.setState({ edit: !this.state.edit });
  };

  // editScenes = (tS_id, scene) => {
  //   axios
  //     .put(`/api/scene/${tS_id}`, { scene })
  //     .then(res => {
  //       console.log(res);
  //       this.setState({ scenes: res.data });
  //     })
  //     .catch(err => console.log(err));
  // };

  deleteScenes = tS_id => {
    axios
      .delete(`/api/scene/${tS_id}`)
      .then(res => {
        console.log(res);
        this.setState({ edit: false });
      })
      .catch(err => console.log(err));
  };

  render() {
    const { repScene } = this.props;
    const { edit, sceneInput } = this.state;
    console.log(repScene);
    return (
      <div className={!edit ? 'ind-scene-cont' : 'edit-ind-scene-cont'}>
        {!edit ? (
          <>
            <p>{repScene.scene}</p>
            <button onClick={() => this.setState({ edit: !this.state.edit })}>
              <FontAwesomeIcon
                icon="angle-double-down"
                className="expand-arr"
              />
            </button>
          </>
        ) : (
          <>
            <div className="scene-text">
              <textarea
                value={sceneInput}
                placeholder={sceneInput}
                onChange={e => this.setState({ sceneInput: e.target.value })}
                type="text"
                rows="3"
                required
              />
              <button onClick={() => this.setState({ edit: !this.state.edit })}>
                <FontAwesomeIcon
                  icon="angle-double-up"
                  className="expand-arr"
                />
              </button>
            </div>
            <div className="scene-btn-cont">
              <button onClick={() => this.deleteScene(repScene.ts_id)}>
                Delete scene
              </button>
              <button
                onClick={() => this.editScene(repScene.ts_id, sceneInput)}
              >
                Submit edit
              </button>
            </div>
          </>
        )}
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

export default connect(mapStateToProps)(Scene);
