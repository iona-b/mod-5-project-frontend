import React from "react";
import { connect } from 'react-redux'
import { deleteUser } from '../actions/deleteUser'
import { logOutUser } from '../actions/logOutUser'

class DeleteProfileModal extends React.Component {

    handleClick = () => {
        this.props.deleteUser(this.props.user.id)
    }

    render() {
        return (
            <div className="form-containers centred-divs">
                <h2> Are you sure you'd like to delete your profile?</h2>
                <button className="buttons" onClick={this.handleClick}>Yes</button>
                <button className="buttons" name="showDeleteProfile" onClick={this.props.handleClick}>No</button>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
      user: state.userReducer.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteUser: (userId) => dispatch(deleteUser(userId)),
        logOutUser: () => dispatch(logOutUser())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteProfileModal);