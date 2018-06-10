import React, {Component} from 'react';
class SignInForm extends Component{
	render(){
		return(
  			<form className="signIn" onSubmit={this.props.onSubmit}> {/* 登录*/}
			    <div className="row">
			      <input type="text" className="SignUpOrSignIn-input" placeholder="your username" value={this.props.formData.username} onChange={this.props.onChange.bind(this, 'username')}/>
			    </div>
			    <div className="row">
			      <input type="password" className="SignUpOrSignIn-input" placeholder="password" value={this.props.formData.password} onChange={this.props.onChange.bind(this, 'password')}/>
			    </div>
			    <div className="row-actions">
			      <button type="submit">登 录</button>
			      <a href="#" onClick={this.props.onForgotPassword}>忘记密码了？</a>
			    </div>
		  	</form>
		)
	}
}

export default SignInForm;
