import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import "./loginModal.css";
import Typography from "@mui/material/Typography";
import apiService from "../../services/APIservice";
import { useModal } from "../../contextProviders/modalContext";

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

function LoginModal() {
  const [statusMessage, setStatusMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { openLoginModal, setOpenLoginModal, setOpenRegisterModal } =
    useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiService.LoginUser(email, password);
      //set the token in the local storage
      localStorage.setItem("user", JSON.stringify(res.data));
      setStatusMessage("");
      setOpenLoginModal(false);
    } catch (err) {
      console.log(err);
      setStatusMessage(err.response.data.message);
    }
  };

  return (
    <Modal
      open={openLoginModal}
      onClose={(e) => {
        false;
      }}
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
            <Button
              onClick={(e) => {
                setOpenLoginModal(false);
                setOpenRegisterModal(true);
              }}
            >
              Create a new Account
            </Button>
          </Typography>
          <div className="buttons-container">
            <Button
              variant="contained"
              onClick={(e) => {
                setOpenLoginModal(false);
              }}
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
