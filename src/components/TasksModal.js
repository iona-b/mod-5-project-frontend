import React from "react";
import CreateTaskForm from '../components/CreateTaskForm'
import { connect } from 'react-redux'
import { deleteTask } from '../actions/deleteTask';

class TasksModal extends React.Component {

    state = {
        showAddTaskForm: false
    }

    listTasks = () => {
        if (this.props.tasks) {
            return this.props.tasks.map((task) => {
                return (
                    <div className="tasks-items">
                        <p className="task" key={task.id}>{task.task_description}: {task.task_notes}</p>
                        <button className="task-button" name={task.id} onClick={this.handleRemoveTask}>-</button>
                        <br></br>
                    </div>
                ) 
            })
        } else {
            return <h2> You don't have any tasks yet </h2>
        }
    }

    handleRemoveTask = event => {
        this.props.deleteTask(event.target.name)
    }

    handleToggleAddTaskForm = () => {
        this.setState ({
            showAddTaskForm: !this.state.showAddTaskForm
        })
    }

    render() {

        return (

            <div>
                <button className="buttons back-buttons" name="showTasks" onClick={this.props.handleClick}>⬅</button>
                <div className="form-containers centred-divs">
                    {this.state.showAddTaskForm === false ?
                        <div>
                            {this.props.tasks.length > 0 ?
                                <div>
                                    <h2> Your Tasks </h2>
                                    {this.listTasks()}
                                    <button className="buttons" name="addTasks" onClick={this.handleToggleAddTaskForm}>Add Tasks</button>
                                </div>
                            :
                                <div>
                                    <h2> Your Tasks </h2>
                                    <p> You haven't added any tasks yet </p>
                                    <button className="buttons" name="addTasks" onClick={this.handleToggleAddTaskForm}>Add Tasks</button>
                                </div>
                            }
                        </div>
                    :
                        <CreateTaskForm handleToggleAddTaskForm={this.handleToggleAddTaskForm} />
                    }
                </div>
            </div>
            
        )
    }

}

const mapStateToProps = state => {
    return {
      tasks: state.userReducer.userTasks
    }
}

const mapDispatchToProps = dispatch => {
    return {
      deleteTask: (taskId) => dispatch(deleteTask(taskId))
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(TasksModal);