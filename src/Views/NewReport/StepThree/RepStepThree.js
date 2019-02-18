import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPressComments } from '../../../Ducks/pressCommentReducer';
import PressComment from '../../../Components/PressComment/PressComment';
import axios from 'axios';
import './RepStepThree.scss';

class RepStepThree extends Component {
  constructor() {
    super();
    this.state = {
      comments: [],
      comment: '',
      name: '',
      outlet: ''
    };
  }

  componentDidMount() {
    this.getAllComments(this.props.report[0].tr_id);
  }

  componentDidUpdate(prevProps, prevState) {
    const { comments } = this.state;
    if (comments.length !== prevState.comments.length) {
      this.getAllComments(this.props.report[0].tr_id);
    } else if (
      comments.length === 1 &&
      comments[0].name !== prevState.comments[0].name
    ) {
      this.getAllComments(this.props.report[0].tr_id);
    } else if (
      comments.length === 1 &&
      comments[0].comment !== prevState.comments[0].comment
    ) {
      this.getAllComments(this.props.report[0].tr_id);
    } else if (
      comments.length === 1 &&
      comments[0].outlet !== prevState.comments[0].outlet
    ) {
      this.getAllComments(this.props.report[0].tr_id);
    }
  }

  getAllComments = id => {
    this.props
      .getPressComments(id)
      .then(res => this.setState({ comments: res.value.data }))
      .catch(err => console.log(err));
  };

  addPrComments = e => {
    const { name, outlet, comment } = this.state;
    const reportId = this.props.report[0].tr_id;
    e.preventDefault();
    axios
      .post('/api/comment/press', {
        name,
        outlet,
        reportId,
        comment
      })
      .then(res => {
        this.setState({
          comments: res.data,
          name: '',
          outlet: '',
          comment: ''
        });
      })
      .catch(err => console.log(err));
  };

  editComment = (tPC_id, name, outlet, comment) => {
    axios
      .put(`/api/comment/press/${tPC_id}`, {
        name,
        outlet,
        comment
      })
      .then(res => {
        this.setState({
          comments: res.data,
          name: '',
          outlet: '',
          comment: ''
        });
      })
      .catch(err => console.log(err));
  };

  deleteComment = id => {
    axios
      .delete(`/api/comment/press/${id}`)
      .then(res => this.setState({ comments: res.data }))
      .catch(err => console.log(err));
  };

  renderPressComments = () => {
    const { pressComments } = this.props;
    let pressCommList = pressComments.map((prComm, i) => (
      <div className="main-ind-prComm-cont" key={i}>
        <PressComment
          prComm={prComm}
          editComment={this.editComment}
          deleteComment={this.deleteComment}
        />
      </div>
    ));
    return (
      <>
        <h3>Added Press Comments</h3>
        {pressCommList}
      </>
    );
  };

  render() {
    const { comment, name, outlet } = this.state;
    const { report, screening, pressComments } = this.props;
    return (
      <div className="step3-cont">
        <h1>
          {screening[0]
            ? `${screening[0].title} - Press Comments`
            : 'Press Comments'}
        </h1>
        <div className="press-card-cont">
          <form className="press-comm-add-cont" onSubmit={this.addPrComments}>
            <p>Press comment:</p>
            <textarea
              required
              placeholder="Add one comment at a time"
              value={comment}
              rows="3"
              onChange={e => this.setState({ comment: e.target.value })}
            />
            <div className="press-comm-cont">
              <p>Press Member:</p>
              <input
                required
                placeholder="Name"
                value={name}
                onChange={e => this.setState({ name: e.target.value })}
              />
            </div>
            <div className="press-comm-cont">
              <p>Outlet:</p>
              <input
                required
                placeholder="Oulet"
                value={outlet}
                onChange={e => this.setState({ outlet: e.target.value })}
              />
            </div>
            <div className="add-btn-cont">
              <Link
                id="comm-link"
                to={`/admin/report/final/${report[0] && report[0].tr_id}`}
                className="submit-btn"
              >
                Review Report
              </Link>
              <button
                className="submit-btn"
                type="submit"
                value="Submit"
                // onClick={() => this.addPrComments()}
              >
                Add Comment
              </button>
            </div>
            <div className="link-cont">
              <Link
                to="/admin/report/step2"
                className="link-btn"
              >{`< Previous Step`}</Link>
              <Link to="/admin/report/step4" className="link-btn">
                Next Step >
              </Link>
            </div>
          </form>
          <div className="bottom-prComm-cont">
            {!pressComments[0] ? <></> : this.renderPressComments()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  reportReducer,
  userReducer,
  pressCommentReducer,
  screeningReducer
}) => ({
  ...reportReducer,
  ...userReducer,
  ...pressCommentReducer,
  ...screeningReducer
});

export default connect(
  mapStateToProps,
  { getPressComments }
)(RepStepThree);
