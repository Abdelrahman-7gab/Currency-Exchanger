import "./header.css";
import logo from "../../assets/logo.png";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import LogoutModal from "../LogoutModal/LogoutModal";
import { useState, useEffect } from "react";
import { useLogin } from "../../services/userContext";

function Header() {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const {loggedIn, setLoggedIn} = useLogin();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    //check if token is in local storage and set loggedin to true
    const user = localStorage.getItem("user");
    if (user) {
      setLoggedIn(true);
      setUserName(JSON.parse(user).username);
    }
  }, [openLoginModal]);

  useEffect(() => {
    //close the logout modal if the user logs out
    if (!loggedIn) {
      setUserName("");
      setOpenLogoutModal(false);
    }
  }
  , [loggedIn]);

  const switchLoginToRegister = () => {
    setOpenLoginModal(false);
    setOpenRegisterModal(true);
  }

  return (
    <header className="header-container">
      <div className="logo-container">
        <img className="logo" src={logo} />
        Exchanger
      </div>

      {!loggedIn && (
        <ul className="refs">
          <li onClick={(e) => setOpenLoginModal(true)}>
            <LoginIcon />
            Login
          </li>

          <li onClick={(e) => setOpenRegisterModal(true)}>
            <HowToRegIcon />
            Register
          </li>
        </ul>
      )}

      {loggedIn && (
        <ul className="refs">
          <li>
            <span style={{ marginRight: "5px", cursor: "auto" }}>
              {userName}
            </span>
            <LogoutIcon onClick={(e) => setOpenLogoutModal(true)} />
          </li>
        </ul>
      )}

      <LoginModal
        open={openLoginModal}
        handleClose={(e) => setOpenLoginModal(false)}
        openRegisterModal={switchLoginToRegister}
      />
      <RegisterModal
        open={openRegisterModal}
        handleClose={(e) => setOpenRegisterModal(false)}
      />
      <LogoutModal
        open={openLogoutModal}
        handleClose={(e) => setOpenLogoutModal(false)}
      />
    </header>
  );
}

export default Header;
