import { Search, Download, TrendingUp } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar } from 'recharts'
import KpiCard from '../components/KpiCard'
import StatusBadge from '../components/StatusBadge'
import { lots, weightProjections } from '../data/mockData'

const closeoutReport = [
  { lot: 'LOT-2390', headIn: 280, headOut: 277, daysOnFeed: 162, inWeight: 725, outWeight: 1365, adg: 3.95, feedConversion: 5.6, costOfGain: 0.88, deathLoss: '1.1%', profit: '+$42/hd' },
  { lot: 'LOT-2388', headIn: 295, headOut: 293, daysOnFeed: 155, inWeight: 740, outWeight: 1348, adg: 3.92, feedConversion: 5.7, costOfGain: 0.91, deathLoss: '0.7%', profit: '+$38/hd' },
  { lot: 'LOT-2385', headIn: 260, headOut: 256, daysOnFeed: 168, inWeight: 710, outWeight: 1372, adg: 3.94, feedConversion: 5.8, costOfGain: 0.94, deathLoss: '1.5%', profit: '+$28/hd' },
]

const performanceByLot = lots.map(l => ({
  lot: l.id,
  adg: l.adg,
  target: 3.40,
}))

export default function LivestockManagement() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Livestock Management</h1>
          <p className="text-sm text-gray-500">Individual & lot tracking, weight projections & closeout analytics</p>
        </div>
        <button className="bg-white text-gray-700 px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 hover:bg-gray-50 flex items-center gap-2">
          <Download className="w-4 h-4" /> Export Report
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Total Head on Feed" value="12,450" icon={TrendingUp} color="primary" />
        <KpiCard title="Avg Days on Feed" value="142" unit="days" color="blue" />
        <KpiCard title="Avg ADG" value="3.42" unit="lbs/day" color="emerald" change="+0.04 from last month" changeType="positive" />
        <KpiCard title="Avg Feed Conversion" value="5.8" unit="F:G" color="accent" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weight Projections */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Weight Projection — LOT-2402</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={weightProjections}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} domain={[700, 1400]} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Legend />
              <Line type="monotone" dataKey="projected" name="Projected" stroke="#9ca3af" strokeWidth={2} strokeDasharray="5 5" />
              <Line type="monotone" dataKey="actual" name="Actual" stroke="#22c55e" strokeWidth={2} connectNulls={false} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* ADG Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">ADG Performance by Lot</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={performanceByLot}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="lot" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 11 }} domain={[2.5, 4.0]} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Bar dataKey="adg" name="ADG" fill="#22c55e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="target" name="Target" fill="#e5e7eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Active Lots Detail */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-900">Active Lots Performance</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search..." className="pl-9 pr-4 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 w-48" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Lot</th>
                <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Owner</th>
                <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Head</th>
                <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">DOF</th>
                <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">In Wt</th>
                <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Curr Wt</th>
                <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Target Wt</th>
                <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">ADG</th>
                <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">COG</th>
                <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {lots.map(lot => (
                <tr key={lot.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-2.5 font-medium text-primary-700">{lot.id}</td>
                  <td className="py-2.5 text-gray-700">{lot.owner}</td>
                  <td className="py-2.5 text-gray-700">{lot.headCount}</td>
                  <td className="py-2.5 text-gray-700">{lot.daysOnFeed}d</td>
                  <td className="py-2.5 text-gray-500">{lot.avgWeight - (lot.adg * lot.daysOnFeed)} lbs</td>
                  <td className="py-2.5 font-medium text-gray-900">{lot.avgWeight} lbs</td>
                  <td className="py-2.5 text-gray-700">{lot.targetWeight} lbs</td>
                  <td className="py-2.5 font-medium text-green-600">{lot.adg}</td>
                  <td className="py-2.5 text-gray-700">${lot.costOfGain}</td>
                  <td className="py-2.5"><StatusBadge status={lot.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Closeout Analytics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Recent Closeout Reports</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Lot</th>
                <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Hd In/Out</th>
                <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">DOF</th>
                <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">In Wt</th>
                <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Out Wt</th>
                <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">ADG</th>
                <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">F:G</th>
                <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">COG</th>
                <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Death Loss</th>
                <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Profit</th>
              </tr>
            </thead>
            <tbody>
              {closeoutReport.map(r => (
                <tr key={r.lot} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-2.5 font-medium text-gray-900">{r.lot}</td>
                  <td className="py-2.5 text-gray-700">{r.headIn}/{r.headOut}</td>
                  <td className="py-2.5 text-gray-700">{r.daysOnFeed}d</td>
                  <td className="py-2.5 text-gray-700">{r.inWeight} lbs</td>
                  <td className="py-2.5 text-gray-700">{r.outWeight} lbs</td>
                  <td className="py-2.5 font-medium text-green-600">{r.adg}</td>
                  <td className="py-2.5 text-gray-700">{r.feedConversion}</td>
                  <td className="py-2.5 text-gray-700">${r.costOfGain}</td>
                  <td className="py-2.5 text-gray-700">{r.deathLoss}</td>
                  <td className="py-2.5 font-semibold text-green-600">{r.profit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
