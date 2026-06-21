// Stats overview - shows summary numbers and a status breakdown chart on the Dashboard
import React, { useEffect, useState, useContext } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ApplicationContext } from '../context/ApplicationContext';
import { getStatusStyle } from '../utils/statusStyles';
import './StatsOverview.css';

function StatsOverview() {
  const { fetchStats } = useContext(ApplicationContext);
  const [stats, setStats] = useState(null);

  // Load stats once when the component mounts
  useEffect(() => {
    const loadStats = async () => {
      const result = await fetchStats();
      if (result.success) {
        setStats(result.data);
      }
    };
    loadStats();
  }, [fetchStats]);

  // Don't render anything until stats have loaded
  if (!stats || stats.totalApplications === 0) {
    return null;
  }

  // Convert statusCounts object into an array recharts can use
  // e.g. { Applied: 3, Offer: 1 } -> [{ name: 'Applied', value: 3 }, { name: 'Offer', value: 1 }]
  const chartData = Object.entries(stats.statusCounts).map(([status, count]) => ({
    name: status,
    value: count
  }));

  // Count interviews (combine "Interview Scheduled" and "Interviewed")
  const interviewCount =
    (stats.statusCounts['Interview Scheduled'] || 0) +
    (stats.statusCounts['Interviewed'] || 0);
  const offerCount = stats.statusCounts['Offer'] || 0;

  return (
    <div className="stats-overview">
      {/* Summary number cards */}
      <div className="stats-numbers">
        <div className="stat-card">
          <span className="stat-value">{stats.totalApplications}</span>
          <span className="stat-label">Total Applications</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{interviewCount}</span>
          <span className="stat-label">Interviews</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{offerCount}</span>
          <span className="stat-label">Offers</span>
        </div>
      </div>

      {/* Pie chart of status breakdown */}
      <div className="stats-chart">
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getStatusStyle(entry.name).color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend layout="vertical" verticalAlign="middle" align="right" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default StatsOverview;