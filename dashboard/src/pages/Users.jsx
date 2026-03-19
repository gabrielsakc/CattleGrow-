import { Plus, Shield, Eye, Edit3, Mail } from 'lucide-react'
import StatusBadge from '../components/StatusBadge'
import { users } from '../data/mockData'

const rolePermissions = {
  admin: ['Full system access', 'User management', 'Financial reports', 'System configuration', 'Data export'],
  operator: ['Feeding operations', 'Bunk scoring', 'Pen movements', 'Health pulls', 'Inventory checks'],
  veterinarian: ['Health records', 'Treatment protocols', 'Medication management', 'Mortality reports', 'Processing workflows'],
  nutritionist: ['Ration management', 'Feed analysis', 'Performance projections', 'Diet assignments', 'Bunk score review'],
}

const externalAccess = [
  { name: 'Dr. Sarah Chen', org: 'NutriMax Consulting', role: 'nutritionist', access: 'Rations, Feed Analysis, Projections', lastLogin: '2026-03-18', status: 'active' },
  { name: 'Tom Baker', org: 'Midwest Vet Services', role: 'veterinarian', access: 'Health Records (Read-only)', lastLogin: '2026-03-15', status: 'active' },
  { name: 'Lisa Park', org: 'AgriFinance Corp', role: 'viewer', access: 'Financial Reports, Billing', lastLogin: '2026-03-10', status: 'active' },
]

const activityLog = [
  { time: '08:30', user: 'Gabriel Sanchez', action: 'Approved ration change for LOT-2404', module: 'Feeding' },
  { time: '07:58', user: 'Dr. Martinez', action: 'Created treatment record H-006', module: 'Health' },
  { time: '07:45', user: 'Carlos Mendez', action: 'Submitted bunk scores for AM round', module: 'Monitoring' },
  { time: '07:30', user: 'Gabriel Sanchez', action: 'Generated billing report for Williams Feeders', module: 'Financial' },
  { time: '06:00', user: 'Miguel Rodriguez', action: 'Started AM feeding route', module: 'Feeding' },
  { time: '05:45', user: 'Carlos Mendez', action: 'Completed mixer calibration check', module: 'Hardware' },
]

export default function Users() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users & Collaboration</h1>
          <p className="text-sm text-gray-500">Role-based access, external stakeholders & activity log</p>
        </div>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 flex items-center gap-2">
          <Plus className="w-4 h-4" /> Invite User
        </button>
      </div>

      {/* Team Members */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Team Members</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map(user => (
            <div key={user.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                  {user.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 text-sm">{user.name}</h4>
                  <p className="text-xs text-gray-500">{user.email}</p>
                  <div className="mt-1.5">
                    <StatusBadge status={user.role} />
                  </div>
                </div>
                <button className="p-1 rounded hover:bg-gray-100">
                  <Edit3 className="w-3.5 h-3.5 text-gray-400" />
                </button>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[10px] text-gray-500">Last active: {user.lastActive}</span>
                <div className="w-2 h-2 bg-green-500 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Role Permissions Matrix */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-4 h-4 text-gray-700" />
          <h3 className="text-sm font-semibold text-gray-900">Role-Based Access Control</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(rolePermissions).map(([role, perms]) => (
            <div key={role} className="border border-gray-200 rounded-lg p-4">
              <div className="mb-3">
                <StatusBadge status={role} />
              </div>
              <ul className="space-y-1.5">
                {perms.map((perm, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-gray-600">
                    <div className="w-1.5 h-1.5 bg-primary-400 rounded-full shrink-0" />
                    {perm}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* External Stakeholders */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-900">External Stakeholder Access</h3>
          <button className="text-xs text-primary-600 font-medium hover:underline flex items-center gap-1">
            <Mail className="w-3 h-3" /> Invite External
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Name</th>
                <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Organization</th>
                <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Role</th>
                <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Access Scope</th>
                <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Last Login</th>
                <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {externalAccess.map((ext, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-2.5 font-medium text-gray-900">{ext.name}</td>
                  <td className="py-2.5 text-gray-700">{ext.org}</td>
                  <td className="py-2.5"><StatusBadge status={ext.role} /></td>
                  <td className="py-2.5 text-gray-500 text-xs">{ext.access}</td>
                  <td className="py-2.5 text-gray-500 text-xs">{ext.lastLogin}</td>
                  <td className="py-2.5"><StatusBadge status={ext.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Activity Log */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Today's Activity Log</h3>
        <div className="space-y-3">
          {activityLog.map((log, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-xs text-gray-500 w-14 shrink-0 pt-0.5">{log.time}</span>
              <div className="flex-1">
                <p className="text-sm text-gray-700">
                  <span className="font-medium text-gray-900">{log.user}</span> {log.action}
                </p>
              </div>
              <span className="px-2 py-0.5 bg-white border border-gray-200 rounded text-[10px] text-gray-500">{log.module}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
