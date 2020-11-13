import React from 'react';
import { connect } from 'react-redux';
import { fetchSchedule } from '../actions/fetchSchedule'
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom'
import AlertModal from "./AlertModal";
import FocusModeSchedule from "./FocusModeSchedule";
import { deleteCurrentSchedule } from '../actions/deleteCurrentSchedule'

class Schedule extends React.Component {

    state = {
        hour: new Date().getHours(),
        minutes: new Date().getMinutes(),
        seconds: new Date().getSeconds(),
        breakTime: false,
        breakLength: 0,
        showFocusModeSchedule: false
    };

    componentDidMount() {
        this.intervalID = setInterval(
            () => this.tick(),
            1000
        );
        return this.props.currentSchedule.id !== "" ? this.props.fetchSchedule(this.props.currentSchedule.id) : null
    }

    componentDidUpdate() {
        this.getBreaks()
        return this.props.currentSchedule.id !== "" && this.props.currentSchedule.activities.length === 0 ? this.props.fetchSchedule(this.props.currentSchedule.id) : null
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    tick() {
      this.setState({
        hour: new Date().getHours(),
        minutes: new Date().getMinutes(),
        seconds: new Date().getSeconds()
      });
    }

    weekDayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    newDate = new Date()
    day = this.weekDayNames[this.newDate.getDay()]
    date = this.newDate.getDate()
    month = this.monthNames[this.newDate.getMonth()]
    year = this.newDate.getFullYear()
    currentTimeInMinutes = (this.state.hour * 60) + this.state.minutes

    convertToHoursAndMinutes = (totalMinutes) => {
        let hours = Math.floor(totalMinutes/60)
        let minutes = totalMinutes%60
        return `${hours < 10 ? 0 : ""}${hours}:${minutes < 10 ? 0 : ""}${minutes}`
    }

    handleClick = () => {
        this.setState({breakTime: false, breakLength: 0})
    }

    handleToggleFocusMode = () => {
        this.setState ({
            showFocusModeSchedule: !this.state.showFocusModeSchedule
        })
    }

    handleTimerMode = () => {
        this.setState ({
            breakTime: true,
            breakLength: 5
        })
    }

    getBreaks = () => {
        let schedule = this.getScheduleSlots()
        if (this.state.breakTime === false) {
            return schedule.forEach (slot => (this.state.hour * 60 + this.state.minutes) === slot[3].break && this.state.seconds === 0 ? this.setState({breakTime: true, breakLength: (slot[5].nextStartTime - slot[3].break)}) : null)
        }
    }
    
    getScheduleSlots = () => {
        let startTime = (parseInt(this.props.user.start_work_time.slice(11, 13)) * 60) + parseInt(this.props.user.start_work_time.slice(14, 16))
        let tasks = this.props.currentSchedule.tasks
        let activities = this.props.currentSchedule.activities
        let schedule = []
        let timePeriod = ""
        let j = 0
        for (let i = 0; i < tasks.length; i++) {
            let scheduleSlot = []
            if (i % 2 === 0) {
                scheduleSlot.push({task: startTime}, tasks[i], {nextStartTime: startTime += 55})
            } else {
                scheduleSlot.push({task: startTime}, tasks[i], {nextStartTime: startTime += 45})
            }
            if (i === tasks.length - 1) {
                if (startTime >= 720 && startTime < 1020) {
                    timePeriod = "afternoon"
                } else if (startTime >= 1020) {
                    timePeriod = "evening"
                }
                else {
                    timePeriod = "morning"
                }
                scheduleSlot.push({break: startTime}, {activity_description: `Time to wind down and enjoy the rest of your ${timePeriod}. Suggested ${timePeriod} activity: ${activities[activities.length - 1].activity_description}`}, {nextStartTime: startTime += 500})
            } else if (startTime >= 700 &&  startTime < 760){
                scheduleSlot.push({break: startTime}, {activity_description: "Enjoy a healthy, nutritious lunch"}, {nextStartTime: startTime += 45})
            } else if (i % 2 === 0) {
                scheduleSlot.push({break: startTime}, {activity_description: "Take a short break"}, {nextStartTime: startTime += 5})
            } else {
                scheduleSlot.push({break: startTime}, activities[j], {nextStartTime: startTime += 15})
                j++
            }
            schedule.push(scheduleSlot)
        }
        return schedule
    }


    returnSchedule = () => {
        if (this.props.currentSchedule.activities.length > 0) {
            let schedule = this.getScheduleSlots()
            let completeSchedule = schedule.map ((scheduleSlot) => {
                return (
                    <div key={uuidv4()}>
                        <p className={this.currentTimeInMinutes >= scheduleSlot[0].task &&  this.currentTimeInMinutes < scheduleSlot[3].break ? "slotActive" : "slotNotActive"} key={uuidv4()} > {this.convertToHoursAndMinutes(scheduleSlot[0].task)}: {scheduleSlot[1].task_description}: {scheduleSlot[1].task_notes} </p>
                        <p className={this.currentTimeInMinutes >= scheduleSlot[3].break && this.currentTimeInMinutes < scheduleSlot[5].nextStartTime ? "slotActive" : "slotNotActive"} key={uuidv4()} > {this.convertToHoursAndMinutes(scheduleSlot[3].break)}: {scheduleSlot[4].activity_description} </p>
                    </div>
                )
            })
            return completeSchedule
        } else {
            return this.props.fetchSchedule(this.props.currentSchedule.id)
        }
    }
    
    render() {

        return (

            <div className="form-containers centred-divs">
                <div className="schedule" id={this.state.showFocusModeSchedule === true ? "focus-mode" : "regular-mode"}>
                    {
                        this.props.currentSchedule.id !== ""
                        ?
                            <div id="schedule">
                                <button className="buttons" id="focus-mode-button" onClick={this.handleToggleFocusMode}><span role="img" aria-label="magnifying-glass">🔎</span></button> 
                                <Link to='/createschedule' >
                                    <button className="buttons" id="edit-schedule-button" ><span role="img" aria-label="fountain-pen">🖋️</span></button>
                                </Link>
                                <button className="buttons" id="timer-button" onClick={this.handleTimerMode}><span role="img" aria-label="alarm-clock">⏰</span></button>    
                                {
                                    this.state.showFocusModeSchedule === false ?
                                    <div>
                                        <h2 className="form-headers">{this.day}, {this.month} {this.date}, {this.year}</h2>
                                        {this.returnSchedule()}
                                    </div>
                                    :
                                    <FocusModeSchedule scheduleSlots={this.getScheduleSlots}/>
                                }     
                            </div>
                        :
                            <div>
                                <h2> You haven't created a schedule yet </h2>
                                <Link to='/createschedule' >
                                    <button className="menu-buttons" >Create Schedule</button>
                                </Link>
                            </div>  
                    }
                </div>
                <div>
                    {
                        this.state.breakTime === true
                        ?
                        <div>
                            <AlertModal breakLength={this.state.breakLength} handleClick={this.handleClick}/>
                        </div>
                            
                        :
                        null
                    }
                </div>
            </div>

        );

    }
}
  
const mapStateToProps = state => {
    return {
        user: state.userReducer.user,
        schedules: state.userReducer.userSchedules,
        currentSchedule: state.userReducer.currentSchedule,
        postedSchedule: state.userReducer.postedSchedule
    }
}

const mapDispatchToProps = dispatch => {
    return {
      fetchSchedule: (scheduleId) => dispatch(fetchSchedule(scheduleId)),
      deleteCurrentSchedule: (scheduleId) => dispatch(deleteCurrentSchedule(scheduleId))
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);