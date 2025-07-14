import './App.css'
import Playground from './components/Playground'
import ToolBar from './components/ToolBar'

function App() {
  return (
    <main id="main" style={{minHeight: '50em'}}>
      <ToolBar/>
      <Playground/>
    </main>
  )
}

export default App
