import React, { Component } from 'react';
import './TodoItem.css'



class TodoItem extends Component{
    toggle(){
        this.props.onToggle(this.props.todo.id)
    }
    delete(){
        this.props.onDelete(this.props.todo.id)
    }
    render(){
        return (
            <div className="TodoItem">
                <input type="checkbox" checked={this.props.todo.status === 'completed'} onChange={this.toggle.bind(this)}/>
                <span className="title">{this.props.todo.title}</span>
                <button className="Delete-button" onClick={this.delete.bind(this)}>删除</button>
            </div>
        )
    }
}


export default TodoItem;
