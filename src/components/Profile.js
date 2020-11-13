import React from 'react';
import { connect } from 'react-redux'
import UpdateProfileModal from "./UpdateProfileModal";
import UpdateRelaxationCategoryPreferencesModal from "./UpdateRelaxationCategoryPreferencesModal";
import TasksModal from "./TasksModal";
import DeleteProfileModal from "./DeleteProfileModal";

class Profile extends React.Component {

  state = {
    showUpdateProfile: false,
    showUpdateRelaxationCategoryPreferences: false,
    showTasks: false,
    showDeleteProfile: false
  }

  handleClick = event => {
    this.setState ({
      [event.target.name]: !this.state[event.target.name]
    })
  }

  handleUpdateSubmit = () => {
    this.setState({showUpdateProfile: false})
  }

  render() {
    return (
      <div id="profile-div">
        {this.state.showUpdateProfile === true ? <UpdateProfileModal handleClick={this.handleClick} handleUpdateSubmit={this.handleUpdateSubmit} /> : null }
        {this.state.showUpdateRelaxationCategoryPreferences === true ? <UpdateRelaxationCategoryPreferencesModal handleClick={this.handleClick} /> : null }
        {this.state.showTasks === true ? <TasksModal handleClick={this.handleClick} /> : null }
        {this.state.showDeleteProfile === true ? <DeleteProfileModal handleClick={this.handleClick} /> : null }
        {this.state.showDeleteProfile === false && this.state.showTasks === false && this.state.showUpdateProfile === false && this.state.showUpdateRelaxationCategoryPreferences === false ?
          <div className="menus centred-divs" >
            <button name="showUpdateProfile" className="menu-buttons" onClick={this.handleClick}>Update Profile</button>
            <button name="showUpdateRelaxationCategoryPreferences" className="menu-buttons" onClick={this.handleClick}>Update Relaxation Preferences</button>
            <button name="showTasks" className="menu-buttons" onClick={this.handleClick} >Update Tasks</button>
            <button name="showDeleteProfile" className="menu-buttons" onClick={this.handleClick}>Delete Profile</button>
          </div>
        :
          null
        }
      </div>
    );
  }

}

const mapStateToProps = state => {
    return {
      user: state.userReducer.user
    }
}

export default connect(mapStateToProps, null)(Profile);