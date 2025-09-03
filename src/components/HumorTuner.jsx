import React from 'react'
import { Smile, Zap, Coffee, Brain } from 'lucide-react'

const HumorTuner = ({ humorStyle, setHumorStyle }) => {
  const humorStyles = [
    {
      id: 'witty',
      label: 'Witty',
      description: 'Clever and sharp humor',
      icon: Brain,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'absurd',
      label: 'Absurd',
      description: 'Random and unexpected',
      icon: Zap,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'dry',
      label: 'Dry',
      description: 'Deadpan and sarcastic',
      icon: Coffee,
      color: 'from-gray-500 to-slate-600'
    },
    {
      id: 'wholesome',
      label: 'Wholesome',
      description: 'Feel-good and positive',
      icon: Smile,
      color: 'from-green-500 to-emerald-500'
    }
  ]

  return (
    <div>
      <label className="block text-white font-medium mb-3">
        AI Humor Tuner
      </label>
      <div className="grid grid-cols-2 gap-3">
        {humorStyles.map((style) => {
          const Icon = style.icon
          return (
            <button
              key={style.id}
              onClick={() => setHumorStyle(style.id)}
              className={`p-3 rounded-lg border transition-all duration-200 ${
                humorStyle === style.id
                  ? 'border-purple-400 bg-white/20'
                  : 'border-white/20 bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className={`w-8 h-8 bg-gradient-to-r ${style.color} rounded-lg flex items-center justify-center mb-2`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
              <div className="text-left">
                <div className="text-white font-medium text-sm">{style.label}</div>
                <div className="text-purple-200 text-xs">{style.description}</div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default HumorTuner