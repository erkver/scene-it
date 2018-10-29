import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { addPressComment, getPressComments } from "../../../Ducks/pressCommentReducer";
import "./RepStepThree.scss";
import PressComment from "../../../Components/PressComment/PressComment";


class RepStepThree extends Component {
  constructor() {
    super();
    this.state = {
      comment: '',
      name: '',
      outlet: ''
    }
  }

  componentDidMount() {
    const { report, getPressComments } = this.props;
    getPressComments(report[0] && +report[0].tr_id);
  }

  componentDidUpdate(prevProps) {
    const { getPressComments, pressComments, pressComment, report } = this.props;
    // console.log("comments:", pressComments,
    // "prevProps:", prevProps.pressComments);
    if (pressComments.length !== prevProps.pressComments.length || pressComment.length !== prevProps.pressComment.length) {
      getPressComments(report[0].tr_id);
    }
  }

  updatePressComments = repId => {
    const { getPressComments } = this.props;
    getPressComments(repId);
  }

  renderPressComments = () => {
    const { pressComments } = this.props;
    let pressCommList = pressComments.map((prComm, i) => (
      <div className="main-ind-prComm-cont" key={i}>
        <PressComment prComm={prComm} />
      </div>
    ));

    return (<><h3>Added Press Comments</h3>{pressCommList}</>);
  }
  render() {
    const { comment, name, outlet } = this.state;
    const { report, screening, pressComments } = this.props;
    // console.log(this.props);

    return (
      <div className="step3-cont">
        <h1>{screening[0] ? `${screening[0].title} - Press Comments` : "Press Comments"}</h1>
        <div className="press-card-cont" >
          <div className="press-comm-add-cont">
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
                className="submit-btn" >Review Report</Link>
              <button
                className="submit-btn"
                onClick={() => {
                  addPressComment(name, outlet, report[0].tr_id, comment);
                  this.updatePressComments(report[0].tr_id);
                  this.setState({ name: "", outlet: "", comment: "" })
                }}
              >Add Comment</button>
            </div>
            <div className="link-cont">
              <Link 
                to='/admin/report/step2'
                className="link-btn" >{`< Previous Step`}</Link>
              <Link
                to='/admin/report/step4'
                className="link-btn" >Next Step ></Link>
            </div>
          </div>
          <div className="bottom-prComm-cont">
            {!pressComments[0] 
              ? <></>
              : this.renderPressComments()
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
  pressCommentReducer,
  screeningReducer
}) => ({
  ...reportReducer,
  ...userReducer,
  ...pressCommentReducer,
  ...screeningReducer
});

export default withRouter(connect(mapStateToProps, { addPressComment, getPressComments })(RepStepThree));