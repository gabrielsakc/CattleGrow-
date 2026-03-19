import { useState } from 'react'
import { Plus, Edit3, ArrowRight, Calculator } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts'
import StatusBadge from '../components/StatusBadge'
import { rations, lots, weightProjections } from '../data/mockData'

const stepUpProgram = [
  { day: '1–7', ration: 'Starter', dmIntake: '1.8%', roughage: '40%' },
  { day: '8–14', ration: 'Step-Up 1', dmIntake: '2.0%', roughage: '35%' },
  { day: '15–28', ration: 'Step-Up 2', dmIntake: '2.2%', roughage: '28%' },
  { day: '29–42', ration: 'Step-Up 3', dmIntake: '2.4%', roughage: '22%' },
  { day: '43+', ration: 'Finisher A/B', dmIntake: '2.6%', roughage: '10%' },
]

const costOfGainData = [
  { lot: 'LOT-2401', cog: 0.92, target: 0.90 },
  { lot: 'LOT-2402', cog: 0.88, target: 0.90 },
  { lot: 'LOT-2403', cog: 0.95, target: 0.90 },
  { lot: 'LOT-2404', cog: 0.82, target: 0.90 },
  { lot: 'LOT-2405', cog: 0.90, target: 0.90 },
  { lot: 'LOT-2407', cog: 0.91, target: 0.90 },
]

