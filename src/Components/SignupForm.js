import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../firebaseConfig";
const SignupForm = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    if (!email || !password || !confirmPassword) {
      toast.warn("Please fill all details", {
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    if (password !== confirmPassword) {
      toast.warn("Password mismatch!", {
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    // resolves in a promise
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        toast.success("User created!", {
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        handleClose();
      })
      .catch((err) => {
        console.log(err)
        if (err && err.message) {
          toast.error(err.message.split(': ')[1].split('(')[0], { theme: "dark" });
        } else {
          toast.error("An error occurred while creating the user.");
        }
      });
  };

  return (
    <Box
      p={3}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      {/* Email */}
      <TextField
        type="email"
        variant="outlined"
        label="Enter Email"
        InputLabelProps={{
          style: {
            color: "white",
          },
        }}
        InputProps={{
          style: {
            color: "white",
          },
        }}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Password */}
      <TextField
        type="password"
        variant="outlined"
        label="Enter Password"
        InputLabelProps={{
          style: {
            color: "white",
          },
        }}
        InputProps={{
          style: {
            color: "white",
          },
        }}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Confirm Password */}
      <TextField
        type="password"
        variant="outlined"
        label="Confirm Password"
        InputLabelProps={{
          style: {
            color: "white",
          },
        }}
        InputProps={{
          style: {
            color: "white",
          },
        }}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button variant="contained" size="large" onClick={handleSubmit}>
        Signup
      </Button>
    </Box>
  );
};

export default SignupForm;
