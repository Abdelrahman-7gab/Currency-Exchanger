import { FavoritesProvider } from "./favoritesContext";
import { UserLoginProvider } from "./userContext";
import { ModalProvider } from "./modalContext";

export function GlobalProvider({ children }) {
  return (
    <ModalProvider>
      <UserLoginProvider>
        <FavoritesProvider>{children}</FavoritesProvider>
      </UserLoginProvider>
    </ModalProvider>
  );
}
