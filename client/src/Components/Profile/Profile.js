import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import ProfileCreds from "./ProfileCreds";
import ProfileAbout from "./ProfileAbout";
import ProfileGithub from "./ProfileGithub";
import Spinner from "../Common/Spinner";
import PropTypes from "prop-types";
import { getProfileByHandle } from "../../Actions/ProfileActions";

class Profile extends Component {
  render() {
    const { profile, loading } = this.props.profileReducer;

    let profileContent;
    if (profile == null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3">
                Back To Profiles
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileCreds
            education={profile.education}
            experience={profile.experience}
          />
          <ProfileGithub />
        </div>
      );
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }
}

Profile.propTypes = {
  profileReducer: PropTypes.object.isRequired,
  getProfileByHandle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profileReducer: state.profileReducer
});

const mapDispatchToProps = {
  getProfileByHandle
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
