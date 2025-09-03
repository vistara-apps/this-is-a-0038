import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import Auth from './components/Auth/Auth';

function App() {
  const [activeTab, setActiveTab] = useState('generator');

  return (
    <AuthProvider>
      <AppProvider>
        <div className="min-h-screen gradient-bg">
          <div className="flex">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <Dashboard activeTab={activeTab} />
          </div>
          {/* Auth component will be conditionally rendered based on auth state */}
          <Auth />
        </div>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
