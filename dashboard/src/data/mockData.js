// ============================================================
// CattleGrow Feedlot Operating System - Mock Data
// ============================================================

export const kpis = {
  totalHead: 12450,
  totalLots: 48,
  avgDailyGain: 3.42,
  feedConversion: 5.8,
  mortalityRate: 0.8,
  occupancyRate: 87,
  totalPens: 120,
  activePens: 104,
  feedCostPerHead: 4.82,
  avgDaysOnFeed: 142,
  projectedCloseouts: 6,
  pendingTreatments: 14,
};

export const lots = [
  { id: 'LOT-2401', headCount: 285, penId: 'P-12', daysOnFeed: 98, avgWeight: 1120, targetWeight: 1350, status: 'feeding', owner: 'Smith Ranch', entryDate: '2025-12-12', ration: 'Finisher A', adg: 3.65, costOfGain: 0.92 },
  { id: 'LOT-2402', headCount: 310, penId: 'P-15', daysOnFeed: 72, avgWeight: 985, targetWeight: 1350, status: 'feeding', owner: 'Johnson Cattle Co', entryDate: '2026-01-07', ration: 'Step-Up 3', adg: 3.38, costOfGain: 0.88 },
  { id: 'LOT-2403', headCount: 250, penId: 'P-08', daysOnFeed: 145, avgWeight: 1310, targetWeight: 1350, status: 'closeout', owner: 'Williams Feeders', entryDate: '2025-10-25', ration: 'Finisher B', adg: 3.52, costOfGain: 0.95 },
  { id: 'LOT-2404', headCount: 275, penId: 'P-22', daysOnFeed: 35, avgWeight: 820, targetWeight: 1350, status: 'step-up', owner: 'Davis Livestock', entryDate: '2026-02-12', ration: 'Step-Up 1', adg: 3.15, costOfGain: 0.82 },
  { id: 'LOT-2405', headCount: 300, penId: 'P-03', daysOnFeed: 120, avgWeight: 1225, targetWeight: 1375, status: 'feeding', owner: 'Miller & Sons', entryDate: '2025-11-19', ration: 'Finisher A', adg: 3.71, costOfGain: 0.90 },
  { id: 'LOT-2406', headCount: 260, penId: 'P-18', daysOnFeed: 15, avgWeight: 745, targetWeight: 1350, status: 'receiving', owner: 'Brown Ranch', entryDate: '2026-03-04', ration: 'Starter', adg: 2.85, costOfGain: 0.78 },
  { id: 'LOT-2407', headCount: 295, penId: 'P-30', daysOnFeed: 88, avgWeight: 1085, targetWeight: 1350, status: 'feeding', owner: 'Garcia Cattle', entryDate: '2025-12-21', ration: 'Finisher A', adg: 3.48, costOfGain: 0.91 },
  { id: 'LOT-2408', headCount: 240, penId: 'P-05', daysOnFeed: 155, avgWeight: 1340, targetWeight: 1350, status: 'closeout', owner: 'Anderson Feed Yard', entryDate: '2025-10-15', ration: 'Finisher B', adg: 3.55, costOfGain: 0.97 },
];

export const pens = Array.from({ length: 40 }, (_, i) => ({
  id: `P-${String(i + 1).padStart(2, '0')}`,
  capacity: 300 + Math.floor(Math.random() * 100),
  currentHead: i < 30 ? 240 + Math.floor(Math.random() * 60) : 0,
  lotId: i < 30 ? `LOT-${2400 + (i % 8) + 1}` : null,
  waterSystem: 'operational',
  bunkLength: 80 + Math.floor(Math.random() * 40),
  lastCleaned: '2026-03-15',
}));

export const rations = [
  { id: 'R-001', name: 'Starter', dryMatter: 88, crudeProtein: 14.5, nel: 0.72, ingredients: ['Corn Silage 40%', 'Cracked Corn 25%', 'DDGs 15%', 'Hay 12%', 'Supplement 8%'], costPerTon: 185, status: 'active' },
  { id: 'R-002', name: 'Step-Up 1', dryMatter: 86, crudeProtein: 13.8, nel: 0.78, ingredients: ['Corn Silage 35%', 'Cracked Corn 30%', 'DDGs 15%', 'Hay 10%', 'Supplement 10%'], costPerTon: 198, status: 'active' },
  { id: 'R-003', name: 'Step-Up 2', dryMatter: 84, crudeProtein: 13.2, nel: 0.82, ingredients: ['Corn Silage 28%', 'Steam Flaked Corn 35%', 'DDGs 18%', 'Hay 8%', 'Supplement 11%'], costPerTon: 212, status: 'active' },
  { id: 'R-004', name: 'Step-Up 3', dryMatter: 82, crudeProtein: 13.0, nel: 0.86, ingredients: ['Corn Silage 22%', 'Steam Flaked Corn 42%', 'DDGs 18%', 'Hay 6%', 'Supplement 12%'], costPerTon: 225, status: 'active' },
  { id: 'R-005', name: 'Finisher A', dryMatter: 80, crudeProtein: 12.5, nel: 0.92, ingredients: ['Steam Flaked Corn 55%', 'DDGs 20%', 'Corn Silage 10%', 'Hay 3%', 'Supplement 12%'], costPerTon: 242, status: 'active' },
  { id: 'R-006', name: 'Finisher B', dryMatter: 79, crudeProtein: 12.8, nel: 0.94, ingredients: ['Steam Flaked Corn 58%', 'DDGs 18%', 'Corn Silage 8%', 'Hay 3%', 'Supplement 13%'], costPerTon: 248, status: 'active' },
];

