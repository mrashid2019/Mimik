import React from 'react';
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>


export default function (props) {
	return (
	  <div className="login-form-container">
		<form className="login-form">
		  <div className="login-form-content">
			<h3 className="login-form-title">Welcome!</h3>
			<div className="googleOauth mt-3"> 
			<button type="button" className="btn btn-primary ">
				Continue with Google
			  </button>
			</div>


			<div className="form-group mt-3 pt-3">
			  <input
				type="email"
				className="form-control mt-1"
				placeholder="&#xf0e0; Email" 
			  />
			</div>
			<div className="form-group mt-3 pt-3">
			  <input
				type="password"
				className="form-control mt-1"
				placeholder="Password"
			  />
			</div>
			<div className="d-grid gap-2 mt-3 pt-3">
			  <button type="submit" className="btn btn-primary login-btn">
				LOG IN
			  </button>
			</div>
			<div className= ""> 
			<p className="forgot-password mt-3 pt-3">
			  <a href="#"> Forgot password?</a>
			</p>
			<hr></hr>
			<p className="register ">
			  New to Mimik? <a href="#">Register Today!</a>
			</p>

			</div>
			
		  </div>
		</form>
	  </div>
	)
  }
