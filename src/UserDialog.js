import React, { Component } from 'react';
import './UserDialog.css'
import {signUp, signIn} from './leanCloud'
class UserDialog extends Component{
	constructor(props){
		super(props)
		this.state = {
			selected: 'signUp',
			formData: {
				username:'',
				password:'',
			}
		}
	}
	switch(e){
		this.setState({
			selected: e.target.value
		})
	}
	signUp(e){
		e.preventDefault()
		let {username, password} = this.state.formData
	    let success = (user)=>{
	        this.props.onSignUp(user)
	    }
	    let error = (error)=>{
      		switch(error.code){
        	case 202:
          		alert('用户名已被占用')
          		break
        	default:
          		alert(error)
          		break
          	}
	    }
	    signUp(username, password, success, error)
	}
	signIn(e){
		e.preventDefault()
    	let {username, password} = this.state.formData
    	let success = (user)=>{
      		this.props.onSignIn(user)
    	}
    	let error = (error)=>{
	      	switch(error.code){
	        case 210:
	          alert('用户名与密码不匹配')
	          break
	        case 211:
	          alert('找不到该用户')
	          break
	        default:
	          alert(error)
	          break
	      }
    	}
    	signIn(username, password, success, error)
  	}
	changeFormData(key,e){
		let formdata = e.target.value;
		if(key==='password'){
			this.setState(preState => ({
				formData:{...preState.formData, password:formdata}
			}))	
		}else if(key==='username'){
			this.setState(preState => ({
				formData:{...preState.formData, username:formdata}
			}))	
		}else{
			console.log('changeFormData error!')
		}
	}
	render(){
		let signUpForm = (
			  <form className="signUp" onSubmit={this.signUp.bind(this)}> {/* 注册*/}
			    <div className="row">
			      <input type="text" className="SignUpOrSignIn-input" placeholder="your username" value={this.state.formData.username} onChange={this.changeFormData.bind(this, 'username')}/>
			    </div>
			    <div className="row">
			      <input type="password" className="SignUpOrSignIn-input" placeholder="password" value={this.state.formData.password} onChange={this.changeFormData.bind(this, 'password')}/>
			    </div>
			    <div className="row-actions">
			      <button type="submit">注 册</button>
			    </div>
			  </form>
			)
		let signInForm = (
		      <form className="signIn" onSubmit={this.signIn.bind(this)}> {/* 登录*/}
		        <div className="row">
		          <input type="text" className="SignUpOrSignIn-input" placeholder="your username" value={this.state.formData.username} onChange={this.changeFormData.bind(this, 'username')}/>
		        </div>
		        <div className="row">
		          <input type="password" className="SignUpOrSignIn-input" placeholder="password" value={this.state.formData.password} onChange={this.changeFormData.bind(this, 'password')}/>
		        </div>
		        <div className="row-actions">
		          <button type="submit">登 录</button>
		        </div>
		      </form>
			)
		return(
			<div className="UserDialog-Wrapper">
			   <div className="UserDialog">
			   	<div className="Line"></div>
			     <nav>
			       <label><input type="radio" value="signUp" checked={this.state.selected === 'signUp'} onChange={this.switch.bind(this)}/> 注册</label>
			       <label><input type="radio" value="signIn" checked={this.state.selected === 'signIn'} onChange={this.switch.bind(this)}/> 登录</label>
			     </nav>
			     <div className="panes">
			       {this.state.selected === 'signUp' ? signUpForm : null}
			       {this.state.selected === 'signIn' ? signInForm : null}	       
			     </div>
			   </div>
			 </div>
		)
	}
}

export default UserDialog;