export const feedingSchedule = [
  { time: '05:30', truck: 'Truck 1', mixer: 'Mixer A', ration: 'Finisher A', pens: ['P-03', 'P-12', 'P-30'], totalTons: 18.5, status: 'completed' },
  { time: '06:00', truck: 'Truck 2', mixer: 'Mixer B', ration: 'Step-Up 3', pens: ['P-15', 'P-16', 'P-17'], totalTons: 16.2, status: 'completed' },
  { time: '06:30', truck: 'Truck 1', mixer: 'Mixer A', ration: 'Starter', pens: ['P-18', 'P-19'], totalTons: 8.4, status: 'completed' },
  { time: '07:00', truck: 'Truck 3', mixer: 'Mixer A', ration: 'Finisher B', pens: ['P-05', 'P-08'], totalTons: 14.8, status: 'in-progress' },
  { time: '07:30', truck: 'Truck 2', mixer: 'Mixer B', ration: 'Step-Up 1', pens: ['P-22', 'P-23'], totalTons: 10.1, status: 'pending' },
  { time: '08:00', truck: 'Truck 1', mixer: 'Mixer A', ration: 'Step-Up 2', pens: ['P-25', 'P-26', 'P-27'], totalTons: 15.6, status: 'pending' },
  { time: '14:00', truck: 'Truck 1', mixer: 'Mixer A', ration: 'Finisher A', pens: ['P-03', 'P-12', 'P-30'], totalTons: 12.3, status: 'pending' },
  { time: '14:30', truck: 'Truck 2', mixer: 'Mixer B', ration: 'Finisher B', pens: ['P-05', 'P-08'], totalTons: 9.8, status: 'pending' },
];

export const mixers = [
  { id: 'Mixer A', capacity: 12, currentLoad: 0, status: 'idle', totalLoadsToday: 8, mixTime: 12 },
  { id: 'Mixer B', capacity: 10, currentLoad: 0, status: 'idle', totalLoadsToday: 6, mixTime: 10 },
];

export const trucks = [
  { id: 'Truck 1', capacity: 22, driver: 'Carlos M.', status: 'delivering', currentRoute: 'Route A', deliveriesCompleted: 3, deliveriesRemaining: 4 },
  { id: 'Truck 2', capacity: 18, driver: 'Miguel R.', status: 'loading', currentRoute: 'Route B', deliveriesCompleted: 2, deliveriesRemaining: 3 },
  { id: 'Truck 3', capacity: 20, driver: 'Jose L.', status: 'idle', currentRoute: null, deliveriesCompleted: 0, deliveriesRemaining: 2 },
];

export const bunkScores = [
  { penId: 'P-03', time: '06:45', score: 0, note: 'Clean bunk' },
  { penId: 'P-05', time: '06:50', score: 0.5, note: 'Trace feed remaining' },
  { penId: 'P-08', time: '06:55', score: 1, note: 'Some feed scattered' },
  { penId: 'P-12', time: '07:00', score: 0, note: 'Clean bunk' },
  { penId: 'P-15', time: '07:05', score: 2, note: '25% feed remaining' },
  { penId: 'P-18', time: '07:10', score: 0.5, note: 'Trace feed remaining' },
  { penId: 'P-22', time: '07:15', score: 1, note: 'Slight leftover' },
  { penId: 'P-30', time: '07:20', score: 0, note: 'Clean bunk' },
];

