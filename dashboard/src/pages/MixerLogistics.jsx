import { Truck, RefreshCw, Route, Settings } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import StatusBadge from '../components/StatusBadge'
import KpiCard from '../components/KpiCard'
import { mixers, trucks, feedingSchedule } from '../data/mockData'

const cycleData = [
  { cycle: 'AM-1', loads: 3, tons: 34.7, time: '52 min' },
  { cycle: 'AM-2', loads: 2, tons: 24.9, time: '38 min' },
  { cycle: 'AM-3', loads: 2, tons: 25.7, time: '35 min' },
  { cycle: 'PM-1', loads: 2, tons: 22.1, time: '30 min' },
  { cycle: 'PM-2', loads: 1, tons: 9.8, time: '18 min' },
]

const routeOptimization = [
  { route: 'Route A', truck: 'Truck 1', pens: ['P-03', 'P-12', 'P-30', 'P-28'], distance: '2.4 mi', time: '35 min', efficiency: '94%' },
  { route: 'Route B', truck: 'Truck 2', pens: ['P-15', 'P-16', 'P-17', 'P-22', 'P-23'], distance: '1.8 mi', time: '28 min', efficiency: '97%' },
  { route: 'Route C', truck: 'Truck 3', pens: ['P-05', 'P-08', 'P-18', 'P-19'], distance: '2.1 mi', time: '32 min', efficiency: '91%' },
]

const tripsChart = [
  { name: 'Mixer A', am: 5, pm: 3 },
  { name: 'Mixer B', am: 4, pm: 2 },
]

export default function MixerLogistics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mixer & Feeding Logistics</h1>
        <p className="text-sm text-gray-500">Mixer capacity, load distribution & route optimization</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Total Loads Today" value="14" icon={RefreshCw} color="primary" change="6 completed" />
        <KpiCard title="Total Tons Today" value="117.2" unit="tons" icon={Truck} color="blue" />
        <KpiCard title="Avg Mix Time" value="11" unit="min" icon={Settings} color="accent" change="Within target" changeType="positive" />
        <KpiCard title="Route Efficiency" value="94%" icon={Route} color="emerald" change="+2% vs yesterday" changeType="positive" />
      </div>

      {/* Mixer Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mixers.map(mixer => (
          <div key={mixer.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{mixer.id}</h3>
                <p className="text-xs text-gray-500">{mixer.capacity} ton capacity • {mixer.mixTime} min mix time</p>
              </div>
              <StatusBadge status={mixer.status} />
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">{mixer.totalLoadsToday}</p>
                <p className="text-[10px] text-gray-500 uppercase">Loads Today</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">{mixer.capacity}</p>
                <p className="text-[10px] text-gray-500 uppercase">Capacity (T)</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">{mixer.currentLoad}</p>
                <p className="text-[10px] text-gray-500 uppercase">Current Load</p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-full h-3 overflow-hidden">
              <div className="bg-primary-500 h-full rounded-full transition-all" style={{ width: `${(mixer.currentLoad / mixer.capacity) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* Trucks */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Feed Trucks Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {trucks.map(truck => (
            <div key={truck.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900">{truck.id}</h4>
                  <p className="text-xs text-gray-500">Driver: {truck.driver}</p>
                </div>
                <StatusBadge status={truck.status} />
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-xs text-gray-500">Capacity</p>
                  <p className="font-medium">{truck.capacity} tons</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Route</p>
                  <p className="font-medium">{truck.currentRoute || '—'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Completed</p>
                  <p className="font-medium">{truck.deliveriesCompleted}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Remaining</p>
                  <p className="font-medium">{truck.deliveriesRemaining}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cycle Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Feeding Cycles</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={tripsChart}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Bar dataKey="am" name="AM Loads" fill="#22c55e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="pm" name="PM Loads" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Route Optimization */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Optimized Routes</h3>
          <div className="space-y-3">
            {routeOptimization.map(route => (
              <div key={route.route} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-sm text-gray-900">{route.route}</span>
                  <span className="text-xs font-medium text-primary-700 bg-primary-50 px-2 py-0.5 rounded">{route.efficiency} efficient</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>{route.truck}</span>
                  <span>{route.pens.join(' → ')}</span>
                </div>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-600">
                  <span>{route.distance}</span>
                  <span>•</span>
                  <span>{route.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
