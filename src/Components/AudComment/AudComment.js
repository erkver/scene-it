import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './AudComment.scss';
import axios from 'axios';

class AudComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aCommentInput: '',
      aGender: 'default',
      aAge: 0,
      edit: false
    };
  }

  componentDidMount() {
    const { aComm } = this.props;
    if (aComm) {
      this.setState({
        aCommentInput: aComm.comment,
        aGender: aComm.gender,
        aAge: aComm.age
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { aComm } = this.props;
    if (aComm.gender !== prevProps.aComm.gender) {
      this.getComment(aComm.tac_id);
    } else if (aComm.age !== prevProps.aComm.age) {
      this.getComment(aComm.tac_id);
    } else if (aComm.comment !== prevProps.aComm.comment) {
      this.getComment(aComm.tac_id);
    }
  }

  getComment = id => {
    axios
      .get(`/api/comment/audience/${id}`)
      .then(res => {
        this.setState({
          aCommentInput: res.data[0].comment,
          aGender: res.data[0].gender,
          aAge: res.data[0].age
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    const { aComm, editAudComment, deleteAudComment } = this.props;
    const { edit, aCommentInput, aAge, aGender } = this.state;
    return (
      <div className={!edit ? 'ind-aComm-cont' : 'edit-ind-aComm-cont'}>
        {!edit ? (
          <>
            <div className="aComm-text-cont">
              <p>
                {aComm.gender} - {aComm.age}
              </p>
              <p>"{aComm.comment}"</p>
            </div>
            <button
              id="expand-arr"
              onClick={() => this.setState({ edit: !this.state.edit })}
            >
              <FontAwesomeIcon
                icon="angle-double-down"
                className="expand-arr"
              />
            </button>
          </>
        ) : (
          <>
            <div className="aComm-text">
              <div className="aComm-inputs-cont">
                <div className="name-outlet-cont">
                  <input
                    required
                    placeholder="Age"
                    value={aAge}
                    onChange={e => this.setState({ aAge: e.target.value })}
                  />
                  <select
                    value={aGender}
                    onChange={e => this.setState({ aGender: e.target.value })}
                  >
                    <option disabled hidden value="default">
                      Select Gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <textarea
                  value={aCommentInput}
                  onChange={e =>
                    this.setState({ aCommentInput: e.target.value })
                  }
                  type="text"
                  rows="3"
                />
              </div>
              <button onClick={() => this.setState({ edit: !this.state.edit })}>
                <FontAwesomeIcon
                  icon="angle-double-up"
                  className="expand-arr"
                />
              </button>
            </div>
            <div className="aComm-btn-cont">
              <button
                onClick={() => {
                  deleteAudComment(aComm.tac_id);
                  this.setState({ edit: !edit });
                }}
              >
                Delete comment
              </button>
              <button
                onClick={() => {
                  editAudComment(aComm.tac_id, aGender, aAge, aCommentInput);
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

export default AudComment;
