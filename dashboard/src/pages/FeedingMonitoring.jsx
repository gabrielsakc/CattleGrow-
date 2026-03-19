import { AlertCircle, CheckCircle, TrendingDown, TrendingUp } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, ReferenceLine } from 'recharts'
import KpiCard from '../components/KpiCard'
import { bunkScores, feedConsumptionChart, feedInventory } from '../data/mockData'

const intakeVsPlan = [
  { pen: 'P-03', planned: 22.5, actual: 22.1, variance: -1.8 },
  { pen: 'P-05', planned: 18.2, actual: 18.5, variance: 1.6 },
  { pen: 'P-08', planned: 20.1, actual: 19.2, variance: -4.5 },
  { pen: 'P-12', planned: 24.3, actual: 24.0, variance: -1.2 },
  { pen: 'P-15', planned: 19.8, actual: 17.5, variance: -11.6 },
  { pen: 'P-18', planned: 12.5, actual: 12.8, variance: 2.4 },
  { pen: 'P-22', planned: 14.2, actual: 13.8, variance: -2.8 },
  { pen: 'P-30', planned: 21.8, actual: 22.0, variance: 0.9 },
]

const hourlyConsumption = [
  { hour: '5AM', consumption: 28 },
  { hour: '6AM', consumption: 42 },
  { hour: '7AM', consumption: 35 },
  { hour: '8AM', consumption: 18 },
  { hour: '9AM', consumption: 8 },
  { hour: '10AM', consumption: 5 },
  { hour: '11AM', consumption: 3 },
  { hour: '12PM', consumption: 2 },
  { hour: '1PM', consumption: 4 },
  { hour: '2PM', consumption: 22 },
  { hour: '3PM', consumption: 18 },
  { hour: '4PM', consumption: 10 },
]

export default function FeedingMonitoring() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Real-Time Feeding Monitoring</h1>
        <p className="text-sm text-gray-500">Bunk scores, consumption tracking & inventory alerts</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Avg Bunk Score" value="0.6" icon={CheckCircle} color="primary" change="Target: <1.0" changeType="positive" />
        <KpiCard title="Feed Delivered Today" value="85.3" unit="tons" icon={TrendingUp} color="blue" change="of 117.2 planned" />
        <KpiCard title="Variance" value="-2.1%" icon={TrendingDown} color="accent" change="Within tolerance" changeType="positive" />
        <KpiCard title="Inventory Alerts" value="3" icon={AlertCircle} color="red" change="1 critical, 2 warning" />
      </div>

      {/* Bunk Scores */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Today's Bunk Scores</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {bunkScores.map(bs => (
            <div key={bs.penId} className={`rounded-xl p-4 text-center border ${bs.score === 0 ? 'bg-green-50 border-green-200' : bs.score <= 1 ? 'bg-yellow-50 border-yellow-200' : 'bg-red-50 border-red-200'}`}>
              <p className="text-xs font-medium text-gray-600">{bs.penId}</p>
              <p className={`text-3xl font-bold mt-1 ${bs.score === 0 ? 'text-green-600' : bs.score <= 1 ? 'text-yellow-600' : 'text-red-600'}`}>{bs.score}</p>
              <p className="text-[10px] text-gray-500 mt-1">{bs.time}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-4 text-xs">
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-green-200" /> 0 = Clean</div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-yellow-200" /> 0.5–1 = Trace/Some</div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-red-200" /> 2+ = Significant leftover</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Planned vs Actual */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Planned vs Actual Intake (lbs/hd)</h3>
          <div className="space-y-2">
            {intakeVsPlan.map(item => (
              <div key={item.pen} className="flex items-center gap-3">
                <span className="w-10 text-xs font-medium text-gray-700">{item.pen}</span>
                <div className="flex-1 flex items-center gap-2">
                  <div className="flex-1 bg-gray-100 rounded-full h-4 relative overflow-hidden">
                    <div className="absolute h-full bg-gray-300 rounded-full" style={{ width: `${(item.planned / 25) * 100}%` }} />
                    <div className={`absolute h-full rounded-full ${item.variance < -5 ? 'bg-red-400' : 'bg-primary-500'}`} style={{ width: `${(item.actual / 25) * 100}%` }} />
                  </div>
                  <span className={`text-xs font-medium w-12 text-right ${item.variance < -5 ? 'text-red-600' : item.variance > 0 ? 'text-green-600' : 'text-gray-600'}`}>
                    {item.variance > 0 ? '+' : ''}{item.variance}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hourly Consumption */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Hourly Feed Consumption (tons)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={hourlyConsumption}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="hour" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Bar dataKey="consumption" name="Tons" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Weekly Trend */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Weekly Feed Consumption: Planned vs Actual (tons)</h3>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={feedConsumptionChart}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
            <Legend />
            <Line type="monotone" dataKey="planned" name="Planned" stroke="#9ca3af" strokeWidth={2} />
            <Line type="monotone" dataKey="actual" name="Actual" stroke="#22c55e" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Feed Inventory */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Feed Inventory Status</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Item</th>
                <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">On Hand</th>
                <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Daily Usage</th>
                <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Days Remaining</th>
                <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {feedInventory.map(item => (
                <tr key={item.item} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-2.5 font-medium text-gray-900">{item.item}</td>
                  <td className="py-2.5 text-gray-700">{item.onHand} {item.unit}</td>
                  <td className="py-2.5 text-gray-700">{item.dailyUsage} {item.unit}</td>
                  <td className="py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-100 rounded-full h-2">
                        <div className={`h-full rounded-full ${item.daysRemaining < 5 ? 'bg-red-500' : item.daysRemaining < 14 ? 'bg-yellow-500' : 'bg-green-500'}`} style={{ width: `${Math.min(item.daysRemaining / 45 * 100, 100)}%` }} />
                      </div>
                      <span className="text-xs text-gray-600">{item.daysRemaining}d</span>
                    </div>
                  </td>
                  <td className="py-2.5">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.status === 'critical' ? 'bg-red-100 text-red-800' : item.status === 'warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
