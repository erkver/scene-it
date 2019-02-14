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

  componentDidUpdate(prevProps) {
    const { repScene } = this.props;
    if (repScene.scene !== prevProps.repScene.scene) {
      this.getScene(repScene.ts_id);
    }
  }

  getScene = tS_id => {
    axios.get(`/api/scene/${tS_id}`).then(res => {
      this.setState({ sceneInput: res.data[0].scene, edit: false });
    });
  };

  render() {
    const { repScene } = this.props;
    const { edit, sceneInput } = this.state;
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
              <button
                onClick={() => {
                  this.props.deleteScene(repScene.ts_id);
                  this.setState({ edit: !edit });
                }}
              >
                Delete scene
              </button>
              <button
                onClick={() => {
                  this.props.editScene(repScene.ts_id, sceneInput);
                  this.setState({ edit: !edit });
                }}
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
