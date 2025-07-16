import './App.css'
import Playground from './components/Playground'
import ToolBar from './components/ToolBar'
import { ToolProvider } from './context/ToolProvider'

function App() {
  return (
    <ToolProvider>
      <main id="main" style={{minHeight: '50em'}}>
        <ToolBar/>
        <Playground/>
      </main>
    </ToolProvider>
  )
}

export default App
