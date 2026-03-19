import { useState } from 'react'
import { Package, AlertTriangle, TrendingDown, ShoppingCart } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import KpiCard from '../components/KpiCard'
import StatusBadge from '../components/StatusBadge'
import { feedInventory, medications } from '../data/mockData'

const grainBank = [
  { client: 'Smith Ranch', commodity: 'Corn', delivered: 450, used: 380, balance: 70, unit: 'tons', value: '$14,000' },
  { client: 'Johnson Cattle Co', commodity: 'DDGs', delivered: 200, used: 165, balance: 35, unit: 'tons', value: '$5,950' },
  { client: 'Miller & Sons', commodity: 'Corn', delivered: 600, used: 520, balance: 80, unit: 'tons', value: '$16,000' },
  { client: 'Davis Livestock', commodity: 'Hay', delivered: 100, used: 45, balance: 55, unit: 'tons', value: '$8,250' },
]

const inventoryTrend = [
  { day: 'Mar 13', corn: 540, silage: 1340, ddgs: 230, hay: 115 },
  { day: 'Mar 14', corn: 525, silage: 1315, ddgs: 218, hay: 110 },
  { day: 'Mar 15', corn: 510, silage: 1290, ddgs: 205, hay: 106 },
  { day: 'Mar 16', corn: 508, silage: 1278, ddgs: 198, hay: 102 },
  { day: 'Mar 17', corn: 498, silage: 1265, ddgs: 190, hay: 99 },
  { day: 'Mar 18', corn: 490, silage: 1255, ddgs: 185, hay: 97 },
  { day: 'Mar 19', corn: 485, silage: 1250, ddgs: 180, hay: 95 },
]

export default function Inventory() {
  const [activeTab, setActiveTab] = useState('feed')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
        <p className="text-sm text-gray-500">Feed, medication inventory & grain bank tracking</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Total Feed On Hand" value="2,032" unit="tons" icon={Package} color="primary" />
        <KpiCard title="Critical Items" value="2" icon={AlertTriangle} color="red" change="Supplement, LA-200" />
        <KpiCard title="Daily Feed Usage" value="92" unit="tons/day" icon={TrendingDown} color="blue" />
        <KpiCard title="Pending Orders" value="3" icon={ShoppingCart} color="accent" change="$45,200 value" />
      </div>

      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
        {['feed', 'medications', 'grain-bank'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors ${activeTab === tab ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
            {tab.replace('-', ' ')}
          </button>
        ))}
      </div>

      {activeTab === 'feed' && (
        <>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Feed Inventory</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Item</th>
                    <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">On Hand</th>
                    <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Daily Usage</th>
                    <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Reorder Point</th>
                    <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Days Supply</th>
                    <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                    <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {feedInventory.map(item => (
                    <tr key={item.item} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-3 font-medium text-gray-900">{item.item}</td>
                      <td className="py-3 text-gray-700">{item.onHand} {item.unit}</td>
                      <td className="py-3 text-gray-700">{item.dailyUsage} {item.unit}</td>
                      <td className="py-3 text-gray-500">{item.reorderPoint} {item.unit}</td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-100 rounded-full h-2.5">
                            <div className={`h-full rounded-full ${item.status === 'critical' ? 'bg-red-500' : item.status === 'warning' ? 'bg-yellow-500' : 'bg-green-500'}`} style={{ width: `${Math.min(item.daysRemaining / 45 * 100, 100)}%` }} />
                          </div>
                          <span className={`text-xs font-medium ${item.status === 'critical' ? 'text-red-600' : 'text-gray-600'}`}>{item.daysRemaining}d</span>
                        </div>
                      </td>
                      <td className="py-3"><StatusBadge status={item.status} /></td>
                      <td className="py-3">
                        {(item.status === 'critical' || item.status === 'warning') && (
                          <button className="px-3 py-1 bg-primary-600 text-white text-xs rounded-lg hover:bg-primary-700">Order</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">7-Day Inventory Trend (tons)</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={inventoryTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Bar dataKey="corn" name="Corn" fill="#22c55e" stackId="a" />
                <Bar dataKey="ddgs" name="DDGs" fill="#f59e0b" stackId="a" />
                <Bar dataKey="hay" name="Hay" fill="#3b82f6" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

      {activeTab === 'medications' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Medication Inventory</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Medication</th>
                  <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">On Hand</th>
                  <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Avg Daily Use</th>
                  <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Days Supply</th>
                  <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Cost/Dose</th>
                  <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody>
                {medications.map(med => (
                  <tr key={med.name} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-3 font-medium text-gray-900">{med.name}</td>
                    <td className="py-3 text-gray-700">{med.onHand} {med.unit}</td>
                    <td className="py-3 text-gray-700">{med.avgDailyUse} {med.unit}</td>
                    <td className="py-3">
                      <span className={`font-medium ${med.daysRemaining < 7 ? 'text-red-600' : med.daysRemaining < 14 ? 'text-yellow-600' : 'text-gray-700'}`}>
                        {med.daysRemaining}d
                      </span>
                    </td>
                    <td className="py-3 text-gray-700">${med.cost}</td>
                    <td className="py-3"><StatusBadge status={med.status} /></td>
                    <td className="py-3">
                      {(med.status === 'critical' || med.status === 'warning') && (
                        <button className="px-3 py-1 bg-primary-600 text-white text-xs rounded-lg hover:bg-primary-700">Reorder</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'grain-bank' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Grain Bank Tracking</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Client</th>
                  <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Commodity</th>
                  <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Delivered</th>
                  <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Used</th>
                  <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Balance</th>
                  <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Value</th>
                </tr>
              </thead>
              <tbody>
                {grainBank.map((gb, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-3 font-medium text-gray-900">{gb.client}</td>
                    <td className="py-3 text-gray-700">{gb.commodity}</td>
                    <td className="py-3 text-gray-700">{gb.delivered} {gb.unit}</td>
                    <td className="py-3 text-gray-700">{gb.used} {gb.unit}</td>
                    <td className="py-3 font-semibold text-primary-700">{gb.balance} {gb.unit}</td>
                    <td className="py-3 text-gray-700">{gb.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
