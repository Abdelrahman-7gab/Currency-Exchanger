import "./App.css";
import Header from "./components/Header/Header";
import Exchanger from "./components/Exchanger/Exchanger";
import Footer from "./components/Footer/Footer";
import { UserLoginProvider} from "./services/userContext";

function App() {
  return (
    <UserLoginProvider>
      <div className="App">
        <Header />
        <div className="main">
          <Exchanger />
        </div>
        <Footer />
      </div>
    </UserLoginProvider>
  );
}

export default App;
