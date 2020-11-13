import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux'
import { addTaskToSIP } from '../actions/addTaskToSIP';

class ShowExisitingTasks extends React.Component {

    listTasks = () => {
        if (this.props.tasks) {
            return this.props.tasks.map((task) => {
                return (
                    <div className="tasks-items" key={uuidv4()}>
                        <p className="task" key={task.id}>{task.task_description}: {task.task_notes} </p>
                        <button className="task-button" name={task.id} onClick={this.handleAddTask}>+</button>
                        <br></br>
                    </div>
                ) 
            })
        } else {
            return <h2> You don't have any tasks yet </h2>
        }
    }

    handleAddTask = event => {
        let task = this.props.tasks.filter(task => task.id === parseInt(event.target.name))
        this.props.addTaskToSIP(task)
    }

    render() {

        return (

            <div className="show-tasks">
                <h2> Existing Tasks </h2>
                {this.listTasks()}
            </div>
            
        );

    }

}

const mapStateToProps = state => {
    return {
      tasks: state.userReducer.userTasks
    }
}

const mapDispatchToProps = dispatch => {
    return {
      addTaskToSIP: (task) => dispatch(addTaskToSIP(task))
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(ShowExisitingTasks);