export const feedInventory = [
  { item: 'Steam Flaked Corn', onHand: 485, unit: 'tons', dailyUsage: 32, daysRemaining: 15, reorderPoint: 200, status: 'adequate' },
  { item: 'Corn Silage', onHand: 1250, unit: 'tons', dailyUsage: 28, daysRemaining: 45, reorderPoint: 400, status: 'adequate' },
  { item: 'DDGs', onHand: 180, unit: 'tons', dailyUsage: 18, daysRemaining: 10, reorderPoint: 150, status: 'warning' },
  { item: 'Hay', onHand: 95, unit: 'tons', dailyUsage: 6, daysRemaining: 16, reorderPoint: 50, status: 'adequate' },
  { item: 'Supplement Premix', onHand: 22, unit: 'tons', dailyUsage: 8, daysRemaining: 3, reorderPoint: 20, status: 'critical' },
  { item: 'Rumensin', onHand: 45, unit: 'kg', dailyUsage: 2.5, daysRemaining: 18, reorderPoint: 20, status: 'adequate' },
  { item: 'Tylan', onHand: 12, unit: 'kg', dailyUsage: 1.2, daysRemaining: 10, reorderPoint: 10, status: 'warning' },
];

export const healthRecords = [
  { id: 'H-001', animalId: 'EID-44521', lotId: 'LOT-2401', date: '2026-03-18', diagnosis: 'BRD', treatment: 'Draxxin 6ml', treatedBy: 'Dr. Martinez', temp: 104.2, status: 'monitoring' },
  { id: 'H-002', animalId: 'EID-44389', lotId: 'LOT-2402', date: '2026-03-18', diagnosis: 'Foot Rot', treatment: 'LA-200 30ml', treatedBy: 'Dr. Martinez', temp: 103.5, status: 'treated' },
  { id: 'H-003', animalId: 'EID-44612', lotId: 'LOT-2404', date: '2026-03-17', diagnosis: 'BRD', treatment: 'Excede 6ml', treatedBy: 'Dr. Kim', temp: 105.1, status: 'hospital' },
  { id: 'H-004', animalId: 'EID-44298', lotId: 'LOT-2406', date: '2026-03-17', diagnosis: 'Pinkeye', treatment: 'LA-200 20ml + Patch', treatedBy: 'Dr. Martinez', temp: 102.8, status: 'treated' },
  { id: 'H-005', animalId: 'EID-44755', lotId: 'LOT-2401', date: '2026-03-16', diagnosis: 'BRD - 2nd Pull', treatment: 'Nuflor 12ml', treatedBy: 'Dr. Kim', temp: 104.8, status: 'hospital' },
  { id: 'H-006', animalId: 'EID-44830', lotId: 'LOT-2407', date: '2026-03-19', diagnosis: 'Lame', treatment: 'Excede 6ml', treatedBy: 'Dr. Martinez', temp: 103.0, status: 'monitoring' },
];

export const medications = [
  { name: 'Draxxin', onHand: 480, unit: 'ml', avgDailyUse: 24, daysRemaining: 20, cost: 12.50, status: 'adequate' },
  { name: 'Excede', onHand: 200, unit: 'ml', avgDailyUse: 12, daysRemaining: 17, cost: 8.75, status: 'adequate' },
  { name: 'Nuflor', onHand: 350, unit: 'ml', avgDailyUse: 18, daysRemaining: 19, cost: 6.20, status: 'adequate' },
  { name: 'LA-200', onHand: 120, unit: 'ml', avgDailyUse: 30, daysRemaining: 4, cost: 3.80, status: 'critical' },
  { name: 'Banamine', onHand: 250, unit: 'ml', avgDailyUse: 15, daysRemaining: 17, cost: 4.50, status: 'adequate' },
  { name: 'Vision 8', onHand: 85, unit: 'doses', avgDailyUse: 8, daysRemaining: 11, cost: 2.10, status: 'warning' },
];

export const financials = {
  monthlyRevenue: 2450000,
  monthlyExpenses: 1890000,
  feedCost: 1245000,
  operationsCost: 285000,
  healthCost: 142000,
  laborCost: 218000,
  accountsReceivable: 385000,
  accountsPayable: 210000,
};

export const clientBilling = [
  { client: 'Smith Ranch', lotId: 'LOT-2401', headCount: 285, daysOnFeed: 98, feedCost: 134520, yardage: 27930, healthCost: 4275, totalDue: 166725, status: 'current' },
  { client: 'Johnson Cattle Co', lotId: 'LOT-2402', headCount: 310, daysOnFeed: 72, feedCost: 98456, yardage: 22320, healthCost: 6200, totalDue: 126976, status: 'current' },
  { client: 'Williams Feeders', lotId: 'LOT-2403', headCount: 250, daysOnFeed: 145, feedCost: 175200, yardage: 36250, healthCost: 3750, totalDue: 215200, status: 'due' },
  { client: 'Davis Livestock', lotId: 'LOT-2404', headCount: 275, daysOnFeed: 35, feedCost: 38500, yardage: 9625, healthCost: 2750, totalDue: 50875, status: 'current' },
  { client: 'Miller & Sons', lotId: 'LOT-2405', headCount: 300, daysOnFeed: 120, feedCost: 156000, yardage: 36000, healthCost: 4500, totalDue: 196500, status: 'overdue' },
  { client: 'Brown Ranch', lotId: 'LOT-2406', headCount: 260, daysOnFeed: 15, feedCost: 15600, yardage: 3900, healthCost: 1560, totalDue: 21060, status: 'current' },
];

