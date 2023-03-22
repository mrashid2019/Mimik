import React, {useState} from 'react';
import userImg from '../components/profile/user.png';
import { Outlet, Link } from "react-router-dom";

import Footer from '../components/Footer';



const main = {
	height:'100%',
	width:'100%',
	display:'flex',
	flexDirection:'column',
	justifyContent:'space-between',
	alignItems:'center',
}

const Profile = () => {



	const clickHandler = () => {
	};

	class NameForm extends React.Component {
		constructor(props) {
			super(props);
			this.state = {value: ''};

			this.handleChange = this.handleChange.bind(this);
			this.handleSubmit = this.handleSubmit.bind(this);
		}

		handleChange(event) {
			this.setState({value: event.target.value});
		}

		handleSubmit(event) {
			alert('A name was submitted: ' + this.state.value);
			event.preventDefault();
		}

		render() {
			return (
			<form onSubmit={this.handleSubmit}>
				<label>
				Name:
				<input type="text" value={this.state.value} onChange={this.handleChange} />
				</label>
				<input type="submit" value="Submit" />
			</form>
			);
		}
	}

	 
return (

<div class="container" style={{justifyContent:'center',alignItems: 'center', display: 'flex'}}>
	<div class="row" style={{ border: '1px solid #dfdfdf', backgroundColor:' #fff', textAlign: 'center', width: '130vh', height:"100vh" ,margin: '35px 35px',borderRadius: '15px' }}>
		<div class="col-sm-4" style={{borderRightStyle: 'solid', borderRightColor:'#dfdfdf'}}>
		<div class="container">
			
			<div class="row"  style={{borderBottomStyle: 'solid', borderBottomColor:'#dfdfdf',height:'45vh'}}>
				<div class="col-sm" style={{justifyContent:'center',alignItems: 'center', display: 'flex',flexDirection:'column'}}>
					<img src={userImg} class="rounded-circle" alt="User Image" style={{width:'70%', padding:'10px 10px'}}/>
					<div><p>Victoria Robertson</p></div>
				
				</div>
			</div>
			
			<div class="row"   style={{paddingTop:'10%',borderBottomStyle: 'solid', borderBottomColor:'#dfdfdf', height:'10vh', padding:'10px 10px'}}>
				<div class="col-sm" style={{}}>
					<div className="Profile" style={{ }}>
						<button onClick={clickHandler} style={{background:"none",
							border:'none',
							margin:'0',
							padding:'0',
							cursor: 'pointer'}}>
							Edit Name
						</button>
					</div>

				</div>
			</div>
			<div class="row" style={{}}>
				<div class="col-sm" style={{paddingTop:'10%',borderBottomStyle: 'solid', borderBottomColor:'#dfdfdf', height:'10vh'}}>
				<div className="Profile" style={{ }}>
						<button onClick={clickHandler} style={{background:"none",
							border:'none',
							margin:'0',
							padding:'0',
							cursor: 'pointer'}}>
							Edit Username
						</button>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm" style={{paddingTop:'10%',borderBottomStyle: 'solid', borderBottomColor:'#dfdfdf', height:'10vh'}}>
				<div className="Profile" style={{ }}>
						<button onClick={clickHandler} style={{background:"none",
							border:'none',
							margin:'0',
							padding:'0',
							cursor: 'pointer'}}>
							Edit Password
						</button>
					</div>
				</div>
			</div>

		</div>
			
		</div>
		
		<div class="col-sm-8">
			Models
		</div>

	{/* 
				<div style={{ border: '1px solid #dfdfdf', backgroundColor:' #fff', textAlign: 'center', width: '95%', height:"95%" ,margin: '25px 25px',borderRadius: '15px', paddingTop:'2rem' }}>
					<div>
						<table style={{ border: '1px solid #dfdfdf', backgroundColor:' #fff', textAlign: 'center', width: '95%', height:"95%" ,margin: '25px 25px',borderRadius: '15px', paddingTop:'2rem' }}>
							<tr >
								<td  style={{ border: '1px solid #dfdfdf',columnSpan:"3" }}>Emil</td>
								<td>Tobias</td>
							</tr>
							<tr>
							<div class="container mt-3">
	<h2>Borderless Table</h2>
	<p>The .table-borderless class removes borders from the table:</p>            
	
	
	
	
	
	<table class="table table-borderless">
		<thead>
		<tr>
			<th>Firstname</th>
			<th>Lastname</th>
			<th>Email</th>
		</tr>
		</thead>
		<tbody>
		<tr>
			<td>John</td>
			<td>Doe</td>
			<td>john@example.com</td>
		</tr>
		<tr>
			<td>Mary</td>
			<td>Moe</td>
			<td>mary@example.com</td>
		</tr>
		<tr>
			<td>July</td>
			<td>Dooley</td>
			<td>july@example.com</td>
		</tr>
		</tbody>
	</table>
	</div>
							</tr>
						</table>

					</div>
				</div> */}
	</div>

</div>

);

};

export default Profile;