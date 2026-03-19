import { TrendingUp, TrendingDown } from 'lucide-react'

export default function KpiCard({ title, value, unit, change, changeType, icon: Icon, color = 'primary' }) {
  const colors = {
    primary: 'bg-primary-50 text-primary-600',
    accent: 'bg-accent-50 text-accent-600',
    blue: 'bg-blue-50 text-blue-600',
    red: 'bg-red-50 text-red-600',
    purple: 'bg-purple-50 text-purple-600',
    emerald: 'bg-emerald-50 text-emerald-600',
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{title}</p>
          <div className="flex items-baseline gap-1.5 mt-2">
            <span className="text-2xl font-bold text-gray-900">{value}</span>
            {unit && <span className="text-sm text-gray-500">{unit}</span>}
          </div>
          {change !== undefined && (
            <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${changeType === 'positive' ? 'text-green-600' : changeType === 'negative' ? 'text-red-600' : 'text-gray-500'}`}>
              {changeType === 'positive' ? <TrendingUp className="w-3 h-3" /> : changeType === 'negative' ? <TrendingDown className="w-3 h-3" /> : null}
              {change}
            </div>
          )}
        </div>
        {Icon && (
          <div className={`p-2.5 rounded-lg ${colors[color]}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
    </div>
  )
}
