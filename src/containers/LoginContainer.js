import React from 'react';
import LoginForm from '../components/LoginForm';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class LoginContainer extends React.Component {

  componentDidUpdate() {
    if (this.props.userId) {
      this.props.history.push('/')
    }
  }

  render() {

    return (

      <div className="home-div">
        <Link to='/' >
          <button className="buttons back-buttons">⬅</button>
        </Link>
        <img src={require("../images/background-bottom-left.png")} alt='' id="background-bottom-left" />
        <img src={require("../images/background-top-right.png")} alt='' id="background-top-right" />
        <div className="form-containers centred-divs">
            <LoginForm />
            <br></br>
        </div>
      </div>

    );
    
  }

}

const mapStateToProps = state => {
  return {
    userId: state.userReducer.userId
  }
}

export default connect(mapStateToProps, null)(LoginContainer);