import React, { useState } from "react";
import userImg from "../components/profile/images/user.png";
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Footer from "../components/Footer";
import Bar from "../components/profile/bar/bar";

//Modal
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import SubmitButton from "../components/profile/inputs/SubmitButton";
import {
  Avatar,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { borderColor } from "@mui/system";

const main = {
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

//Style for table grid
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
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

  //Change first and last name
  const [firstname, setFirstName] = useState("Victoria");
  const [lastname, setLastName] = useState("Robinson");

  //Add Image
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
    handleClose();
  };
  const handleSubmitDelete = (event) => {
    event.preventDefault();
    handleCloseDelete();
  };

  const handleDeleteAccount = (event) => {
    event.preventDefault();
    handleCloseDelete();
  };

  class NameForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = { value: "" };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
      alert("A name was submitted: " + this.state.value);
      event.preventDefault();
    }

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

  return (
    <>
      <div
        //fills the whole page
        class="container-fluid"
        style={{
          paddingTop: "3%",
          display: "flex",
          // border: "1px solid black",
          height: "100vh",
        }}
      >
        <div class="col-3" style={{ borderRight: "3px solid gray" }}>
          <div class="row row-cols-1">
            {/* Edit */}
            <div
              class="col"
              style={{
                // border: "1px solid pink",
                height: "35vh",
                alignItems: "center",
                justifyItems: "center",
                paddingTop: "5%",
              }}
            >
              <div
                class="col-sm"
                style={{
                  // border: "1px solid black",
                  display: "flex",
                  alignItems: "center",
                  alignContent: "center",
                  height: "25vh",
                }}
              >
                <center>
                  <img
                    src={userImg}
                    class="rounded-circle"
                    alt="User Image"
                    style={{ width: "60%" }}
                  />
                </center>
              </div>
            </div>

            {/* Name */}
            <div
              class="col"
              style={{
                // border: "1px solid pink",
                height: "10vh",
                alignItems: "center",
                alignContent: "center",
                display: "flex",
                alignItems: "start",
              }}
            >
              <div class="col-sm">
                <p>
                  {firstname} {lastname}
                </p>
              </div>
            </div>

            {/* Modal: Edit Account */}
            <div
              class="col"
              style={{
                // border: "1px solid blue",
                height: "5vh",
                alignItems: "center",
                alignContent: "center",
                display: "flex",
              }}
            >
              <div class="col-sm">
                <Button
                  onClick={handleOpen}
                  style={{
                    background: "none",
                    margin: "0",
                    padding: "0",
                    cursor: "pointer",
                    fontSize: "65%",
                    color: "#2b2c2f",
                  }}
                >
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
                        <DialogContentText
                          id="modal-modal-title"
                          variant="h6"
                          component="h3"
                          style={{ padding: "10px 0px 20px 0px" }}
                        >
                          You can update your profile by updating these fields:
                        </DialogContentText>
                        <TextField
                          margin="dense"
                          id="firstName"
                          label="First Name"
                          type="text"
                          fullWidth
                          variant="standard"
                          inputProps={{ minLength: 2 }}
                          value={firstname || ""}
                          required
                          onChange={(e) => setFirstName(e.target.value)}
                        />

                        <TextField
                          autoFocus
                          margin="dense"
                          id="lastName"
                          label="Last Name"
                          type="text"
                          fullWidth
                          variant="standard"
                          inputProps={{ minLength: 2 }}
                          value={lastname || ""}
                          required
                          onChange={(e) => setLastName(e.target.value)}
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
                            style={{ display: "none" }}
                            onChange={handleChange}
                          />
                          <Avatar
                            src={photoURL}
                            sx={{
                              width: 75,
                              height: 75,
                              cursor: "pointer",
                            }}
                          />
                        </label>
                      </DialogContent>
                      <DialogActions>
                        <SubmitButton />
                      </DialogActions>
                    </form>
                  </Box>
                </Modal>
              </div>
            </div>

            {/* Delete */}
            <div
              class="col"
              style={{
                // border: "1px solid blue",
                height: "35vh",
                display: "flex",
                alignItems: "end",
              }}
            >
              <div class="col-sm">
                <Button
                  onClick={handleOpenDelete}
                  style={{
                    background: "none",
                    border: "none",
                    margin: "0",
                    padding: "0",
                    fontSize: "65%",
                    color: "red",
                  }}
                >
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
                        <DialogContentText
                          id="modal-modal-title"
                          variant="h6"
                          component="h3"
                          style={{ padding: "10px 0px 20px 0px" }}
                        >
                          Are you sure you want to delete your account?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleDeleteAccount}>Cancel</Button>
                        <Button
                          onClick={handleCloseDelete}
                          autoFocus
                          variant="outlined"
                          startIcon={<DeleteIcon />}
                        >
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

        {/* Models */}
        <div
          class="col-9"
          style={{
            // border: "1px solid red",
            paddingRight: "0px",
            paddingLeft: "0px",
          }}
        >
          {/* Welcome Message and Search */}
          <Bar />
          <div
            //fills the whole page
            class="container"
          >
            <div class="row row-cols-3">
              {/* Column 1 */}
              <div
                class="col-6"
                style={{
                  border: "2px solid blue",
                  paddingRight: "15px",
                  borderRadius: "7px",
                  height: "85vh",
                }}
              >
                Conversations
              </div>

              {/* Col in the middle */}
              <div
                class="col-sm-1"
                style={{
                  height: "5vh",
                }}
              ></div>

              {/* Column 2 */}
              <div class="col-5" style={{ borderRadius: "7px" }}>
                <div class="row row-cols-1">
                  {/* You're Traned Voice */}
                  <div
                    class="col"
                    style={{
                      height: "40vh",
                      border: "2px solid green",
                      borderRadius: "7px",
                    }}
                  >
                    You're Traned Voice
                  </div>
                  {/* Middle Col */}
                  <div
                    class="col"
                    style={{
                      height: "5vh",
                    }}
                  ></div>
                  {/*Weekly Activity on Mimik*/}
                  <div
                    class="col"
                    style={{
                      height: "40vh",
                      border: "2px solid green",
                      borderRadius: "7px",
                    }}
                  >
                    Weekly Activity on Mimik
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
