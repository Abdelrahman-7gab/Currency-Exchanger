import './App.css'
import header from './components/header/header'
import exchanger from './components/exchanger/exchanger'
import footer from './components/footer/footer'

function App() {
  return (
    <div className="App">
      {header()}
      <div className="main">
      {exchanger()}
      </div>
      {footer()}
    </div>
  )
}

export default App
