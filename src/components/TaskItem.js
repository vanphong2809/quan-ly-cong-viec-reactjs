import React, { Component } from 'react';
class TaskItem extends Component {
    onUpdateStatus =() =>{
        this.props.onUpdateStatus(this.props.task.id)
    }
    onDeleteTask = () => {
        this.props.onDeleteTask(this.props.task.id)
    }
    render() {
        var { task, index } = this.props;
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{task.name}</td>
                <td className="text-center">
                    {task.status?
                    <span className="label label-success" onClick={this.onUpdateStatus}>Kích Hoạt</span>
                    :
                    <span className="label label-danger" onClick={this.onUpdateStatus}>Không kích hoạt</span>}
                    
                </td>
                <td className="text-center">
                    <button type="button" className="btn btn-warning">
                        <span className="fa fa-pencil mr-5"></span>Sửa
                    </button>
                        &nbsp;
                    <button type="button" className="btn btn-danger" onClick={this.onDeleteTask}>
                        <span className="fa fa-trash mr-5"></span>Xóa
                    </button>
                </td>
            </tr>
        )
    }
}
export default TaskItem;
