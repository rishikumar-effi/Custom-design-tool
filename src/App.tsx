import './App.css'
import React, { Suspense } from 'react';
const ToolBar = React.lazy(() => import('./components/ToolBar'));
const Playground = React.lazy(() => import('./components/Playground'));
const SidePanel = React.lazy(() => import('./components/SidePanel'));
import { ToolProvider } from './context/ToolProvider'

function App() {
  return (
    <ToolProvider>
      <main id="main" style={{minHeight: '50em'}}>
        <Suspense fallback={<p>Loading...</p>}><ToolBar/></Suspense>
        <Suspense fallback={<p>Loading...</p>}><Playground/></Suspense>
        <Suspense fallback={<p>Loading...</p>}><SidePanel/></Suspense>
      </main>
    </ToolProvider>
  )
}

export default App
