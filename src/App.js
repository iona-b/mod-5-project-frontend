import React from 'react';
import {Route, Switch, NavLink, Link} from 'react-router-dom'
import { connect } from 'react-redux';
import './App.css';
import CreateScheduleContainer from './containers/CreateScheduleContainer'
import Home from './containers/Home'
import LoginContainer from './containers/LoginContainer'
import NotFound from './containers/NotFound'
import ProfileContainer from './containers/ProfileContainer'
import ScheduleContainer from './containers/ScheduleContainer'
import SignUpContainer from './containers/SignUpContainer'
import About from './components/About'
import Clock from './components/Clock';
import { logOutUser } from './actions/logOutUser'
import { fetchUser } from './actions/fetchUser';
import { fetchSchedule } from './actions/fetchSchedule'
import whiteNoiseAudio from './images/white-noise.mp3';

class App extends React.Component {

  state = {
    whiteNoisePlaying: false
  }

  whiteNoise = new Audio(whiteNoiseAudio);

  componentDidMount() {
    if(localStorage.token) {
      fetch('http://localhost:3000/persist',{
        headers:{
          "Authorization": `Bearer ${localStorage.token}`
        }
      })
      .then(response => response.json())
      .then(json =>{
        this.handleAuthResponse(json)
      })
    }
  }

  componentDidUpdate() {
    if (this.props.token && !this.props.user.id) {
      this.props.fetchUser(this.props.userId)
    }
    if (this.props.currentSchedule.loaded === false && this.props.currentSchedule.id !== "") {
      this.props.fetchSchedule(this.props.currentSchedule.id)
    }
    return this.state.whiteNoisePlaying === true ? this.whiteNoise.play() : this.whiteNoise.pause()
  }
  
  handleAuthResponse = (json) => {
    if (json.user){
      localStorage.token = json.token
    } 
  }

  handleToggleWhiteNoisePlaying = () => {
    this.setState({
      whiteNoisePlaying: !this.state.whiteNoisePlaying
    })
  }

  handleLogOut = () => {
    this.props.logOutUser()
    localStorage.clear();
  }

  render(){
    return (
      <div className="App">
        {this.props.token ?
        <div>
          <div id="top-nav-bar">
            {/* {this.state.whiteNoisePlaying === true ? 
              <button className=" nav-bar-buttons" id="stop-button" onClick={this.handleToggleWhiteNoisePlaying}><span role="img" aria-label="mute-sound">🔇</span></button>
            :
              <button className="nav-bar-buttons" id="play-button" onClick={this.handleToggleWhiteNoisePlaying}><span role="img" aria-label="musical-note">🎵</span></button>
            } */}
            <Link to='/' >
              <img src={require("./images/always-balanced-long.png")} alt='' id="always-balanced-long" className="centred-divs"/>
            </Link>
            <Clock />
          </div>
          <div id="nav-bar">
            <div className="nav-bar-divs">
              <NavLink to='/' exact className="nav-bar-headings landing-page-elements" >Home</NavLink>
            </div>
            <div className="nav-bar-divs">
              <NavLink to='/profile' className="nav-bar-headings landing-page-elements" >Profile</NavLink>
            </div>
            <div className="nav-bar-divs">
              <NavLink to='/createschedule' className="nav-bar-headings landing-page-elements" >Create Schedule</NavLink>
            </div>
            <div className="nav-bar-divs">
              <NavLink to='/schedule' className="nav-bar-headings landing-page-elements" >View Schedule</NavLink>
            </div>
            <div className="nav-bar-divs">
              <NavLink to='/about' exact className="nav-bar-headings landing-page-elements" >About</NavLink>
            </div>
            <div className="nav-bar-divs">
              <NavLink to='/' onClick={this.handleLogOut} className="nav-bar-headings landing-page-elements" >Log Out</NavLink>
            </div>
          </div>
          <div id="lower-nav-bar">
            <a id="link-to-github" href="https://github.com/iona-b/always-balanced-frontend/blob/master/README.md">Copyright &copy; Iona Brabender 2020</a> 
          </div>
        </div>
        :
        <div>
          <div id="top-nav-bar">
            <Link to='/' >
              <img src={require("./images/always-balanced-long.png")} alt='' id="always-balanced-long" className="pre-login centred-divs"/>
            </Link>
            <Clock />
          </div>
          <div id="nav-bar">
            <div className="nav-bar-divs">
              <NavLink to='/login' exact className="nav-bar-headings login-nav-bar-heading pre-login" >Login</NavLink>
            </div>
            <div className="nav-bar-divs">
              <NavLink to='/signup' exact className="nav-bar-headings signup-nav-bar-heading pre-login" >Sign Up</NavLink>
            </div>
          </div>
          <div id="lower-nav-bar">
            <a id="link-to-github" className="pre-login" href="https://github.com/iona-b/always-balanced-frontend/blob/master/README.md">Copyright &copy; Iona Brabender 2020</a>
          </div>
        </div>
        }
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/login' component={LoginContainer}/>
          <Route path='/signup' component={SignUpContainer}/>
          <Route path='/createschedule' component={CreateScheduleContainer}/>
          <Route path='/profile' component={ProfileContainer}/>
          <Route path='/schedule' component={ScheduleContainer}/>
          <Route path='/about' component={About}/>
          <Route component={NotFound}/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      userId: state.userReducer.userId,
      user: state.userReducer.user,
      token: state.userReducer.token,
      currentSchedule: state.userReducer.currentSchedule
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: (userId) => dispatch(fetchUser(userId)),
    logOutUser: () => dispatch(logOutUser()),
    fetchSchedule: (schedule) => dispatch(fetchSchedule(schedule))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);