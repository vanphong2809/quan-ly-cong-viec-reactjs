import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Controll from './components/Controll';
import TaskList from './components/TaskList';
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tasks: [], //[id,name,status]
            isDisplayForm: false,
            taskEditing: null,
            filter: {
                name: '',
                status: -1,
            },
            sortBy: '',
            sortValue: -1,
        }
    }
    componentDidMount() {
        if (localStorage && localStorage.getItem("tasks")) {
            var tasks = JSON.parse(localStorage.getItem("tasks"))
            this.setState({
                tasks: tasks,
            })
        }
    }
    onGenerateData = () => {
        var tasks = [
            {
                id: this.generateId(),
                name: 'Đọc sách',
                status: true
            },
            {
                id: this.generateId(),
                name: 'Ăn trưa',
                status: true
            },
            {
                id: this.generateId(),
                name: 'Học lập trình',
                status: true
            },
            {
                id: this.generateId(),
                name: 'Ngủ',
                status: false
            },
        ];
        this.setState({
            tasks: tasks,
        })
        localStorage.setItem("tasks", JSON.stringify(tasks));
        console.log(tasks)
    }
    s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    generateId() {
        return this.s4() + this.s4() + "-" + this.s4() + "-" + this.s4() + "-" + this.s4() + this.s4() + this.s4();
    }
    onToggleForm = () => {
        if (this.state.taskEditing !== null) {
            // console.log('th1')
            this.setState({
                taskEditing: null
            });
        } else {
            this.setState({
                isDisplayForm: !this.state.isDisplayForm
            });
        }
    }
    onShowForm = () => {
        this.setState({
            isDisplayForm: true,
        })
    }
    onCloseForm = () => {
        this.setState({
            isDisplayForm: false
        })
    }
    onSubmit = (data) => {
        var { tasks } = this.state;
        console.log(tasks);
        if (data.id === '') {
            data.id = this.generateId();
            tasks.push(data)
        } else {
            var index = this.findIndex(data.id);
            if (index !== -1) {
                tasks[index] = data;
            }
        }
        this.setState({
            tasks: tasks,
            taskEditing: null,
        });
        this.onCloseForm();
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    onUpdateStatus = (id) => {
        var { tasks } = this.state;
        var index = this.findIndex(id);
        if (index !== -1) {
            tasks[index].status = !tasks[index].status;
            this.setState({
                tasks: tasks
            })
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }
    findIndex = (id) => {
        var { tasks } = this.state;
        var result = -1;
        tasks.forEach((task, index) => {
            if (task.id === id) {
                result = index;

            }
        });
        return result;
    }
    onDeleteTask = (id) => {
        var { tasks } = this.state;
        var index = this.findIndex(id);
        if (index !== -1) {
            tasks.splice(index, 1);
            this.setState({
                tasks: tasks,
            })
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    }
    onUpdateTask = (id) => {
        var { tasks } = this.state;
        var index = this.findIndex(id);
        var taskEdit = tasks[index];
        this.setState({
            taskEditing: taskEdit,
        })
        this.onShowForm();
    }
    onFilter = (filterName, filterStatus) => {
        var filStatus = parseInt(filterStatus, 10);
        console.log(filterName, filStatus);
        console.log(typeof filStatus);
        this.setState({
            filter: {
                name: filterName,
                status: filStatus,
            }
        })
    }
    onSearch = (keySearch) => {
        this.setState({
            keySearch: keySearch,
        })
    }
    onSort = (by, value) => {
        this.setState({
            sortBy: by,
            sortValue: value,
        });
    }
    render() {
        var { tasks, isDisplayForm, taskEditing, filter, keySearch, sortBy, sortValue } = this.state
        if (filter) {
            if (filter.name) {
                tasks = tasks.filter((tasks) => {
                    return tasks.name.toLowerCase().indexOf(filter.name.toLowerCase()) !== -1;
                })
            }
            tasks = tasks.filter((task) => {
                if (filter.status === -1) {
                    return task;
                } else {
                    return task.status === (parseInt(filter.status, 10) === 1 ? true : false);
                }
            });

        }
        if (keySearch) {
            tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(keySearch.toLowerCase()) !== -1;
            })
        }
        if (sortBy === 'name') {
            tasks.sort((a, b) => {
                if (a.name > b.name) return sortValue;
                else if (a.name < b.name) return -sortValue;
                else return 0;
            })
        } else {
            tasks.sort((a, b) => {
                if (a.status > b.status) return -sortValue;
                else if (a.status < b.status) return sortValue;
                else return 0;
            })
        }
        var eleTaskForm = isDisplayForm ? <TaskForm
            onSubmit={this.onSubmit}
            onCloseForm={this.onCloseForm}
            taskEditing={taskEditing} /> : ''


        return (
            <div className="container">
                <div className="text-center">
                    <h1>Quản Lý Công Việc</h1>
                    <hr />
                </div>
                <div className="row">
                    <div className={isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""}>
                        {eleTaskForm}
                    </div>
                    <div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
                        <button type="button" className="btn btn-primary" onClick={this.onToggleForm}>
                            <span className="fa fa-plus mr-5"></span>Thêm Công Việc
                        </button>
                        <button type="button" className="btn btn-danger ml-5" onClick={this.onGenerateData}>
                            <span className="fa fa-plus mr-5"></span>Tạo dữ liệu mẫu
                        </button>
                        <Controll onSearch={this.onSearch} onSort={this.onSort}></Controll>
                        <div className="row mt-15">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <TaskList tasks={tasks}
                                    onUpdateStatus={this.onUpdateStatus}
                                    onDeleteTask={this.onDeleteTask}
                                    onUpdateTask={this.onUpdateTask}
                                    onFilter={this.onFilter}
                                ></TaskList>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;
