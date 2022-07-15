import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import "./LogoutModal.css";
import { useLogin } from "../../contextProviders/userContext";
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

function LogoutModal() {
  const { logout } = useLogin();
  const { openLogoutModal, setOpenLogoutModal } = useModal();

  return (
    <Modal
      open={openLogoutModal}
      onClose={(e) => {
        setOpenLogoutModal(false);
      }}
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
            onClick={(e) => {
              setOpenLogoutModal(false);
            }}
            className="logout-button"
            sx={{ color: "black" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={(e) => logout()}
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
