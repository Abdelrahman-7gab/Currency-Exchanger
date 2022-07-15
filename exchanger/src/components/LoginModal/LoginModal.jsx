import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import "./loginModal.css";
import Typography from "@mui/material/Typography";
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

function LoginModal({ open, handleClose,openRegisterModal }) {
  const [statusMessage, setStatusMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res =await apiService.LoginUser(email, password);
    //set the token in the local storage
      localStorage.setItem("user", JSON.stringify(res.data));
      setStatusMessage("");
      handleClose();
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
        <form className="loginForm">
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

          <Typography>
            <Button onClick={openRegisterModal}>Create a new Account</Button>
          </Typography>
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
              Login
            </Button>
          </div>
        </form>
        <Typography color="error">{statusMessage}</Typography>
      </Box>
    </Modal>
  );
}

export default LoginModal;
