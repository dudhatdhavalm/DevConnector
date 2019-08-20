import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { deletePost, addLike, removeLike } from "../../Actions/PostActions";

class PostItem extends Component {
  findUserLike = likes => {
    const { authReducer } = this.props;
    if (likes.filter(like => like.user === authReducer.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { authReducer, post, showActions } = this.props;
    return (
      <div className="posts">
        <div className="card card-body mb-3">
          <div className="row">
            <div className="col-md-2">
              <a href="profile.html">
                <img
                  className="rounded-circle d-none d-md-block"
                  src={post.avatar}
                  alt="avatar"
                />
              </a>
              <br />
              <p className="text-center">{post.name}</p>
            </div>
            <div className="col-md-10">
              <p className="lead">{post.text}</p>
              {showActions ? (
                <span>
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    onClick={() => this.onLikeClick(post._id)}
                  >
                    <i
                      className={classnames("fas fa-thumbs-up", {
                        "text-info": this.findUserLike(post.likes)
                      })}
                    />
                    <span className="badge badge-light">
                      {post.likes.length}
                    </span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    onClick={() => this.onUnlikeClick(post._id)}
                  >
                    <i className="text-secondary fas fa-thumbs-down" />
                  </button>
                  <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                    Comments
                  </Link>
                  {post.user === authReducer.user.id ? (
                    <button
                      type="button"
                      className="btn btn-danger mr-1"
                      onClick={() => this.deletePost(post._id)}
                    >
                      <i className="fas fa-times" />
                    </button>
                  ) : null}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }

  onLikeClick = postId => {
    this.props.addLike(postId);
  };

  onUnlikeClick = postId => {
    this.props.removeLike(postId);
  };

  deletePost = postId => {
    this.props.deletePost(postId);
  };
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  authReducer: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  showActions: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  authReducer: state.authReducer
});

const mapDispatchToProps = {
  deletePost,
  addLike,
  removeLike
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostItem);
