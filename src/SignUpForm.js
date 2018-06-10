import React, { Component } from 'react';
export default function(props){
	return(
	  <form className="signUp" onSubmit={props.onSubmity}> {/* 注册*/}
	    <div className="row">
	     <input type="text" className="SignUpOrSignIn-input" placeholder="your email" value={props.formData.email} onChange={props.onChange.bind(this, 'email')}/>
	    </div>
	    <div className="row">
	      <input type="text" className="SignUpOrSignIn-input" placeholder="your username" value={props.formData.username} onChange={props.onChange.bind(this, 'username')}/>
	    </div>
	    <div className="row">
	      <input type="password" className="SignUpOrSignIn-input" placeholder="password" value={props.formData.password} onChange={props.onChange.bind(this, 'password')}/>
	    </div>
	    <div className="row-actions">
	      <button type="submit">注 册</button>
	    </div>
	  </form>
	)
}