export default function FeedingSystem() {
  const [activeTab, setActiveTab] = useState('rations')

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Advanced Feeding System</h1>
          <p className="text-sm text-gray-500">Ration management, protocols & performance projections</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white text-gray-700 px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 hover:bg-gray-50 flex items-center gap-2">
            <Calculator className="w-4 h-4" /> Projection Tool
          </button>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 flex items-center gap-2">
            <Plus className="w-4 h-4" /> New Ration
          </button>
        </div>
      </div>

      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
        {['rations', 'protocols', 'projections', 'delivery'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors ${activeTab === tab ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'rations' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rations.map(r => (
              <div key={r.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">{r.name}</h3>
                  <StatusBadge status={r.status} />
                </div>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase">DM %</p>
                    <p className="text-sm font-semibold">{r.dryMatter}%</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase">CP %</p>
                    <p className="text-sm font-semibold">{r.crudeProtein}%</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase">NEL</p>
                    <p className="text-sm font-semibold">{r.nel}</p>
                  </div>
                </div>
                <div className="mb-3">
                  <p className="text-[10px] text-gray-500 uppercase mb-1">Ingredients</p>
                  <div className="flex flex-wrap gap-1">
                    {r.ingredients.map((ing, i) => (
                      <span key={i} className="px-2 py-0.5 bg-gray-100 rounded text-[10px] text-gray-600">{ing}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-sm font-semibold text-primary-700">${r.costPerTon}/ton</span>
                  <button className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1">
                    <Edit3 className="w-3 h-3" /> Edit
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Diet Assignments */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Current Diet Assignments</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Lot</th>
                    <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">DOF</th>
                    <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Current Ration</th>
                    <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Next Ration</th>
                    <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Transition In</th>
                    <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">DM Intake</th>
                  </tr>
                </thead>
                <tbody>
                  {lots.map(lot => {
                    const nextRation = lot.ration === 'Starter' ? 'Step-Up 1' : lot.ration === 'Step-Up 1' ? 'Step-Up 2' : lot.ration.startsWith('Step-Up') ? 'Finisher A' : '—'
                    const daysToTransition = lot.ration.startsWith('Finisher') ? '—' : `${Math.floor(Math.random() * 12) + 3}d`
                    return (
                      <tr key={lot.id} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="py-2.5 font-medium text-primary-700">{lot.id}</td>
                        <td className="py-2.5 text-gray-700">{lot.daysOnFeed}d</td>
                        <td className="py-2.5"><span className="px-2 py-0.5 bg-primary-50 text-primary-700 rounded text-xs font-medium">{lot.ration}</span></td>
                        <td className="py-2.5 text-gray-600 flex items-center gap-1">{nextRation !== '—' && <ArrowRight className="w-3 h-3 text-gray-400" />}{nextRation}</td>
                        <td className="py-2.5 text-gray-700">{daysToTransition}</td>
                        <td className="py-2.5 text-gray-700">2.4%</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {activeTab === 'protocols' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Step-Up Feeding Protocol</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="pb-3 text-left text-xs font-semibold text-gray-500 uppercase">Feeding Days</th>
                  <th className="pb-3 text-left text-xs font-semibold text-gray-500 uppercase">Ration</th>
                  <th className="pb-3 text-left text-xs font-semibold text-gray-500 uppercase">DM Intake (% BW)</th>
                  <th className="pb-3 text-left text-xs font-semibold text-gray-500 uppercase">Roughage</th>
                </tr>
              </thead>
              <tbody>
                {stepUpProgram.map((step, i) => (
                  <tr key={i} className="border-b border-gray-50">
                    <td className="py-3 font-medium text-gray-900">{step.day}</td>
                    <td className="py-3"><span className="px-2.5 py-1 bg-primary-50 text-primary-700 rounded-lg text-xs font-medium">{step.ration}</span></td>
                    <td className="py-3 text-gray-700">{step.dmIntake}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-100 rounded-full h-2">
                          <div className="bg-primary-500 h-full rounded-full" style={{ width: step.roughage }} />
                        </div>
                        <span className="text-gray-600 text-xs">{step.roughage}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h4 className="text-sm font-semibold text-blue-800 mb-2">Automatic Transition Rules</h4>
            <ul className="text-xs text-blue-700 space-y-1.5">
              <li>• Rations automatically transition based on feeding days per lot</li>
              <li>• Bunk score triggers adjust transition timing (score ≥2 delays by 3 days)</li>
              <li>• Nutritionist approval required for off-schedule transitions</li>
              <li>• Weather-adjusted intake modifiers applied automatically</li>
            </ul>
          </div>
        </div>
      )}

      {activeTab === 'projections' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Weight Projection (LOT-2402)</h3>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={weightProjections}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="week" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} domain={[700, 1400]} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                  <Legend />
                  <Line type="monotone" dataKey="projected" name="Projected" stroke="#22c55e" strokeWidth={2} strokeDasharray="5 5" />
                  <Line type="monotone" dataKey="actual" name="Actual" stroke="#3b82f6" strokeWidth={2} connectNulls={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Cost of Gain by Lot ($/lb)</h3>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={costOfGainData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="lot" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 11 }} domain={[0.7, 1.1]} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                  <Bar dataKey="cog" name="Cost of Gain" fill="#22c55e" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="target" name="Target" fill="#e5e7eb" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Closeout Projections</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Lot</th>
                    <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Current Wt</th>
                    <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Target Wt</th>
                    <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">ADG</th>
                    <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Remaining</th>
                    <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Est. Closeout</th>
                    <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Est. Feed Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {lots.filter(l => l.status !== 'closeout').map(lot => {
                    const remaining = Math.ceil((lot.targetWeight - lot.avgWeight) / lot.adg)
                    const estFeedCost = (remaining * lot.headCount * 4.82).toFixed(0)
                    const closeoutDate = new Date(2026, 2, 19 + remaining).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                    return (
                      <tr key={lot.id} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="py-2.5 font-medium text-primary-700">{lot.id}</td>
                        <td className="py-2.5 text-gray-700">{lot.avgWeight} lbs</td>
                        <td className="py-2.5 text-gray-700">{lot.targetWeight} lbs</td>
                        <td className="py-2.5 text-gray-700">{lot.adg} lbs</td>
                        <td className="py-2.5 text-gray-700">{remaining}d</td>
                        <td className="py-2.5 font-medium text-gray-900">{closeoutDate}</td>
                        <td className="py-2.5 text-gray-700">${Number(estFeedCost).toLocaleString()}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'delivery' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Feed Delivery Plan — Today</h3>
          <div className="space-y-3">
            {[
              { time: '05:30 AM', truck: 'Truck 1', ration: 'Finisher A', pens: 'P-03 → P-12 → P-30', load: '18.5 tons', status: 'completed' },
              { time: '06:00 AM', truck: 'Truck 2', ration: 'Step-Up 3', pens: 'P-15 → P-16 → P-17', load: '16.2 tons', status: 'completed' },
              { time: '06:30 AM', truck: 'Truck 1', ration: 'Starter', pens: 'P-18 → P-19', load: '8.4 tons', status: 'completed' },
              { time: '07:00 AM', truck: 'Truck 3', ration: 'Finisher B', pens: 'P-05 → P-08', load: '14.8 tons', status: 'in-progress' },
              { time: '07:30 AM', truck: 'Truck 2', ration: 'Step-Up 1', pens: 'P-22 → P-23', load: '10.1 tons', status: 'pending' },
              { time: '02:00 PM', truck: 'Truck 1', ration: 'Finisher A', pens: 'P-03 → P-12 → P-30', load: '12.3 tons', status: 'pending' },
            ].map((d, i) => (
              <div key={i} className={`flex flex-wrap items-center gap-4 p-3 rounded-lg border ${d.status === 'completed' ? 'bg-green-50 border-green-100' : d.status === 'in-progress' ? 'bg-blue-50 border-blue-100' : 'bg-gray-50 border-gray-100'}`}>
                <span className="w-20 text-sm font-semibold text-gray-900">{d.time}</span>
                <span className="text-sm text-gray-700 w-20">{d.truck}</span>
                <span className="px-2 py-0.5 bg-white rounded text-xs font-medium text-gray-700 border">{d.ration}</span>
                <span className="text-sm text-gray-600 flex-1 min-w-[140px]">{d.pens}</span>
                <span className="text-sm font-medium text-gray-900">{d.load}</span>
                <StatusBadge status={d.status} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
