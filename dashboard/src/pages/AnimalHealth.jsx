import { useState } from 'react'
import { Plus, Syringe, Thermometer, FileText, AlertTriangle } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import KpiCard from '../components/KpiCard'
import StatusBadge from '../components/StatusBadge'
import { healthRecords, medications } from '../data/mockData'

const diagnosisDistribution = [
  { name: 'BRD', value: 45, color: '#ef4444' },
  { name: 'Foot Rot', value: 18, color: '#f59e0b' },
  { name: 'Pinkeye', value: 12, color: '#3b82f6' },
  { name: 'Lame', value: 15, color: '#8b5cf6' },
  { name: 'Other', value: 10, color: '#6b7280' },
]

const treatmentsByWeek = [
  { week: 'W1', pulls: 8, treatments: 12, retreats: 2 },
  { week: 'W2', pulls: 6, treatments: 9, retreats: 1 },
  { week: 'W3', pulls: 10, treatments: 14, retreats: 3 },
  { week: 'W4', pulls: 7, treatments: 11, retreats: 2 },
]

const chuteProtocol = [
  { step: 1, action: 'EID Scan', description: 'Scan animal EID tag for identification', time: '3 sec' },
  { step: 2, action: 'Weight', description: 'Automated scale reading', time: '5 sec' },
  { step: 3, action: 'Temperature', description: 'Rectal temperature check', time: '8 sec' },
  { step: 4, action: 'Visual Exam', description: 'Assess body condition, respiratory signs', time: '15 sec' },
  { step: 5, action: 'Treatment', description: 'Administer medication per protocol', time: '20 sec' },
  { step: 6, action: 'Record', description: 'Auto-save all data to health record', time: '2 sec' },
]

export default function AnimalHealth() {
  const [activeTab, setActiveTab] = useState('records')

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Animal Health</h1>
          <p className="text-sm text-gray-500">Treatment protocols, chute processing & health records</p>
        </div>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Treatment
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Active Treatments" value="14" icon={Syringe} color="red" change="6 monitoring, 2 hospital" />
        <KpiCard title="Mortality Rate" value="0.8%" icon={AlertTriangle} color="accent" change="-0.2% vs last month" changeType="positive" />
        <KpiCard title="Pulls This Week" value="7" icon={Thermometer} color="blue" change="vs 10 last week" changeType="positive" />
        <KpiCard title="Treatment Success" value="92%" icon={FileText} color="emerald" change="+3% improvement" changeType="positive" />
      </div>

      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
        {['records', 'protocols', 'chute', 'analytics'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors ${activeTab === tab ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'records' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Recent Health Records</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Record</th>
                  <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Animal</th>
                  <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Lot</th>
                  <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
                  <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Diagnosis</th>
                  <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Treatment</th>
                  <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Temp (°F)</th>
                  <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Treated By</th>
                  <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {healthRecords.map(r => (
                  <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-2.5 font-medium text-gray-900">{r.id}</td>
                    <td className="py-2.5 text-primary-700 font-medium">{r.animalId}</td>
                    <td className="py-2.5 text-gray-700">{r.lotId}</td>
                    <td className="py-2.5 text-gray-500">{r.date}</td>
                    <td className="py-2.5"><span className="px-2 py-0.5 bg-red-50 text-red-700 rounded text-xs font-medium">{r.diagnosis}</span></td>
                    <td className="py-2.5 text-gray-700">{r.treatment}</td>
                    <td className="py-2.5">
                      <span className={`font-medium ${r.temp >= 104 ? 'text-red-600' : r.temp >= 103 ? 'text-yellow-600' : 'text-gray-700'}`}>{r.temp}°</span>
                    </td>
                    <td className="py-2.5 text-gray-700">{r.treatedBy}</td>
                    <td className="py-2.5"><StatusBadge status={r.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'protocols' && (
        <div className="space-y-4">
          {[
            { name: 'BRD — First Pull', drug: 'Draxxin 6ml SQ', withdrawal: '18 days', notes: 'Temperature ≥104°F required for treatment' },
            { name: 'BRD — Second Pull', drug: 'Nuflor 12ml SQ', withdrawal: '28 days', notes: 'If no improvement in 48hrs from first treatment' },
            { name: 'BRD — Third Pull', drug: 'Excede 6ml SQ', withdrawal: '13 days', notes: 'Move to hospital pen. Notify veterinarian.' },
            { name: 'Foot Rot', drug: 'LA-200 30ml IM', withdrawal: '28 days', notes: 'Clean and wrap affected hoof' },
            { name: 'Pinkeye', drug: 'LA-200 20ml IM + Eye Patch', withdrawal: '28 days', notes: 'Apply patch. Re-evaluate in 5 days.' },
            { name: 'Arrival Processing', drug: 'Vision 8 + Bovi-Shield + Pour-on', withdrawal: 'N/A', notes: 'All incoming cattle within 24hrs of arrival' },
          ].map((p, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">{p.name}</h4>
                  <p className="text-sm text-gray-500 mt-1">{p.notes}</p>
                </div>
                <span className="px-2.5 py-1 bg-amber-50 text-amber-700 rounded-lg text-xs font-medium">WD: {p.withdrawal}</span>
              </div>
              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 uppercase font-medium mb-1">Drug Protocol</p>
                <p className="text-sm font-medium text-gray-900">{p.drug}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'chute' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Chute Processing Workflow</h3>
          <div className="space-y-3">
            {chuteProtocol.map((step, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                  {step.step}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-sm">{step.action}</h4>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
                <span className="text-xs text-gray-500 bg-white px-2.5 py-1 rounded border">{step.time}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-lg">
            <p className="text-xs text-blue-700">
              <strong>Integration:</strong> EID readers and scales automatically capture data at steps 1–2. All records are saved in real-time to the animal's digital health file.
            </p>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Diagnosis Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={diagnosisDistribution} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {diagnosisDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Weekly Treatment Activity</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={treatmentsByWeek}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Bar dataKey="pulls" name="Pulls" fill="#ef4444" radius={[4, 4, 0, 0]} />
                <Bar dataKey="treatments" name="Treatments" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="retreats" name="Re-treats" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  )
}
