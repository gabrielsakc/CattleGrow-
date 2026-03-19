import { Beef, Wheat, HeartPulse, DollarSign, TrendingUp, Fence, AlertTriangle, Calendar } from 'lucide-react'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import KpiCard from '../components/KpiCard'
import StatusBadge from '../components/StatusBadge'
import { kpis, performanceChart, lots, alerts, feedConsumptionChart } from '../data/mockData'

const lotStatusData = [
  { name: 'Feeding', value: 4, color: '#22c55e' },
  { name: 'Step-Up', value: 1, color: '#3b82f6' },
  { name: 'Closeout', value: 2, color: '#f59e0b' },
  { name: 'Receiving', value: 1, color: '#a855f7' },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Feedlot Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">Real-time overview — March 19, 2026</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="bg-white text-gray-700 px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Reports
          </button>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors">
            + New Lot
          </button>
        </div>
      </div>

      {/* Critical Alerts Banner */}
      {alerts.filter(a => a.type === 'critical').length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <h3 className="text-sm font-semibold text-red-800">Critical Alerts</h3>
          </div>
          <div className="space-y-1">
            {alerts.filter(a => a.type === 'critical').map(a => (
              <p key={a.id} className="text-sm text-red-700">{a.message}</p>
            ))}
          </div>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Total Head" value={kpis.totalHead.toLocaleString()} icon={Beef} color="primary" change="+2.1% vs last month" changeType="positive" />
        <KpiCard title="Avg Daily Gain" value={kpis.avgDailyGain} unit="lbs/day" icon={TrendingUp} color="emerald" change="+0.04 lbs" changeType="positive" />
        <KpiCard title="Feed Cost/Head/Day" value={`$${kpis.feedCostPerHead}`} icon={Wheat} color="accent" change="+$0.02" changeType="negative" />
        <KpiCard title="Feed Conversion" value={kpis.feedConversion} unit="F:G" icon={Wheat} color="blue" change="-0.1 (improved)" changeType="positive" />
        <KpiCard title="Active Lots" value={kpis.totalLots} icon={Fence} color="purple" change="6 closeouts projected" />
        <KpiCard title="Occupancy" value={`${kpis.occupancyRate}%`} icon={Fence} color="primary" change={`${kpis.activePens}/${kpis.totalPens} pens`} />
        <KpiCard title="Mortality Rate" value={`${kpis.mortalityRate}%`} icon={HeartPulse} color="red" change="-0.2% vs last month" changeType="positive" />
        <KpiCard title="Pending Treatments" value={kpis.pendingTreatments} icon={HeartPulse} color="red" change="3 in hospital" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Performance Trend (6 Months)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={performanceChart}>
              <defs>
                <linearGradient id="colorAdg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} domain={[3.0, 3.6]} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Area type="monotone" dataKey="adg" name="ADG (lbs)" stroke="#22c55e" fill="url(#colorAdg)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Lot Status Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={lotStatusData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value" paddingAngle={4}>
                {lotStatusData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-2 justify-center">
            {lotStatusData.map(item => (
              <div key={item.name} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-gray-600">{item.name} ({item.value})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feed Consumption & Lot Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Feed: Planned vs Actual (tons)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={feedConsumptionChart}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Bar dataKey="planned" name="Planned" fill="#e0e7ff" radius={[4, 4, 0, 0]} />
              <Bar dataKey="actual" name="Actual" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900">Active Lots</h3>
            <button className="text-xs text-primary-600 font-medium hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Lot</th>
                  <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Head</th>
                  <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">DOF</th>
                  <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Avg Wt</th>
                  <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">ADG</th>
                  <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {lots.slice(0, 6).map(lot => (
                  <tr key={lot.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-2.5 font-medium text-gray-900">{lot.id}</td>
                    <td className="py-2.5 text-gray-700">{lot.headCount}</td>
                    <td className="py-2.5 text-gray-700">{lot.daysOnFeed}d</td>
                    <td className="py-2.5 text-gray-700">{lot.avgWeight} lbs</td>
                    <td className="py-2.5 text-gray-700">{lot.adg}</td>
                    <td className="py-2.5"><StatusBadge status={lot.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
