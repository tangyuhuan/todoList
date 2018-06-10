import React from "react";
import TodoInput from "./TodoInput.js"
import TodoItem from "./TodoItem.js"
import 'normalize.css'
import './reset.css'
import './App.css'
import UserDialog from './UserDialog'
import {getCurrentUser, signOut, TodoModel} from './leanCloud'


//import * as localStore from './localStore.js'

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: getCurrentUser()||{},
            newTodo:'',
            todoList: [],
        }
        let user = getCurrentUser()
        if (user) {
          TodoModel.getByUser(user, (todos) => {
            let stateCopy = JSON.parse(JSON.stringify(this.state))
            stateCopy.todoList = todos
            this.setState(stateCopy)
          })
        }
    }
    addTodo(event){
        let newTodo = {
            title:event.target.value,
            status:'',
            deleted:false
        }
        TodoModel.create(newTodo, (id) => {
          newTodo.id = id
          this.state.todoList.push(newTodo)
          this.setState({
            newTodo: '',
            todoList: this.state.todoList
          })
        }, (error) => {
          console.log(error)
        })
    }
    changeTitle(event){
        this.setState({
            newTodo:event.target.value,
            todoList:this.state.todoList,
        })
    }
    toggle(e,todo){
        /*const todoList = this.state.todoList.map((item)=>{
            const newcompleted = item.id === id ? {...item,status:(item.status === 'completed' ? '' : 'completed')}:item;
            return newcompleted;
        })
        this.setState({
            todoList
        })*/
        let oldStatus = todo.status
        todo.status = todo.status === 'completed' ? '' : 'completed'
        TodoModel.update(todo, () => {
          this.setState(this.state)
        }, (error) => {
          todo.status = oldStatus
          this.setState(this.state)
        })
    }
    delete(event, todo){
        /*const todoList = this.state.todoList.map((item)=>{
            const newdelete = item.id === id ? {...item,deleted:true}:item;
            return newdelete;
        })
        this.setState({
            todoList
        })*/
        TodoModel.destroy(todo.id, () => {
          todo.deleted = true
          this.setState(this.state)
        })
    }

    onSignUpOrSignIn(user){
        /*const newuser = user;
        this.setState(preState => ({
            user:{...preState.user,user:newuser}
        }))*/
        const newuser = user;
        this.setState({
            user:newuser
        })
        /*
        let stateCopy = JSON.parse(JSON.stringify(this.state)) 
        stateCopy.user = user
        this.setState(stateCopy)
        */
    }
    signOut(){
        signOut()
        /*this.setState(preState => ({
            user:{...preState.user,user:{}}
        }))*/
        this.setState({
            user:{}
        })
        /*let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.user = {}
        this.setState(stateCopy)*/
    }
    render(){
        let todos = this.state.todoList
        .filter((item)=> !item.deleted)
        .map((item,index)=>{
            return  (
                <li key={index}>
                    <TodoItem todo={item} onToggle={this.toggle.bind(this)} onDelete={this.delete.bind(this)}/>
                </li>
                )
        })
        return(
            <div className="App">
                <h1>{this.state.user.username||'我'}的待办事项
                    {this.state.user.id ? <button className="SignOut-button" onClick={this.signOut.bind(this)}>登出</button> : null}
                </h1>
                <div className="inputWrapper">
                <TodoInput content={this.state.newTodo} onSubmit={this.addTodo.bind(this)} onChange={this.changeTitle.bind(this)}/>
                </div>
                <ol className="todoList">
                    {todos}
                </ol>
                {this.state.user.id ? null : <UserDialog onSignUp={this.onSignUpOrSignIn.bind(this)} onSignIn={this.onSignUpOrSignIn.bind(this)}/>}
            </div>
        )
    }
}
export default App;
