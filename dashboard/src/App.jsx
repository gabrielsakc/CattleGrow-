import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import FeedlotOperations from './pages/FeedlotOperations'
import FeedingSystem from './pages/FeedingSystem'
import MixerLogistics from './pages/MixerLogistics'
import FeedingMonitoring from './pages/FeedingMonitoring'
import LivestockManagement from './pages/LivestockManagement'
import AnimalHealth from './pages/AnimalHealth'
import Inventory from './pages/Inventory'
import Financial from './pages/Financial'
import Hardware from './pages/Hardware'
import Users from './pages/Users'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="operations" element={<FeedlotOperations />} />
        <Route path="feeding" element={<FeedingSystem />} />
        <Route path="mixer" element={<MixerLogistics />} />
        <Route path="monitoring" element={<FeedingMonitoring />} />
        <Route path="livestock" element={<LivestockManagement />} />
        <Route path="health" element={<AnimalHealth />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="financial" element={<Financial />} />
        <Route path="hardware" element={<Hardware />} />
        <Route path="users" element={<Users />} />
      </Route>
    </Routes>
  )
}
