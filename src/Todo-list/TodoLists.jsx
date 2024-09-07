import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
const TodoLists = ({
    taskName,
    taskDesc,
    id,
    status,
    updateFilterStatus,
    editTask,
    deleteTask
}) => {


    const [filterStatus, setFilterStatus] = useState('notCompleted')
    const onFilterChange = (e) => {
        setFilterStatus(e)
        updateFilterStatus(e, id)
    }

    useEffect(() => {
        setFilterStatus(status)
    }, [status])

    return (
        <>
            {console.log(`taskName: ${taskName}`)}
            {console.log(`taskDesc: ${taskDesc}`)}
            {console.log(`status: ${status}`)}
            <div className="col-lg-4">
                <div className="card" style={{ margin: '8px' }}>
                    <div className="card-body">
                        <h5 className="card-title">{taskName}</h5>
                        <p className="card-text">{taskDesc}</p>
                        <label htmlFor="filter">Status :</label>&nbsp;
                        <select value={filterStatus} onChange={(e) => onFilterChange(e.target.value)}>
                            <option value="completed" >Completed</option>
                            <option value="notCompleted">Not Completed</option>
                        </select>
                        <div className="button" style={{ float: 'right', marginTop: '3rem' }}>
                            <button type="button" className="btn btn-success" name='edit' style={{ margin: '1rem' }}
                                onClick={() => editTask(id)}>Edit</button>
                            <button type="button" className="btn btn-success" name='delete'
                                onClick={() => deleteTask(id)}>Delete</button>
                        </div>
                        {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                    </div>
                </div>
            </div>
        </>
    )
}

TodoLists.propTypes = {
    taskName: PropTypes.string,
    taskDesc: PropTypes.string,
    id: PropTypes.string,
    status: PropTypes.string,
    updateFilterStatus: PropTypes.func,
    editTask: PropTypes.func,
    deleteTask: PropTypes.func
}

export default TodoLists