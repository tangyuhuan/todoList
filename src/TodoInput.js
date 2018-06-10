import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './TodoInput.css'

function changeTitle(props,e){
    props.onChange(e)
}

function submit(props,e){
    if(e.key === 'Enter'){
        props.onSubmit(e)
    }
}
		
export default function(props){
    return <input type="text" className="TodoInput" 
            value={props.content} 
            onChange={changeTitle.bind(null,props)} 
            onKeyPress={submit.bind(null,props)} /> 
}