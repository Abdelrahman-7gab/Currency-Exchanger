import { createContext, useContext, useState } from "react";

const modalContext = createContext();

export function useModal() {
  return useContext(modalContext);
}

export function ModalProvider({ children }) {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  return (
    <modalContext.Provider
      value={{
        openLoginModal,
        setOpenLoginModal,
        openRegisterModal,
        setOpenRegisterModal,
        openLogoutModal,
        setOpenLogoutModal,
      }}
    >
      {children}
    </modalContext.Provider>
  );
}
