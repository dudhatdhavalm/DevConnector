import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteComment } from "../../Actions/PostActions";

class CommentItem extends Component {
  render() {
    const { comment, postId, authReducer } = this.props;
    return (
      <div className="comments">
        <div className="card card-body mb-3">
          <div className="row">
            <div className="col-md-2">
              <a href="profile.html">
                <img
                  className="rounded-circle d-none d-md-block"
                  src={comment.avatar}
                  alt="avatar"
                />
              </a>
              <br />
              <p className="text-center">{comment.name}</p>
            </div>
            <div className="col-md-10">
              <p className="lead">{comment.text}</p>
              {comment.user === authReducer.user.id ? (
                <button
                  type="button"
                  className="btn btn-danger mr-1"
                  onClick={() => this.deleteComment(postId, comment._id)}
                >
                  <i className="fas fa-times" />
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }

  deleteComment = (postId, commentId) => {
    this.props.deleteComment(postId, commentId);
  };
}

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
  authReducer: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  authReducer: state.authReducer
});

const mapDispatchToProps = {
  deleteComment
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentItem);
