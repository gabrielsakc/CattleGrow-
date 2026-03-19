const styles = {
  feeding: 'bg-green-100 text-green-800',
  'step-up': 'bg-blue-100 text-blue-800',
  closeout: 'bg-amber-100 text-amber-800',
  receiving: 'bg-purple-100 text-purple-800',
  completed: 'bg-green-100 text-green-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  pending: 'bg-gray-100 text-gray-600',
  active: 'bg-green-100 text-green-800',
  critical: 'bg-red-100 text-red-800',
  warning: 'bg-yellow-100 text-yellow-800',
  adequate: 'bg-green-100 text-green-800',
  treated: 'bg-green-100 text-green-800',
  monitoring: 'bg-yellow-100 text-yellow-800',
  hospital: 'bg-red-100 text-red-800',
  online: 'bg-green-100 text-green-800',
  offline: 'bg-red-100 text-red-800',
  idle: 'bg-gray-100 text-gray-600',
  delivering: 'bg-blue-100 text-blue-800',
  loading: 'bg-amber-100 text-amber-800',
  current: 'bg-green-100 text-green-800',
  due: 'bg-yellow-100 text-yellow-800',
  overdue: 'bg-red-100 text-red-800',
  admin: 'bg-purple-100 text-purple-800',
  operator: 'bg-blue-100 text-blue-800',
  veterinarian: 'bg-green-100 text-green-800',
  nutritionist: 'bg-amber-100 text-amber-800',
}

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${styles[status] || 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  )
}
