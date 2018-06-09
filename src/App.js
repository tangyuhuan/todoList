import React from "react";
import ReactDOM from "react-dom";
import TodoInput from "./TodoInput.js"
import TodoItem from "./TodoItem.js"
import 'normalize.css'
import './reset.css'
import './App.css'
import * as localStore from './localStore.js'
class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            newTodo:'',
            todoList:localStore.load('todoList')||[],
        }
    }
    addTodo(event){
        const todoadd = {id:idMaker(),title:event.target.value,status: null,deleted:false}
        this.setState(
            preState=>({
                todoList:[...preState.todoList,todoadd],
                newTodo:'',
                })
            )
    }
    changeTitle(event){
        this.setState({
            newTodo:event.target.value,
            todoList:this.state.todoList,

        })
    }
    toggle(id){
        const todoList = this.state.todoList.map((item)=>{
            const newcompleted = item.id === id ? {...item,status:(item.status === 'completed' ? '' : 'completed')}:item;
            return newcompleted;
        })
        this.setState({
            todoList
        })
    }
    delete(id){
        const todoList = this.state.todoList.map((item)=>{
            const newdelete = item.id === id ? {...item,deleted:true}:item;
            return newdelete;
        })
        this.setState({
            todoList
        })
    }
    componentDidUpdate(){
        localStore.save('todoList', this.state.todoList)
    }
    render(){
        let todos = this.state.todoList
        .filter((item)=> !item.deleted)
        .map((item)=>{
            return  (
                <li key={item.id}>
                    <TodoItem todo={item} onToggle={this.toggle.bind(this)} onDelete={this.delete.bind(this)}/>
                </li>
                )
        })
        return(
            <div className="App">
                <h1>的待办事项</h1>
                <TodoInput content={this.state.newTodo} onSubmit={this.addTodo.bind(this)} onChange={this.changeTitle.bind(this)}/>
                <ol>
                    {todos}
                </ol>
            </div>
        )
    }
}
export default App;
let id = 0;
function idMaker(){
    id+=1;
    return id;
}