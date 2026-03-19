import { useState } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Fence, Wheat, Truck, MonitorDot, Beef,
  HeartPulse, Package, DollarSign, Cpu, UsersRound, Bell,
  Menu, X, ChevronDown, Search
} from 'lucide-react'
import { alerts } from '../data/mockData'

const navigation = [
  { name: 'Dashboard', to: '/', icon: LayoutDashboard },
  { name: 'Feedlot Operations', to: '/operations', icon: Fence },
  { name: 'Feeding System', to: '/feeding', icon: Wheat },
  { name: 'Mixer & Logistics', to: '/mixer', icon: Truck },
  { name: 'Feed Monitoring', to: '/monitoring', icon: MonitorDot },
  { name: 'Livestock', to: '/livestock', icon: Beef },
  { name: 'Animal Health', to: '/health', icon: HeartPulse },
  { name: 'Inventory', to: '/inventory', icon: Package },
  { name: 'Financial', to: '/financial', icon: DollarSign },
  { name: 'Hardware', to: '/hardware', icon: Cpu },
  { name: 'Users & Roles', to: '/users', icon: UsersRound },
]

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [alertsOpen, setAlertsOpen] = useState(false)
  const criticalAlerts = alerts.filter(a => a.type === 'critical').length

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:z-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center gap-3 h-16 px-5 border-b border-gray-200">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <Beef className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold text-gray-900 leading-tight">CattleGrow</h1>
            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Feedlot OS</p>
          </div>
          <button className="ml-auto lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-3 px-3">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              end={item.to === '/'}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors mb-0.5 ${
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <item.icon className="w-[18px] h-[18px] shrink-0" />
              {item.name}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-xs font-bold">GS</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Gabriel Sanchez</p>
              <p className="text-xs text-gray-400">Admin</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 shrink-0">
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search lots, pens, animals..." className="pl-9 pr-4 py-2 w-72 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-primary-50 rounded-lg">
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-primary-700">Live</span>
            </div>
            <div className="relative">
              <button onClick={() => setAlertsOpen(!alertsOpen)} className="relative p-2 rounded-lg hover:bg-gray-100">
                <Bell className="w-5 h-5 text-gray-600" />
                {criticalAlerts > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {criticalAlerts}
                  </span>
                )}
              </button>
              {alertsOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                  <div className="p-3 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-900">Alerts</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {alerts.map(alert => (
                      <div key={alert.id} className="px-3 py-2.5 border-b border-gray-50 hover:bg-gray-50">
                        <div className="flex items-start gap-2">
                          <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${alert.type === 'critical' ? 'bg-red-500' : alert.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'}`} />
                          <div>
                            <p className="text-xs text-gray-700">{alert.message}</p>
                            <p className="text-[10px] text-gray-400 mt-0.5">{alert.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
