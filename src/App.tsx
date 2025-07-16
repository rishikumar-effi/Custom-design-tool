import './App.css'
import Playground from './components/Playground'
import ToolBar from './components/ToolBar'
import SidePanel from './components/SidePanel'
import { ToolProvider } from './context/ToolProvider'

function App() {
  return (
    <ToolProvider>
      <main id="main" style={{minHeight: '50em'}}>
        <ToolBar/>
        <Playground/>
        <SidePanel/>
      </main>
    </ToolProvider>
  )
}

export default App
