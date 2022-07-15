import React from "react";
import "./header.css";
import logo from "../../assets/logo.png";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import { useState } from "react";

function Header() {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);

  const handleOpenLoginModal = () => {
    setOpenLoginModal(true);
  };

  const handleOpenRegisterModal = () => {
    setOpenRegisterModal(true);
  };

  const handleCloseLoginModal = () => {
    setOpenLoginModal(false);
  };

  const handleCloseRegisterModal = () => {
    setOpenRegisterModal(false);
  };

  return (
    <header className="header-container">
      <div className="logo-container">
        <img className="logo" src={logo} />
        Exchanger
      </div>

      <ul className="refs">
        <li onClick={handleOpenLoginModal}>
          <LoginIcon />
          Login
        </li>

        <li onClick={handleOpenRegisterModal}>
          <HowToRegIcon />
          Register
        </li>
      </ul>

      <LoginModal
        open={openLoginModal}
        handleClose={handleCloseLoginModal}
      />
      <RegisterModal
        open={openRegisterModal}
        handleClose={handleCloseRegisterModal}
      />
    </header>
  );
}

export default Header;
