import React, { Component } from 'react';
import './TodoItem.css'



class TodoItem extends Component{
    toggle(e){
        //this.props.onToggle(this.props.todo.id)
        this.props.onToggle(e, this.props.todo)
    }
    delete(e){
        //this.props.onDelete(this.props.todo.id)
        this.props.onDelete(e, this.props.todo)
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
