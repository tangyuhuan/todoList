import React, {Component} from 'react';
class ForgotPasswordForm extends Component{
	render(){
		return(
			<div className="forgotPassword">
			<h3>
			  reset password
			</h3>
			<div className="panes">
			    <form className="forgotPassword" onSubmit={this.props.onSubmit}> {/* 登录*/}
			      <div className="row">
			        <input type="text" value={this.props.formData.email} className="SignUpOrSignIn-input"
			          onChange={this.props.onChange.bind(this, 'email')}/>
			      </div>
			      <div className="row-actions">
			        <button type="submit">send email to reset password</button>
			        <a href="#" onClick={this.props.onSignIn}>back to login</a>
			      </div>
			    </form>
			 </div>
			</div>
		)
	}
}

export default ForgotPasswordForm;
