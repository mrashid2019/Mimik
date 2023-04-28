import React, { useState, useEffect, useRef } from "react";
import userImg from "../components/profile/images/user.png";
import { Navigate, useNavigate } from "react-router-dom";

import Footer from "../components/Footer";
import Bar from "../components/profile/bar/bar";

//Modal
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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

//Upload
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage, auth, db } from "../firebase";

//User
import { doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { getMetadata, listAll } from "firebase/storage";
import { getAuth, deleteUser } from "firebase/auth";
import * as ReactDOM from "react-dom";

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

const Profile = (props) => {
  const navigate = useNavigate();

  //Modal
  //Name and Image
  console.log(props);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //Username
  const [openDelete, setOpenDelete] = React.useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  //Change first and last name
  const [firstname, setFirstName] = useState();
  const [lastname, setLastName] = useState();
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [user, setUser] = useState();

  //Image URl
  const [profileImg, setprofileImg] = useState(userImg);

  const user_id = auth.currentUser.uid;
  const docRef = doc(db, "RegisteredUsers", user_id);

  //Add Image
  const [file, setFile] = useState(null);

  //Models
  const [models, setModels] = useState("Not Set");
  var m = [];
  var b = ["n", "eee"];
  var modelo = "notsetvet";
  const renderModels = b.map((v) => {
    v = "<tr><td>" + v + "<tr><td>";
    console.log("V:", v);
  });
  const numbers = [1, 2, 3, 4, 5];
  const listItems = m.map((number) => (
    <tr>
      <td>{number}</td>
    </tr>
  ));

  function getItems() {
    var items = m.map((number) => (
      <tr>
        <td>{number}</td>
      </tr>
    ));

    return items;
  }

  //User Information
  const getUserInfo = async () => {
    console.log("RETRIEVING USER INFO");
    const user_info = await getDoc(docRef)
      .then((user_doc) => {
        // setUser(user_doc);
        setFirstName(user_doc.get("firstName"));
        setLastName(user_doc.get("lastName"));
        setUser(user_doc);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateDocument = (event) => {
    console.log("In Update");
    console.log("Out Update");
    event.preventDefault();
    updateDoc(docRef, { firstName: newFirstName, lastName: newLastName })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.error(err);
      });
    navigate("/profile");

    //Delete Previous Imges
    // Create a reference under which you want to list
    const listRef = ref(storage, `profile/${user_id}`);
    deleteDocument(listRef);

    //Add Profile Image
    if (file) {
      addImgDB(file);
    }
    getUserInfo();
    handleClose();
  };

  function deleteDocument(listRef) {
    // Find all the prefixes and items.
    listAll(listRef)
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          // All the prefixes under listRef.
          // You may call listAll() recursively on them.
          console.log("ForderRef", folderRef);
        });
        res.items.forEach((itemRef) => {
          // All the items under listRef.
          console.log("ItemRef", itemRef.fullPath);
          const fileRef = itemRef.fullPath.toString();
          const desertRef = ref(storage, fileRef);

          // Delete the file
          deleteObject(desertRef)
            .then(() => {
              // File deleted successfully
              console.log(" File deleted successfully");
            })
            .catch((error) => {
              // Uh-oh, an error occurred!
              console.log(error);
            });
        });
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error);
      });
  }

  function getImg() {
    // Create a reference under which you want to list
    const listRef = ref(storage, `profile/${user_id}`);

    // Find all the prefixes and items.
    listAll(listRef)
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          // All the prefixes under listRef.
          // You may call listAll() recursively on them.
        });
        res.items.forEach((itemRef) => {
          // All the items under listRef.
          console.log("ItemRef", itemRef.fullPath);
          // Get metadata properties
          const referenceUrl = ref(storage, itemRef.fullPath);

          // Get the download URL
          getDownloadURL(referenceUrl)
            .then((url) => {
              // Insert url into an <img> tag to "download"
              console.log("Image URL:", url);
              setprofileImg(url);
            })
            .catch((error) => {
              // A full list of error codes is available at
              // https://firebase.google.com/docs/storage/web/handle-errors
              switch (error.code) {
                case "storage/object-not-found":
                  // File doesn't exist
                  break;
                case "storage/unauthorized":
                  // User doesn't have permission to access the object
                  break;
                case "storage/canceled":
                  // User canceled the upload
                  break;

                // ...

                case "storage/unknown":
                  // Unknown error occurred, inspect the server response
                  break;
              }
            });
        });
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
  }

  function addImgDB(file) {
    const storageRef = ref(storage, `/profile/${user_id}/${file.name}`); // progress can be paused and resumed. It also exposes progress updates. // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        ); // update progress
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log("uploadTask.snapshot.ref:", uploadTask.snapshot.ref);
          console.log(url);
          setprofileImg(url);
        });
      }
    );
  }

  useEffect(() => {
    getUserInfo();
    getImg();
    getModels();
    getItems("004");
  }, [firstname, lastname]);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const handleSubmitDelete = (event) => {
    event.preventDefault();

    handleCloseDelete();
  };

  const handleDeleteAccount = async (event) => {
    event.preventDefault();

    await deleteDoc(doc(db, "RegisteredUsers", user_id));

    const user = auth.currentUser;

    deleteUser(user)
      .then(() => {
        // User deleted.
        console.log("User Deleted");
      })
      .catch((error) => {
        // An error ocurred
        console.log("Error:", error);
      });
    handleCloseDelete();
    navigate("/Mimik");
  };

  //Get Models
  function getModels() {
    // Create a reference under which you want to list
    const listRef = ref(storage, `AudioSamples/${user_id}`);

    // Find all the prefixes and items.
    listAll(listRef)
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          // All the prefixes under listRef.
          // You may call listAll() recursively on them.
        });
        var urls = "";
        res.items.forEach((itemRef) => {
          // All the items under listRef.
          console.log("ItemRef", itemRef.fullPath);
          // Get metadata properties
          const referenceUrl = ref(storage, itemRef.fullPath);
          // Get the download URL
          getDownloadURL(referenceUrl)
            .then((url) => {
              // Insert url into an <img> tag to "download"
              console.log("Audio URL:", url);

              urls =
                urls +
                (
                  <tr>
                    <td>{url}</td>
                  </tr>
                );
              console.log("urls:", urls);

              console.log("Modelo:", url);
              m.push(
                <tr height="35">
                  <td>
                    <audio controls>
                      <source src={url} type="audio/wav"></source>
                    </audio>
                  </td>
                </tr>
              );
              console.log("M:", m);

              try {
                var myDiv = document.querySelector("#myDiv");
                const trTag = (
                  <tr>
                    <td>{m}</td>
                  </tr>
                );
                ReactDOM.render(trTag, myDiv);
              } catch (err) {
                console.log(err);
              }
            })
            .catch((error) => {
              // A full list of error codes is available at
              // https://firebase.google.com/docs/storage/web/handle-errors
              switch (error.code) {
                case "storage/object-not-found":
                  // File doesn't exist
                  break;
                case "storage/unauthorized":
                  // User doesn't have permission to access the object
                  break;
                case "storage/canceled":
                  // User canceled the upload
                  break;

                // ...

                case "storage/unknown":
                  // Unknown error occurred, inspect the server response
                  break;
              }
            });
        });
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
    setModels(modelo);
  }

  return (
    <>
      <div
        //fills the whole page
        class="container"
        style={{
          paddingTop: "3%",
          display: "flex",
          height: "90vh",
          width: "70%",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* Welcome Message and Search */}
        <div class="row container-fluid" style={{ paddingBottom: "20px" }}>
          <Bar firstName={firstname} />

          <div class="col-3" style={{ borderRight: "3px solid gray" }}>
            <div class="row row-cols-1">
              {/* Edit */}

              <div
                class="col"
                style={{
                  height: "25vh",
                  alignItems: "center",
                  justifyItems: "center",
                  paddingTop: "5%",
                  paddingLeft: "1%",
                }}
              >
                <div
                  class="col-sm"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    alignContent: "center",
                    height: "30vh",
                    position: "absolute",
                    width: "100%",
                    height: "100",
                  }}
                >
                  <img
                    src={profileImg}
                    class="rounded-circle"
                    alt="User Image"
                    style={{
                      width: "200px",
                      height: "200px",
                      marginLeft: "auto",
                      marginRight: "auto",
                      display: "block",
                    }}
                  />
                </div>
              </div>

              {/* Name */}
              <div
                class="col"
                style={{
                  height: "15vh",
                  alignItems: "center",
                  alignContent: "center",
                  display: "flex",
                  alignItems: "end",
                }}
              >
                <div class="col-sm" style={{ fontSize: "150%" }}>
                  {firstname} {lastname}
                </div>
              </div>

              {/* Modal: Edit Account */}
              <div
                class="col"
                style={{
                  height: "15vh",
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
                      fontSize: "85%",
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
                      <form onSubmit={updateDocument}>
                        <DialogContent dividers>
                          <DialogContentText
                            id="modal-modal-title"
                            variant="h6"
                            component="h3"
                            style={{ padding: "10px 0px 20px 0px" }}
                          >
                            You can update your profile by updating these
                            fields:
                          </DialogContentText>
                          {/* First Name */}
                          <TextField
                            margin="dense"
                            id="firstName"
                            label="First Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            inputProps={{ minLength: 2 }}
                            required
                            onChange={(e) => {
                              setNewFirstName(e.target.value);
                              console.log(newFirstName);
                            }}
                          />

                          {/* Last Name */}
                          <TextField
                            autoFocus
                            margin="dense"
                            id="lastName"
                            label="Last Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            inputProps={{ minLength: 2 }}
                            required
                            onChange={(e) => {
                              setNewLastName(e.target.value);
                              console.log(newLastName);
                            }}
                          />

                          {/* Upload Image */}
                          <label htmlFor="profilePhoto">
                            <div
                              style={{
                                paddingTop: "15px",
                                paddingBottom: "5px",
                                fontFamily: "Arial, Helvetica",
                              }}
                            >
                              Upload Image:
                            </div>
                            <input
                              accept="image/*"
                              id="profilePhoto"
                              type="file"
                              style={{ fontFamily: "Arial, Helvetica" }}
                              onChange={handleChange}
                            />
                          </label>
                        </DialogContent>

                        <DialogActions>
                          <Button
                            variant="contained"
                            type="submit"
                            // onClick={updateDocument}
                          >
                            Submit
                          </Button>
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
                  height: "20vh",
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
                      fontSize: "85%",
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
                          <Button onClick={handleCloseDelete}>Cancel</Button>
                          <Button
                            onClick={handleDeleteAccount}
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
              paddingRight: "0px",
              paddingLeft: "0px",
            }}
          >
            <div
              //fills the whole page
              class="container"
            >
              {/* <div class="row row-cols-3"> */}
              <div class="row">
                {/* Column 1 */}
                <div
                  class="col"
                  style={{
                    borderRadius: "7px",
                    height: "75vh",
                  }}
                >
                  <p
                    class="text-capitalize"
                    style={{ padding: "5px", fontSize: "35px" }}
                  >
                    Recently Saved Conversions
                  </p>

                  <table>
                    {getItems()}
                    <div id="myDiv"></div>
                  </table>
                </div>

                {/* Col in the middle
              <div class="col-sm-1"></div>*/}

                {/* Column 2 
              <div class="col-5" style={{ borderRadius: "7px" }}>
                <div class="row row-cols-1">
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

                  <div
                    class="col-1"
                    style={{
                      height: "5vh",
                    }}
                  ></div>

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

              </div>*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
