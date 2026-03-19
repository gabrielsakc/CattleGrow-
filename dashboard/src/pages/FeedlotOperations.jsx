import { useState } from 'react'
import { Search, Filter, Plus, ArrowRightLeft, Eye } from 'lucide-react'
import StatusBadge from '../components/StatusBadge'
import { lots, pens } from '../data/mockData'

export default function FeedlotOperations() {
  const [activeTab, setActiveTab] = useState('lots')
  const [filter, setFilter] = useState('all')

  const filteredLots = filter === 'all' ? lots : lots.filter(l => l.status === filter)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Feedlot Operations</h1>
          <p className="text-sm text-gray-500">Lot tracking, pen movements & lifecycle management</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white text-gray-700 px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 hover:bg-gray-50 flex items-center gap-2">
            <ArrowRightLeft className="w-4 h-4" /> Pen Move
          </button>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 flex items-center gap-2">
            <Plus className="w-4 h-4" /> New Lot
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
        {['lots', 'pens', 'movements'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors ${activeTab === tab ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'lots' && (
        <>
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search lots..." className="pl-9 pr-4 py-2 w-full text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500" />
            </div>
            <div className="flex gap-1.5">
              {['all', 'receiving', 'step-up', 'feeding', 'closeout'].map(f => (
                <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${filter === f ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  {f === 'all' ? 'All Lots' : f}
                </button>
              ))}
            </div>
          </div>

          {/* Lot Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Lot ID</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Owner</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Head</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Pen</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">DOF</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Avg Weight</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Target</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Ration</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">ADG</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">COG</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Entry</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLots.map(lot => {
                    const progress = ((lot.avgWeight - 700) / (lot.targetWeight - 700)) * 100
                    return (
                      <tr key={lot.id} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="px-4 py-3 font-semibold text-primary-700">{lot.id}</td>
                        <td className="px-4 py-3 text-gray-700">{lot.owner}</td>
                        <td className="px-4 py-3 text-gray-700">{lot.headCount}</td>
                        <td className="px-4 py-3 text-gray-700">{lot.penId}</td>
                        <td className="px-4 py-3 text-gray-700">{lot.daysOnFeed}d</td>
                        <td className="px-4 py-3 text-gray-700">{lot.avgWeight} lbs</td>
                        <td className="px-4 py-3 text-gray-700">{lot.targetWeight} lbs</td>
                        <td className="px-4 py-3 text-gray-700">{lot.ration}</td>
                        <td className="px-4 py-3 font-medium text-gray-900">{lot.adg}</td>
                        <td className="px-4 py-3 text-gray-700">${lot.costOfGain}</td>
                        <td className="px-4 py-3"><StatusBadge status={lot.status} /></td>
                        <td className="px-4 py-3 text-gray-500 text-xs">{lot.entryDate}</td>
                        <td className="px-4 py-3">
                          <button className="p-1 rounded hover:bg-gray-100"><Eye className="w-4 h-4 text-gray-400" /></button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Lifecycle Progress */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Lot Lifecycle Progress</h3>
            <div className="space-y-3">
              {lots.map(lot => {
                const progress = Math.min(((lot.avgWeight - 700) / (lot.targetWeight - 700)) * 100, 100)
                return (
                  <div key={lot.id} className="flex items-center gap-4">
                    <span className="w-20 text-sm font-medium text-gray-700">{lot.id}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-3 relative overflow-hidden">
                      <div className={`h-full rounded-full transition-all ${progress > 90 ? 'bg-amber-500' : 'bg-primary-500'}`} style={{ width: `${progress}%` }} />
                    </div>
                    <span className="w-20 text-xs text-gray-500 text-right">{lot.avgWeight}/{lot.targetWeight}</span>
                    <StatusBadge status={lot.status} />
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )}

      {activeTab === 'pens' && (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
          {pens.slice(0, 40).map(pen => (
            <div key={pen.id} className={`rounded-xl border p-3 text-center cursor-pointer transition-all hover:shadow-md ${pen.currentHead > 0 ? 'bg-primary-50 border-primary-200' : 'bg-gray-50 border-gray-200'}`}>
              <p className="text-xs font-bold text-gray-900">{pen.id}</p>
              <p className="text-lg font-bold mt-1">{pen.currentHead > 0 ? pen.currentHead : '—'}</p>
              <p className="text-[10px] text-gray-500">/ {pen.capacity} cap</p>
              {pen.lotId && <p className="text-[10px] font-medium text-primary-600 mt-1">{pen.lotId}</p>}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'movements' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Recent Pen Movements</h3>
          <div className="space-y-4">
            {[
              { date: '2026-03-19', lot: 'LOT-2406', from: 'Receiving', to: 'P-18', head: 260, reason: 'Initial placement' },
              { date: '2026-03-18', lot: 'LOT-2404', from: 'P-20', to: 'P-22', head: 275, reason: 'Step-up transition' },
              { date: '2026-03-17', lot: 'LOT-2403', from: 'P-08', to: 'P-08', head: 250, reason: 'Re-weigh for closeout' },
              { date: '2026-03-15', lot: 'LOT-2407', from: 'P-28', to: 'P-30', head: 295, reason: 'Pen consolidation' },
            ].map((m, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
                <span className="text-xs text-gray-500 w-24">{m.date}</span>
                <span className="font-medium text-sm text-primary-700 w-20">{m.lot}</span>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-600">{m.from}</span>
                  <ArrowRightLeft className="w-3 h-3 text-gray-400" />
                  <span className="text-gray-600">{m.to}</span>
                </div>
                <span className="text-sm text-gray-700">{m.head} hd</span>
                <span className="text-xs text-gray-500">{m.reason}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
