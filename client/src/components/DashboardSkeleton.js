// Dashboard skeleton - placeholder layout shown while applications and stats are loading
import React from 'react';
import Skeleton from './Skeleton';

function DashboardSkeleton() {
  return (
    <div>
      {/* Stats section skeleton */}
      <div className="stats-overview">
        <div className="stats-numbers">
          <div className="stat-card">
            <Skeleton width="60px" height="28px" style={{ marginBottom: '6px' }} />
            <Skeleton width="100px" height="13px" />
          </div>
          <div className="stat-card">
            <Skeleton width="60px" height="28px" style={{ marginBottom: '6px' }} />
            <Skeleton width="100px" height="13px" />
          </div>
          <div className="stat-card">
            <Skeleton width="60px" height="28px" style={{ marginBottom: '6px' }} />
            <Skeleton width="100px" height="13px" />
          </div>
        </div>
        <div className="stats-chart" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Skeleton width="180px" height="180px" borderRadius="50%" />
        </div>
      </div>

      {/* Application cards skeleton */}
      <Skeleton width="160px" height="14px" style={{ marginBottom: '16px' }} />
      <div className="application-list">
        {[1, 2, 3].map((i) => (
          <div key={i} className="application-card" style={{ borderLeftColor: 'var(--color-border)' }}>
            <div className="application-card-main" style={{ width: '100%' }}>
              <Skeleton width="140px" height="18px" style={{ marginBottom: '8px' }} />
              <Skeleton width="100px" height="14px" style={{ marginBottom: '10px' }} />
              <Skeleton width="220px" height="13px" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardSkeleton;