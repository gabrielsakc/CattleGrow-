import { DollarSign, TrendingUp, CreditCard, FileText, Download } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import KpiCard from '../components/KpiCard'
import StatusBadge from '../components/StatusBadge'
import { financials, clientBilling } from '../data/mockData'

const expenseBreakdown = [
  { name: 'Feed', value: 1245000, color: '#22c55e' },
  { name: 'Operations', value: 285000, color: '#3b82f6' },
  { name: 'Health', value: 142000, color: '#ef4444' },
  { name: 'Labor', value: 218000, color: '#f59e0b' },
]

const monthlyPL = [
  { month: 'Oct', revenue: 2180, expenses: 1720, profit: 460 },
  { month: 'Nov', revenue: 2290, expenses: 1780, profit: 510 },
  { month: 'Dec', revenue: 2350, expenses: 1840, profit: 510 },
  { month: 'Jan', revenue: 2380, expenses: 1860, profit: 520 },
  { month: 'Feb', revenue: 2420, expenses: 1870, profit: 550 },
  { month: 'Mar', revenue: 2450, expenses: 1890, profit: 560 },
]

const interestCalc = [
  { client: 'Williams Feeders', principal: 215200, rate: '8%', days: 12, interest: '$566', total: '$215,766' },
  { client: 'Miller & Sons', principal: 196500, rate: '8%', days: 15, interest: '$645', total: '$197,145' },
]

export default function Financial() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financial Management</h1>
          <p className="text-sm text-gray-500">Cost tracking, billing, accounts receivable & interest calculations</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white text-gray-700 px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 hover:bg-gray-50 flex items-center gap-2">
            <Download className="w-4 h-4" /> Export
          </button>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 flex items-center gap-2">
            <FileText className="w-4 h-4" /> Generate Invoice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Monthly Revenue" value={`$${(financials.monthlyRevenue / 1000000).toFixed(2)}M`} icon={TrendingUp} color="primary" change="+2.5% vs last month" changeType="positive" />
        <KpiCard title="Monthly Expenses" value={`$${(financials.monthlyExpenses / 1000000).toFixed(2)}M`} icon={DollarSign} color="red" change="+1.1% vs last month" />
        <KpiCard title="Net Profit" value={`$${((financials.monthlyRevenue - financials.monthlyExpenses) / 1000).toFixed(0)}K`} icon={TrendingUp} color="emerald" change="22.9% margin" changeType="positive" />
        <KpiCard title="Accounts Receivable" value={`$${(financials.accountsReceivable / 1000).toFixed(0)}K`} icon={CreditCard} color="accent" change="1 overdue" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* P&L Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Monthly P&L ($K)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyPL}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(value) => `$${value}K`} />
              <Legend />
              <Bar dataKey="revenue" name="Revenue" fill="#22c55e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" name="Expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
              <Bar dataKey="profit" name="Net Profit" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Expense Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Expense Breakdown</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={expenseBreakdown} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={3}>
                {expenseBreakdown.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {expenseBreakdown.map(item => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-gray-600">{item.name}</span>
                </div>
                <span className="font-medium text-gray-900">${(item.value / 1000).toFixed(0)}K</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Client Billing */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Client Billing Summary</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Client</th>
                <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Lot</th>
                <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Head</th>
                <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">DOF</th>
                <th className="pb-2 text-right text-xs font-semibold text-gray-500 uppercase">Feed Cost</th>
                <th className="pb-2 text-right text-xs font-semibold text-gray-500 uppercase">Yardage</th>
                <th className="pb-2 text-right text-xs font-semibold text-gray-500 uppercase">Health</th>
                <th className="pb-2 text-right text-xs font-semibold text-gray-500 uppercase">Total Due</th>
                <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {clientBilling.map(bill => (
                <tr key={bill.lotId} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-3 font-medium text-gray-900">{bill.client}</td>
                  <td className="py-3 text-primary-700 font-medium">{bill.lotId}</td>
                  <td className="py-3 text-gray-700">{bill.headCount}</td>
                  <td className="py-3 text-gray-700">{bill.daysOnFeed}d</td>
                  <td className="py-3 text-right text-gray-700">${bill.feedCost.toLocaleString()}</td>
                  <td className="py-3 text-right text-gray-700">${bill.yardage.toLocaleString()}</td>
                  <td className="py-3 text-right text-gray-700">${bill.healthCost.toLocaleString()}</td>
                  <td className="py-3 text-right font-semibold text-gray-900">${bill.totalDue.toLocaleString()}</td>
                  <td className="py-3"><StatusBadge status={bill.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interest & Service Fees */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Interest & Service Fee Calculations</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="pb-2 text-left text-xs font-semibold text-gray-500 uppercase">Client</th>
                <th className="pb-2 text-right text-xs font-semibold text-gray-500 uppercase">Principal</th>
                <th className="pb-2 text-right text-xs font-semibold text-gray-500 uppercase">Rate</th>
                <th className="pb-2 text-right text-xs font-semibold text-gray-500 uppercase">Days Overdue</th>
                <th className="pb-2 text-right text-xs font-semibold text-gray-500 uppercase">Interest</th>
                <th className="pb-2 text-right text-xs font-semibold text-gray-500 uppercase">Total Due</th>
              </tr>
            </thead>
            <tbody>
              {interestCalc.map(item => (
                <tr key={item.client} className="border-b border-gray-50">
                  <td className="py-3 font-medium text-gray-900">{item.client}</td>
                  <td className="py-3 text-right text-gray-700">${item.principal.toLocaleString()}</td>
                  <td className="py-3 text-right text-gray-700">{item.rate}</td>
                  <td className="py-3 text-right text-red-600 font-medium">{item.days}</td>
                  <td className="py-3 text-right text-amber-600 font-medium">{item.interest}</td>
                  <td className="py-3 text-right font-bold text-gray-900">{item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
