import { useState } from 'react'
import './TodoList.css'
import { v4 } from "uuid";
import TodoLists from './TodoLists.jsx'
const TodoList = () => {
    const initialState = {
        taskName: '',
        taskDesc: '',
        status: 'notCompleted'
    }
    const [filterStatus, setFilterStatus] = useState('all')
    const [formState, setFormState] = useState(initialState)
    const [tasks, setTasks] = useState([])
    const [copyOfTaskData, setCopyOfTaskData] = useState([]);
    const [isEditTask, setIsEditTask] = useState(false)

    const onFilterChange = (status) => {
        setFilterStatus(status)
        // setTasks(copyOfTaskData)
        let tempTask = [...copyOfTaskData]
        let newTasks;
        if (status === 'all') {
            newTasks = tempTask;
        } else {
            newTasks = tempTask.filter(element => element.status === status)
        }
        setTasks(newTasks)
    }

    const handleChange = (e) => {
        // console.log(e.target.name, e.target.value)
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        // console.log(formState)
        e.preventDefault();
        if (isEditTask) {
            editTaskData(formState);
        } else {
            addTaskData();
        }

    }

    const addTaskData = () => {
        const task = {
            ...formState,
            id: v4()
        }
        const newTasks = [...tasks, task];
        setCopyOfTaskData(newTasks)
        setTasks(newTasks)
        // console.log(newTasks)

        setFormState(initialState)
    }

    const editTaskData = (newData) => {
        // console.log(newData)
        const updtdTaskIndex = tasks.findIndex((element) => element.id === newData.id);
        tasks[updtdTaskIndex] = {
            ...tasks[updtdTaskIndex],
            ...newData
        }
        setTasks(tasks)
        setFormState(initialState)
        setIsEditTask(false)
    }

    const handleDeleteTask = (id) => {
        console.log(id)
        // const deleteTaskIndex = tasks.findIndex(el => el.id === id);
        // tasks.splice(deleteTaskIndex, 1);
        const newTasks = tasks.filter(element => element.id !== id)
        setTasks(newTasks)
        setCopyOfTaskData(newTasks)
    }

    const updateFilterStatus = (e, id) => {
        const updtdTask = tasks.find((element) => element.id === id);
        const updtdTaskIndex = tasks.findIndex((element) => element.id === id);
        console.log(updtdTask)
        tasks[updtdTaskIndex] = {
            ...updtdTask,
            status: e
        }
        setTasks(tasks);

    }

    const handleUpdateTask = (id) => {
        // console.log(id)
        setIsEditTask(true)
        const updateTaskIndex = tasks.findIndex(el => el.id === id);
        setFormState(tasks[updateTaskIndex])
        // setEditData(tasks[updateTaskIndex]);

    }



    return (
        <>
            <div className="main-div">
                <div className="container">
                    <div className="row" style={{ marginTop: '3rem' }}>
                        <div className="col-lg-12 text-center" style={{ marginBottom: '2rem' }}>
                            <h3>My ToDo</h3>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div style={{ display: 'flex' }}>
                                <div className="col-lg-4">
                                    <input type="text" name="taskName" id="taskName" placeholder="Task Name" value={formState.taskName} onChange={handleChange} />
                                </div>
                                <div className="col-lg-4">
                                    <input type="text" name="taskDesc" id="taskDesc" placeholder="Task Decription" value={formState.taskDesc} onChange={handleChange} />
                                </div>
                                <div className="col-lg-4">
                                    <button type="submit" className="btn btn-success todo" disabled={(formState.taskName.length === 0 || formState.taskDesc.length === 0)} >{isEditTask ? 'Edit' : 'Add ToDo'}</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="row" style={{ marginTop: '3rem' }}>
                        <div className="col-lg-6">
                            <p>My Todos</p>
                        </div>
                        <div className="col-lg-6" >
                            <div style={{ float: 'right' }}>
                                <label htmlFor="filter">Status Filter :</label>&nbsp;
                                <select value={filterStatus} onChange={(e) => onFilterChange(e.target.value)}>
                                    <option value="all" >All</option>
                                    <option value="completed" >Completed</option>
                                    <option value="notCompleted">Not Completed</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {tasks.length != 0 && <div className="row">
                        {tasks.map((element) => (
                            <TodoLists
                                key={element.id}
                                {...element}
                                updateFilterStatus={updateFilterStatus}
                                editTask={handleUpdateTask}
                                deleteTask={handleDeleteTask} />
                        ))}
                    </div>}
                </div>
            </div>
        </>
    )
}
export default TodoList