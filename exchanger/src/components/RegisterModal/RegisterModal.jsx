import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import "./registerModal.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import apiService from "../../services/APIservice";

const Modalstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#242424",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function RegisterModal({ open, handleClose }) {
  const [statusMessage, setStatusMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiService.RegisterUser(email, userName,password);
      setStatusMessage("Registration successful");
    } catch (err) {
      console.log(err);
      setStatusMessage(err.response.data.message);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={Modalstyle}>
        <form className="registerForm">
          <TextField
            label="Username"
            variant="filled"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            label="Email"
            variant="filled"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            variant="filled"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="buttons-container">
            <Button
              variant="contained"
              onClick={handleClose}
              color="inherit"
              sx={{ color: "black" }}
            >
              Close
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="warning"
              onClick={handleSubmit}
            >
              Signup
            </Button>
          </div>
        </form>
        <Typography>{statusMessage}</Typography>
      </Box>
    </Modal>
  );
}

export default RegisterModal;
