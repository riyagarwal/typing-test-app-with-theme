import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AppBar, Box, Modal, Tab, Tabs } from "@mui/material";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import GoogleButton from "react-google-button";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { toast } from "react-toastify";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
const AccountCircle = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [user] = useAuthState(auth);
  
  const handleClose = () => {
    setOpen(false);
  };

  const handleValueChange = (e, v) => {
    setValue(v);
  };

  const navigate = useNavigate();

  const handleUserIconClick = () => {
    if (user) {
      // navigate to /user
      navigate("/user");
    } else {
      setOpen(true);
    }
  };

  const logout = () => {
    auth.signOut().then((res) => {
      toast.success("Logged out", {
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    });
  };

  // Reference:- https://firebase.google.com/docs/auth/web/google-signin?hl=en&authuser=0

  // Create an instance of the Google provider object
  const googleProvider = new GoogleAuthProvider();
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        toast.success("User logged in!", {
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        handleClose();
      })
      .catch((err) => {
        toast.error("Google auth failed!", {
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  };

  return (
    <div>
      <AccountCircleIcon
        style={{ cursor: "pointer" }}
        onClick={handleUserIconClick}
      />
      {user && <LogoutIcon onClick={logout} />}

      <Modal
        open={open}
        onClose={handleClose}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(2px)",
        }}
      >
        <div className="box" style={{ width: "400px", textAlign: "center" }}>
          {/* Modal Heading/navbar */}
          <AppBar position="static" style={{ background: "transparent" }}>
            <Tabs
              value={value}
              onChange={handleValueChange}
              variant="fullWidth"
            >
              <Tab label="login" style={{ color: "white" }} />
              <Tab label="signup" style={{ color: "white" }} />
            </Tabs>
          </AppBar>
          {value === 0 && <LoginForm handleClose={handleClose} />}
          {value === 1 && <SignupForm handleClose={handleClose} />}
          <Box>
            <span>OR</span>
            <GoogleButton
              style={{ width: "90%", margin: "auto", marginTop: "20px" }}
              onClick={handleGoogleSignIn}
            />
          </Box>
        </div>
      </Modal>
    </div>
  );
};

export default AccountCircle;

// each tab in the tabs component has a value starting from 0
