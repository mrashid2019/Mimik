import React, {useState} from 'react';
import userImg from '../components/profile/images/user.png';
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/userAuthContext';
import uploadFile from '../components/profile/uploadFile';
import { updateProfile } from 'firebase/auth';

import Footer from '../components/Footer';
import Bar from '../components/profile/bar/bar';


//Modal
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SubmitButton from '../components/profile/inputs/SubmitButton';
import {v4 as uuidv4} from 'uuid';
import {Avatar,DialogActions,DialogContent,DialogContentText,TextField} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';


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
  
//Style for table grid
const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
  }));


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

	const { currentUser, setLoading, setAlert } = useAuth();
	
	const [name, setName] = useState(currentUser?.displayName);
	const [file, setFile] = useState(null);
	const [photoURL, setPhotoURL] = useState(currentUser?.photoURL);

	const navigate = useNavigate();

	const handleChange = (e) => {
		const file = e.target.files[0];
		if (file) {
		  setFile(file);
		  setPhotoURL(URL.createObjectURL(file));
		}
		
	};


	const handleSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)

		let userObj = {displayName: name}
		let imagesObj = {uName: name}

		try {
			if(file){
				const imageName = uuidv4() + "." + file?.name?.split(".")?.pop()
				const url = await uploadFile(file, `profile/${currentUser?.uid}/${imageName}`)


				userObj = {...userObj, photoURL: url}
				imagesObj = {...imagesObj, uPhoto: url}
			}

			await updateProfile(currentUser, userObj)
			setAlert({isAlert: true, 
					  severity:"success", 
					  message:"Your profile has been updated", timeout:3000, 
					  location:"modal",
					});
		} catch (error){
			setAlert({isAlert: true, 
				severity:"error", 
				message:error.message, 
				timeout:5000, 
				location:"modal",
			  });
			  console.log(error);
		}

// 		try {
// 			const currentUser = auth().currentUser;
// 			if (currentUser) {
// 			  const userRef = db().ref(`users/${currentUser.uid}`);
// 			  await userRef.update({
// 				firstName: firstName,
// 				lastName: lastName
// 			  });
// 			}
// 			setAlert({isAlert: true, 
//               severity:"success", 
//               message:"Your profile has been updated", 
//               timeout:3000, 
//               location:"modal",
//     		});
//   		} catch (error){
// 			setAlert({isAlert: true, 
//               severity:"error", 
//               message:error.message, 
//               timeout:5000, 
//               location:"modal",
//     });
//     console.log(error);
//   }

		setLoading(false);
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

		<>
	
		<div class="container" style={{justifyContent:'center',alignItems: 'center', display: 'flex'}}>
					<div class="row" style={{ backgroundColor:' #fff', textAlign: 'center', width: '130vh', height:"100vh" ,margin: '35px 35px',borderRadius: '1px' }}>
						<div class="col-sm-3" style={{borderRightStyle: 'solid', borderRightColor:'#dfdfdf'}}>
							<div class="container">
								
								<div class="row"  style={{borderBottomStyle: 'solid', borderBottomColor:'#dfdfdf',height:'50vh'}}>
									<div class="col-sm" style={{justifyContent:'center',alignItems: 'center', display: 'flex',flexDirection:'column'}}>
										<img src={photoURL} class="rounded-circle" alt="Profile Image" style={{ width: '80%', height: '60%', padding:'5px 5px'}}/>
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
																label="First Name"
																type="text"
																fullWidth
																variant="standard"
																value={name || ''}
																required
																onChange={(e) => setName(e.target.value)}
																/>
																
																<TextField
																	autoFocus
																	margin="dense"
																	id="name"
																	label="Last Name"
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
								<div class="row"   style = {{	height:'35vh', 
									alignItems:'flex-end', 
									display: 'flex',
									}}>
										<Button style={{height:'10vh', backgroundColor:"#D9D9D9",
											cursor: 'pointer',
											fontSize:'75%',
											color:"black",
											fontFamily:"IM FELL Double Pica"}}>
												Sign Out
										</Button>
	
								</div>
								
							</div>
							
						</div>
						<div class="col-sm-9" style={{padding:"2px"}}>
							<Bar/>
							
							{/* Table box */}
							<Box sx={{ flexGrow: 1 }} >
								<Grid container spacing={0.3} >
									<Grid item xs={5} md={5} >
										<Item style={{height:"95vh", paddingTop:"20px", border:"none", boxShadow:"none"}}>
											<div>
												<Stack
													direction="column"
													justifyContent="flex-end"
													alignItems="stretch"
													spacing={3}
												>
													<Item style={{height:"60vh"}}>
														Recently Saved Conversions
													</Item>
												</Stack>
											</div>
										</Item>
									</Grid>
	
									<Grid item xs={7} md={7} >
									<Item style={{height:"95vh", paddingTop:"20px", border:"none", boxShadow:"none"}}>
									<div>
												<Stack
													direction="column"
													justifyContent="flex-end"
													alignItems="stretch"
													spacing={3}
												>
													<Item style={{height:"30vh"}}>
														You’re Trained Voice												</Item>
													<Item style={{height:"60vh"}}> 
														
													</Item>
												</Stack>
											</div>									
									</Item>
									</Grid>
								</Grid>
							</Box>
						</div>
					<div>
				</div>
			</div>
		</div>
	
	</>
	
	
	);
	
	};
	
	export default Profile;