export const performanceChart = [
  { month: 'Oct', adg: 3.28, feedCost: 4.52, mortality: 0.9, headCount: 11200 },
  { month: 'Nov', adg: 3.35, feedCost: 4.61, mortality: 0.7, headCount: 11800 },
  { month: 'Dec', adg: 3.41, feedCost: 4.75, mortality: 0.8, headCount: 12100 },
  { month: 'Jan', adg: 3.38, feedCost: 4.88, mortality: 1.1, headCount: 12350 },
  { month: 'Feb', adg: 3.45, feedCost: 4.80, mortality: 0.6, headCount: 12200 },
  { month: 'Mar', adg: 3.42, feedCost: 4.82, mortality: 0.8, headCount: 12450 },
];

export const feedConsumptionChart = [
  { day: 'Mon', planned: 156, actual: 152 },
  { day: 'Tue', planned: 158, actual: 155 },
  { day: 'Wed', planned: 155, actual: 157 },
  { day: 'Thu', planned: 160, actual: 158 },
  { day: 'Fri', planned: 157, actual: 154 },
  { day: 'Sat', planned: 152, actual: 150 },
  { day: 'Sun', planned: 148, actual: 146 },
];

export const weightProjections = [
  { week: 'W1', projected: 780, actual: 775 },
  { week: 'W4', projected: 860, actual: 855 },
  { week: 'W8', projected: 945, actual: 952 },
  { week: 'W12', projected: 1035, actual: 1042 },
  { week: 'W16', projected: 1125, actual: 1120 },
  { week: 'W20', projected: 1220, actual: null },
  { week: 'W24', projected: 1315, actual: null },
];

export const users = [
  { id: 1, name: 'Gabriel Sanchez', role: 'admin', email: 'gabriel@cattlegrow.com', avatar: 'GS', lastActive: '2026-03-19 08:30' },
  { id: 2, name: 'Dr. Martinez', role: 'veterinarian', email: 'martinez@cattlegrow.com', avatar: 'DM', lastActive: '2026-03-19 07:45' },
  { id: 3, name: 'Carlos Mendez', role: 'operator', email: 'carlos@cattlegrow.com', avatar: 'CM', lastActive: '2026-03-19 06:00' },
  { id: 4, name: 'Dr. Kim', role: 'nutritionist', email: 'kim@cattlegrow.com', avatar: 'DK', lastActive: '2026-03-18 16:30' },
  { id: 5, name: 'Miguel Rodriguez', role: 'operator', email: 'miguel@cattlegrow.com', avatar: 'MR', lastActive: '2026-03-19 05:45' },
];

export const alerts = [
  { id: 1, type: 'critical', message: 'Supplement Premix inventory critical — 3 days remaining', module: 'inventory', time: '08:15' },
  { id: 2, type: 'critical', message: 'LA-200 stock critically low — 4 days remaining', module: 'health', time: '08:10' },
  { id: 3, type: 'warning', message: 'DDGs inventory below reorder point', module: 'inventory', time: '07:45' },
  { id: 4, type: 'warning', message: 'LOT-2403 approaching target weight — schedule closeout', module: 'operations', time: '07:30' },
  { id: 5, type: 'warning', message: 'LOT-2408 at target weight — ready for closeout', module: 'operations', time: '07:30' },
  { id: 6, type: 'info', message: 'Pen P-15 bunk score 2 — consider feed adjustment', module: 'feeding', time: '07:05' },
  { id: 7, type: 'info', message: 'Miller & Sons billing overdue — 15 days', module: 'financial', time: '06:00' },
];

export const equipmentStatus = [
  { name: 'Scale - Alley 1', type: 'scale', status: 'online', lastReading: '08:12', accuracy: '99.8%' },
  { name: 'Scale - Alley 2', type: 'scale', status: 'online', lastReading: '08:05', accuracy: '99.7%' },
  { name: 'EID Reader - Chute 1', type: 'eid', status: 'online', lastReading: '07:58', readRate: '99.2%' },
  { name: 'EID Reader - Chute 2', type: 'eid', status: 'offline', lastReading: '06:30', readRate: '—' },
  { name: 'Micro-Ingredient System', type: 'micro', status: 'online', lastReading: '07:45', accuracy: '99.5%' },
  { name: 'Mixer A Load Cell', type: 'loadcell', status: 'online', lastReading: '07:50', accuracy: '99.9%' },
  { name: 'Mixer B Load Cell', type: 'loadcell', status: 'online', lastReading: '07:42', accuracy: '99.8%' },
  { name: 'Weather Station', type: 'weather', status: 'online', lastReading: '08:15', temp: '42°F' },
];
