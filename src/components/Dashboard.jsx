import React from 'react'
import MemeGenerator from './MemeGenerator'
import TrendAnalytics from './TrendAnalytics'
import EngagementPredictor from './EngagementPredictor'
import Settings from './Settings'
import Account from './Account'

const Dashboard = ({ activeTab }) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'generator':
        return <MemeGenerator />
      case 'trends':
        return <TrendAnalytics />
      case 'predictor':
        return <EngagementPredictor />
      case 'settings':
        return <Settings />
      case 'account':
        return <Account />
      default:
        return <MemeGenerator />
    }
  }

  return (
    <div className="flex-1 p-6">
      <div className="max-w-6xl mx-auto">
        {renderContent()}
      </div>
    </div>
  )
}

export default Dashboard