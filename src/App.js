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
        }
    }
    componentWillMount() {
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
    onAddTask = () => {
        this.setState({
            isDisplayForm: !this.state.isDisplayForm
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
        data.id = this.generateId();
        tasks.push(data)
        this.setState({
            tasks: tasks
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    onUpdateStatus = (id) =>{
        var {tasks}=this.state;
        var index=this.findIndex(id);
        if(index!==-1){
            tasks[index].status = !tasks[index].status;
            this.setState({
                tasks : tasks
            })
            localStorage.setItem('tasks',JSON.stringify(tasks));
        }
    }
    findIndex=(id)=>{
        var {tasks}=this.state;
        var result = -1;
        tasks.forEach((task,index) => {
            if(task.id===id){
                result = index;
                
            }
        });
        return result;
    }
    onDeleteTask = (id) => {
        var {tasks}=this.state;
        var index=this.findIndex(id);
        if(index!==-1){
            tasks.splice(index,1);
            this.setState({
                tasks : tasks,
            })
            localStorage.setItem("tasks",JSON.stringify(tasks));
        }
    }
    render() {
        var { tasks, isDisplayForm } = this.state
        var eleTaskForm = isDisplayForm ? <TaskForm
            onSubmit={this.onSubmit}
            onCloseForm={this.onCloseForm} /> : ''
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
                        <button type="button" className="btn btn-primary" onClick={this.onAddTask}>
                            <span className="fa fa-plus mr-5"></span>Thêm Công Việc
                        </button>
                        <button type="button" className="btn btn-danger ml-5" onClick={this.onGenerateData}>
                            <span className="fa fa-plus mr-5"></span>Tạo dữ liệu mẫu
                        </button>
                        <Controll></Controll>
                        <div className="row mt-15">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <TaskList tasks={tasks} onUpdateStatus={this.onUpdateStatus} onDeleteTask={this.onDeleteTask}></TaskList>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;
