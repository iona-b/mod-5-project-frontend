import React from 'react';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import Profile from '../components/Profile';

class ProfileContainer extends React.Component {

  render() {

    return (

      <div className="home-div">
        <Link to='/' >
          <button className="buttons back-buttons">⬅</button>
        </Link>
        <img src={require("../images/background-bottom-left.png")} alt='' id="background-bottom-left"/>
        <img src={require("../images/background-top-right.png")} alt='' id="background-top-right"/>
          <div>
          {this.props.user.id ?
            <div className="profile-container">
              <Profile />
            </div>
          :
            <div className="centred-divs info-divs">
              <h2> Please log in to view your profile </h2>
              <Link to='/' >
                <button className="buttons">Home</button>
              </Link>
            </div>
          }
          </div>
      </div>

    );
    
  }

}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user
  }
}

export default connect(mapStateToProps, null)(ProfileContainer);