import React, { useState } from 'react'
import Dashboard from './components/Dashboard'
import Sidebar from './components/Sidebar'
import { AppProvider } from './context/AppContext'

function App() {
  const [activeTab, setActiveTab] = useState('generator')

  return (
    <AppProvider>
      <div className="min-h-screen gradient-bg">
        <div className="flex">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <Dashboard activeTab={activeTab} />
        </div>
      </div>
    </AppProvider>
  )
}

export default App