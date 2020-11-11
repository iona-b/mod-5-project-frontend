export const deleteTask = (taskId) => {

    return (dispatch) => {
        fetch(`https://always-balanced-backend.herokuapp.com/tasks/${taskId}`, {
            method:'DELETE'
        })
        .then(response => response.json())
        .then(responseJSON => {
            if(!responseJSON.error){
                dispatch({ type: 'DELETE_TASK', task: responseJSON })
            } else {
                alert(responseJSON.error)
            }
        })
        .catch(err => console.log('deleteTask error:', err))
    }

}