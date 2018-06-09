import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './TodoInput.css'



class TodoInput extends Component{
    constructor(props){
        super(props);
    }
    changeTitle(event){
        this.props.onChange(event)
    }
    submit(e){
        if(e.key === 'Enter'){
            this.props.onSubmit(e)
        }
    }
    render(){
        return <input type="text" className="TodoInput" value={this.props.content} onChange={this.changeTitle.bind(this)} onKeyPress={this.submit.bind(this)} /> 
            
    }
}


export default TodoInput;


		