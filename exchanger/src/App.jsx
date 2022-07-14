import './App.css'
import Header from './components/Header/Header'
import Exchanger from './components/Exchanger/Exchanger'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main">
        <Exchanger />
      </div>
      <Footer />
    </div>
  )
}

export default App
