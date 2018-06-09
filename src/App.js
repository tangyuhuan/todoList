import React from "react";
import TodoInput from "./TodoInput.js"
import TodoItem from "./TodoItem.js"
import 'normalize.css'
import './reset.css'
import './App.css'
import UserDialog from './UserDialog'
import {getCurrentUser, signOut} from './leanCloud'
//import * as localStore from './localStore.js'

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: getCurrentUser()||{},
            newTodo:'',
            todoList: [],
        }
    }
    addTodo(event){
        let todoadd = {id:idMaker(),title:event.target.value,status: null,deleted:false}
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
        //localStore.save('todoList', this.state.todoList)
    }
    onSignUpOrSignIn(user){
        /*const newuser = user;
        this.setState(preState => ({
            user:{...preState.user,user:newuser}
        }))*/
        let stateCopy = JSON.parse(JSON.stringify(this.state)) 
        stateCopy.user = user
        this.setState(stateCopy)
    }
    signOut(){
        signOut()
        /*this.setState(preState => ({
            user:{...preState.user,user:{}}
        }))*/
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.user = {}
        this.setState(stateCopy)
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
let id = 0;
function idMaker(){
    id+=1;
    return id;
}