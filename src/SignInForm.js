import React, {Component} from 'react';
export default function(props){
	return(
		<form className="signIn" onSubmit={props.onSubmit}> {/* 登录*/}
		    <div className="row">
		      <input type="text" className="SignUpOrSignIn-input" placeholder="your username" value={props.formData.username} onChange={props.onChange.bind(this, 'username')}/>
		    </div>
		    <div className="row">
		      <input type="password" className="SignUpOrSignIn-input" placeholder="password" value={props.formData.password} onChange={props.onChange.bind(this, 'password')}/>
		    </div>
		    <div className="row-actions">
		      <button type="submit">登 录</button>
		      <a href="#" onClick={props.onForgotPassword}>忘记密码了？</a>
		    </div>
		</form>
	)
}