import React, {useState} from 'react';
import userImg from '../components/profile/images/user.png';
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Footer from '../components/Footer';


//Modal
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SubmitButton from '../components/profile/inputs/SubmitButton';
import {Avatar,DialogActions,DialogContent,DialogContentText,TextField} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


const main = {
	height:'100%',
	width:'100%',
	display:'flex',
	flexDirection:'column',
	justifyContent:'space-between',
	alignItems:'center',
}

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: "50%",
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
  };


const Profile = () => {

	//Modal
	//Name and Image
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	//Username
	const [openDelete, setOpenDelete] = React.useState(false);
	const handleOpenDelete = () => setOpenDelete(true);
	const handleCloseDelete = () => setOpenDelete(false);
	
	const [name, setName] = useState("Victoria Robinson");
	const [file, setFile] = useState(null);
	const [photoURL, setPhotoURL] = useState(userImg);
	const navigate = useNavigate();

	const handleChange = (e) => {
		const file = e.target.files[0];
		if (file) {
		  setFile(file);
		  setPhotoURL(URL.createObjectURL(file));
		}
	};


	const handleSubmit = (event) => {
		event.preventDefault();
		handleClose()
	  }
	const handleSubmitDelete = (event) => {
		event.preventDefault();
		handleCloseDelete()
	}
	
	const handleDeleteAccount = (event) => {
		event.preventDefault();
		handleCloseDelete()
	}



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
						<img src={userImg} class="rounded-circle" alt="User Image" style={{width:'75%', padding:'5px 5px'}}/>
					</div>
					<div style={{ 
					
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center' }}><p>{name}</p></div>

				</div>

				<div class="row"   style = {{	height:'10vh', 
					alignItems:'center', 
					justifyContent:"center",
					borderBottomStyle: 'solid',
					borderBottomColor:'#dfdfdf',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'}}>

					<div class="col-sm" style={{}}>
						<div className="Profile">
							<Button onClick={handleOpen} style={{background:"none",
								margin:'0',
								padding:'0',
								cursor: 'pointer',
								fontSize:'65%',
								color: '#2b2c2f'
								
								}}>
									Settings
							</Button>

							<Modal
									open={open}
									onClose={handleClose}
									aria-labelledby="modal-modal-title"
									aria-describedby="modal-modal-description"
								>
									<Box sx={style}>
										<form onSubmit={handleSubmit}>
											<DialogContent dividers>
												<DialogContentText id="modal-modal-title" variant="h6" component="h3" style={{padding:"10px 0px 20px 0px"}}>
												You can update your profile by updating these fields:
												</DialogContentText>
												<TextField
												margin="dense"
												id="name"
												label="Full Name"
												type="text"
												fullWidth
												variant="standard"
												inputProps={{ minLength: 2 }}
												value={name || ''}
												required
												onChange={(e) => setName(e.target.value)}
												/>
												
												<TextField
													autoFocus
													margin="dense"
													id="name"
													label="Username"
													type="text"
													fullWidth
													variant="standard"
												/>

												<TextField
													autoFocus
													margin="dense"
													id="name"
													label="Password"
													type="text"
													fullWidth
													variant="standard"
												/>

												
												<label htmlFor="profilePhoto">
												<input
													accept="image/*"
													id="profilePhoto"
													type="file"
													style={{ display: 'none' }}
													onChange={handleChange}
												/>
												<Avatar
													src={photoURL}
													sx={{ width: 75, height: 75, cursor: 'pointer' }}
												/>
												</label>
											</DialogContent>
											<DialogActions>
												<SubmitButton/>
											</DialogActions>
										</form>
									</Box>
							</Modal>
						</div>
					</div>
				</div>

				<div class="row"   style={{	height:'10vh', 
					alignItems:'center', 
					justifyContent:"center",
					borderBottomStyle: 'solid',
					borderBottomColor:'#dfdfdf',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					}}>

					<div class="col-sm" style={{}}>

						<div className="Profile" style={{ }}>
								<Button onClick={handleOpenDelete} style={{background:"none",
									border:'none',
									margin:'0',
									padding:'0',
									fontSize:'65%',
									color: 'red'
								}}>
									Delete Account
								</Button>

								<Modal
										open={openDelete}
										onClose={handleCloseDelete}
										aria-labelledby="modal-modal-title"
										aria-describedby="modal-modal-description"
									>
										<Box sx={style}>
											<form onSubmit={handleSubmitDelete}>
												<DialogContent dividers>
													<DialogContentText id="modal-modal-title" variant="h6" component="h3" style={{padding:"10px 0px 20px 0px"}}>
													Are you sure you want to delete your account?
													</DialogContentText>
												</DialogContent>
												<DialogActions>
												<Button onClick={handleDeleteAccount} >Cancel</Button>
												<Button onClick={handleCloseDelete} autoFocus variant="outlined" startIcon={<DeleteIcon /> }>
													Delete
												</Button>
												</DialogActions>
											</form>
										</Box>
								</Modal>
						</div>
					</div>
				</div>
			</div>
			
		</div>
		<div class="col-sm-8">
		</div>
	<div>
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

