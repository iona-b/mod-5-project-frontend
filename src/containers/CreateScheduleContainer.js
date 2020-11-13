import React from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import { deleteCurrentSchedule } from '../actions/deleteCurrentSchedule'
import { editCurrentSchedule } from '../actions/editCurrentSchedule'
import { fetchSchedule } from '../actions/fetchSchedule'
import ShowExistingTasks from '../components/ShowExistingTasks';
import ScheduleInProgress from '../components/ScheduleInProgress';
import CreateScheduleForm from '../components/CreateScheduleForm'

class CreateScheduleContainer extends React.Component {

  handleClick = () => {
    this.props.deleteCurrentSchedule(this.props.currentSchedule.id)
  }

  handleEdit = () => {
    this.props.editCurrentSchedule(this.props.currentSchedule.id)
  }

  fetchSchedule = () => {
    this.props.fetchSchedule(this.props.currentSchedule.id)
  }

  render() {
    return (
      <div className="home-div"> 
        {this.props.user.id && this.props.currentSchedule.id === ""?
          <div id="create-schedule-container">
            <ScheduleInProgress />
            <CreateScheduleForm updateCurrentSchedule={this.props.updateCurrentSchedule}/>
            <ShowExistingTasks />
          </div>
        :
          null
        }
        {this.props.user.id && this.props.currentSchedule.id !== "" ?
          <div>
            <Link to='/' >
              <button className="buttons back-buttons">⬅</button>
            </Link>
            <img src={require("../images/background-bottom-left.png")} alt='' id="background-bottom-left" />
            <img src={require("../images/background-top-right.png")} alt='' id="background-top-right" />
            <div className="centred-divs info-divs" id="loading-div">
              <h2 id="loading-text">Loading...</h2>
            </div>
            <div className="centred-divs info-divs" id="view-edit-delete-div">
              <h2>You've already created a schedule for today.</h2>
              <p>You can either view today's schedule or delete your current schedule and create a new one</p>
              <Link to='/schedule' >
                <button className="buttons">View</button>
              </Link>
              <button className="buttons" onClick={this.handleEdit}>Edit</button>
              <button className="buttons" onClick={this.handleClick}>Delete</button>
            </div>
          </div>
          :
            null
          }  
          {!this.props.user.id ?  
          <div>
            <img src={require("../images/background-bottom-left.png")} alt='' id="background-bottom-left" />
            <img src={require("../images/background-top-right.png")} alt='' id="background-top-right" />
            <div className="centred-divs info-divs"> 
              <div >
                <h2> Please log in to create your schedule </h2>
                <Link to='/' >
                  <button className="buttons" 
                  onClick={this.fetchSchedule}>Home</button>
                </Link>
              </div>
            </div>
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
    user: state.userReducer.user,
    currentSchedule: state.userReducer.currentSchedule
  }
}

const mapDispatchToProps = dispatch => {
  return {
      deleteCurrentSchedule: (scheduleId) => dispatch(deleteCurrentSchedule(scheduleId)),
      editCurrentSchedule: (scheduleId) => dispatch(editCurrentSchedule(scheduleId)),
      fetchSchedule: (schedule) => dispatch(fetchSchedule(schedule))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateScheduleContainer);