import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { LayoutDashboard, Users, Settings, ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';

const mockData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 900 },
];

const AnimatedCounter = ({ value, prefix = "", suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = value / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{prefix}{Math.floor(count).toLocaleString()}{suffix}</span>;
};

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{ display: 'flex', height: '600px', width: '100%', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
      {/* Sidebar */}
      <div style={{
        width: collapsed ? '80px' : '240px',
        background: 'var(--color-surface2)',
        borderRight: '1px solid var(--color-border)',
        transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px 0'
      }}>
        <div style={{ padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'space-between', marginBottom: '40px' }}>
          {!collapsed && <span style={{ fontWeight: 700, fontSize: '18px' }}>Admin</span>}
          <button 
            onClick={() => setCollapsed(!collapsed)}
            style={{ background: 'none', border: 'none', color: 'var(--color-text)', cursor: 'pointer', padding: '4px' }}
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '0 12px' }}>
          {[
            { icon: LayoutDashboard, label: 'Overview' },
            { icon: Users, label: 'Customers' },
            { icon: Settings, label: 'Settings' }
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '16px', padding: '12px',
              borderRadius: '8px', cursor: 'pointer', color: i === 0 ? 'var(--color-cyan)' : 'var(--color-muted)',
              background: i === 0 ? 'rgba(var(--rgb-cyan), 0.1)' : 'transparent',
              justifyContent: collapsed ? 'center' : 'flex-start',
              transition: 'background 0.2s'
            }}
            onMouseEnter={e => { if(i!==0) e.currentTarget.style.background = 'var(--color-surface3)'}}
            onMouseLeave={e => { if(i!==0) e.currentTarget.style.background = 'transparent'}}
            >
              <item.icon size={20} />
              {!collapsed && <span style={{ fontWeight: 500 }}>{item.label}</span>}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, background: 'var(--color-bg)', padding: '32px', overflowY: 'auto' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px' }}>Dashboard</h2>
        
        {/* Animated Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          {[
            { label: 'Total Revenue', value: 45890, prefix: '$' },
            { label: 'Active Users', value: 1245 },
            { label: 'Conversion Rate', value: 12, suffix: '%' }
          ].map((metric, i) => (
            <div key={i} className="glass" style={{ padding: '24px', borderRadius: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ color: 'var(--color-muted)', fontSize: '14px', fontWeight: 500 }}>{metric.label}</span>
                <TrendingUp size={16} color="var(--color-success)" />
              </div>
              <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--color-text)' }}>
                <AnimatedCounter value={metric.value} prefix={metric.prefix} suffix={metric.suffix} />
              </div>
            </div>
          ))}
        </div>

        {/* Custom Recharts */}
        <div className="glass" style={{ padding: '24px', borderRadius: '16px', height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-cyan)" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="var(--color-cyan)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'var(--color-muted)', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: 'var(--color-muted)', fontSize: 12}} />
              <Tooltip 
                contentStyle={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '8px', color: 'var(--color-text)' }}
                itemStyle={{ color: 'var(--color-cyan)', fontWeight: 600 }}
              />
              <Area type="monotone" dataKey="value" stroke="var(--color-cyan)" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
