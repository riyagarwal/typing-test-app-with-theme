import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../firebaseConfig";

const LoginForm = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = () => {
    if (!email || !password) {
      toast.warn("Please fill all details", {
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        toast.success("User logged in!", {
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        handleClose();
        return;
      })
      .catch((err) => {
        if (err.message.split(": ")[1].split("(")[0] === "Error ") {
          toast.error("Invalid credentials", { theme: "dark" });
        } else {
          toast.error(err.message.split(": ")[1].split("(")[0], {
            theme: "dark",
          });
        }
        return;
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
      <TextField
        type="email"
        variant="outlined"
        label="Enter Email"
        // to change style of placeholder
        InputLabelProps={{
          style: {
            color: "white",
          },
        }}
        // to change style of user input
        InputProps={{
          style: {
            color: "white",
          },
        }}
        onChange={(e) => setEmail(e.target.value)}
      />
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

      <Button variant="contained" size="large" onClick={handleSubmit}>
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
