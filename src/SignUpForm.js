import React, { Component } from 'react';
class SignUpForm extends Component{
	render(){
		return(
		  <form className="signUp" onSubmit={this.props.onSubmity}> {/* 注册*/}
		    <div className="row">
		     <input type="text" className="SignUpOrSignIn-input" placeholder="your email" value={this.props.formData.email} onChange={this.props.onChange.bind(this, 'email')}/>
		    </div>
		    <div className="row">
		      <input type="text" className="SignUpOrSignIn-input" placeholder="your username" value={this.props.formData.username} onChange={this.props.onChange.bind(this, 'username')}/>
		    </div>
		    <div className="row">
		      <input type="password" className="SignUpOrSignIn-input" placeholder="password" value={this.props.formData.password} onChange={this.props.onChange.bind(this, 'password')}/>
		    </div>
		    <div className="row-actions">
		      <button type="submit">注 册</button>
		    </div>
		  </form>
		)
	}
}

export default SignUpForm;