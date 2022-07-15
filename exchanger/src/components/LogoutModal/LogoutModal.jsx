import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import "./LogoutModal.css";
import { useLogin } from "../../services/userContext";

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

function LogoutModal({ open, handleClose}) {
  const {logout} = useLogin();
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={Modalstyle}>
        <Typography variant="h6" id="modal-modal-title">
          Are you sure you want to logout?
        </Typography>
        <div className="buttons-container">
          <Button
            variant="contained"
            color="inherit"
            onClick={handleClose}
            className="logout-button"
            sx={{ color: "black" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={logout}
            className="logout-button"
          >
            Logout
          </Button>
        </div>
      </Box>
    </Modal>
  );
}

export default LogoutModal;
