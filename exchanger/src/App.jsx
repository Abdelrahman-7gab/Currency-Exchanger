import "./App.css";
import Header from "./components/Header/Header";
import Exchanger from "./components/Exchanger/Exchanger";
import { GlobalProvider } from "./contextProviders/globalContext";

function App() {
  return (
    <GlobalProvider>
      <div className="App">
        <Header />
        <div className="main">
          <Exchanger />
        </div>
      </div>
    </GlobalProvider>
  );
}

export default App;
