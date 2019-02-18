import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import './PressComment.scss';

class PressComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pCommentInput: '',
      pName: '',
      pOutlet: '',
      edit: false
    };
  }

  componentDidMount() {
    const { prComm } = this.props;
    if (prComm) {
      this.setState({
        pCommentInput: prComm.comment,
        pName: prComm.name,
        pOutlet: prComm.outlet
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { prComm } = this.props;
    if (prComm.name !== prevProps.prComm.name) {
      this.getComment(prComm.tpc_id);
    } else if (prComm.outlet !== prevProps.prComm.outlet) {
      this.getComment(prComm.tpc_id);
    } else if (prComm.comment !== prevProps.prComm.comment) {
      this.getComment(prComm.tpc_id);
    }
  }

  getComment = id => {
    axios.get(`/api/comment/press/${id}`).then(res => {
      this.setState({
        pCommentInput: res.data[0].comment,
        pName: res.data[0].name,
        pOutlet: res.data[0].outlet
      });
    });
  };

  render() {
    const { prComm, editComment, deleteComment } = this.props;
    const { edit, pCommentInput, pName, pOutlet } = this.state;
    return (
      <div className={!edit ? 'ind-pComm-cont' : 'edit-ind-pComm-cont'}>
        {!edit ? (
          <>
            <div className="pComm-text-cont">
              <p>
                {prComm.name} - {prComm.outlet}
              </p>
              <p>"{prComm.comment}"</p>
            </div>
            <button
              id="expand-arr"
              onClick={() => this.setState({ edit: !edit })}
            >
              <FontAwesomeIcon
                icon="angle-double-down"
                className="expand-arr"
              />
            </button>
          </>
        ) : (
          <>
            <div className="pComm-text">
              <div className="pComm-inputs-cont">
                <div className="name-outlet-cont">
                  <input
                    required
                    placeholder="Name"
                    value={pName}
                    onChange={e => this.setState({ pName: e.target.value })}
                  />
                  <input
                    required
                    placeholder="Oulet"
                    value={pOutlet}
                    onChange={e => this.setState({ pOutlet: e.target.value })}
                  />
                </div>
                <textarea
                  required
                  value={pCommentInput}
                  onChange={e =>
                    this.setState({ pCommentInput: e.target.value })
                  }
                  type="text"
                  rows="3"
                />
              </div>
              <button
                className="close-arr"
                onClick={() => this.setState({ edit: !edit })}
              >
                <FontAwesomeIcon icon="angle-double-up" />
              </button>
            </div>
            <div className="pComment-btns-cont">
              <button
                className="pcomm-btns"
                onClick={() => {
                  deleteComment(prComm.tpc_id);
                  this.setState({ edit: !edit });
                }}
              >
                Delete comment
              </button>
              <button
                className="pcomm-btns"
                onClick={() => {
                  editComment(prComm.tpc_id, pName, pOutlet, pCommentInput);
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

export default PressComment;
