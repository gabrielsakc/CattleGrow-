import { Wifi, WifiOff, Activity, Thermometer, RefreshCw } from 'lucide-react'
import KpiCard from '../components/KpiCard'
import StatusBadge from '../components/StatusBadge'
import { equipmentStatus } from '../data/mockData'

const iconMap = {
  scale: Activity,
  eid: Wifi,
  micro: RefreshCw,
  loadcell: Activity,
  weather: Thermometer,
}

export default function Hardware() {
  const online = equipmentStatus.filter(e => e.status === 'online').length
  const offline = equipmentStatus.filter(e => e.status === 'offline').length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Hardware & Equipment</h1>
        <p className="text-sm text-gray-500">Scales, EID readers, micro-ingredient systems & real-time data ingestion</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Devices Online" value={online} icon={Wifi} color="primary" change={`of ${equipmentStatus.length} total`} changeType="positive" />
        <KpiCard title="Devices Offline" value={offline} icon={WifiOff} color="red" change="EID Reader Chute 2" />
        <KpiCard title="Avg Accuracy" value="99.7%" icon={Activity} color="emerald" change="All within spec" changeType="positive" />
        <KpiCard title="Data Points Today" value="14,328" icon={RefreshCw} color="blue" change="Real-time streaming" />
      </div>

      {/* Equipment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {equipmentStatus.map(eq => {
          const Icon = iconMap[eq.type] || Activity
          return (
            <div key={eq.name} className={`bg-white rounded-xl shadow-sm border p-5 ${eq.status === 'offline' ? 'border-red-200' : 'border-gray-100'}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-lg ${eq.status === 'online' ? 'bg-primary-50 text-primary-600' : 'bg-red-50 text-red-600'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">{eq.name}</h3>
                    <p className="text-xs text-gray-500 capitalize">{eq.type}</p>
                  </div>
                </div>
                <StatusBadge status={eq.status} />
              </div>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <p className="text-[10px] text-gray-500 uppercase">Last Reading</p>
                  <p className="text-sm font-medium">{eq.lastReading}</p>
                </div>
                <div className="p-2 bg-gray-50 rounded-lg">
                  <p className="text-[10px] text-gray-500 uppercase">{eq.accuracy ? 'Accuracy' : eq.readRate ? 'Read Rate' : 'Temp'}</p>
                  <p className="text-sm font-medium">{eq.accuracy || eq.readRate || eq.temp}</p>
                </div>
              </div>
              {eq.status === 'online' && (
                <div className="mt-3 flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs text-green-600">Streaming data</span>
                </div>
              )}
              {eq.status === 'offline' && (
                <div className="mt-3">
                  <button className="w-full px-3 py-1.5 bg-red-50 text-red-700 text-xs font-medium rounded-lg hover:bg-red-100">
                    Troubleshoot Connection
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Integration Architecture */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Data Integration Flow</h3>
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
          {['Scales', 'EID Readers', 'Micro-Ingredient', 'Load Cells', 'Weather Station'].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg font-medium text-blue-800">{item}</div>
              {i < 4 && <span className="text-gray-300">→</span>}
            </div>
          ))}
        </div>
        <div className="flex justify-center my-3">
          <div className="w-0.5 h-8 bg-gray-200" />
        </div>
        <div className="flex justify-center">
          <div className="px-6 py-3 bg-primary-50 border border-primary-200 rounded-lg font-semibold text-primary-800">
            CattleGrow Real-Time Data Engine
          </div>
        </div>
        <div className="flex justify-center my-3">
          <div className="w-0.5 h-8 bg-gray-200" />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
          {['Dashboard', 'Feeding System', 'Health Records', 'Inventory', 'Financial Reports'].map((item, i) => (
            <div key={i} className="px-4 py-2 bg-green-50 border border-green-200 rounded-lg font-medium text-green-800">{item}</div>
          ))}
        </div>
      </div>

      {/* Mobile Operations */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Mobile-First Field Operations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Feed Truck App', desc: 'Real-time delivery instructions, load/unload confirmations, route navigation', status: 'Active — 3 drivers connected' },
            { title: 'Pen Rider App', desc: 'Pull reporting, bunk scores, pen condition notes, photo capture', status: 'Active — 2 riders online' },
            { title: 'Processing App', desc: 'Chute-side data entry, EID scanning, treatment logging', status: 'Active — 1 session' },
          ].map((app, i) => (
            <div key={i} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <h4 className="font-semibold text-gray-900 text-sm">{app.title}</h4>
              </div>
              <p className="text-xs text-gray-500 mb-3">{app.desc}</p>
              <p className="text-[10px] text-green-600 font-medium">{app.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
