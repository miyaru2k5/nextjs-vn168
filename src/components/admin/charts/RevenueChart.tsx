'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type Props = {
  data: { month: string; revenue: number; orders: number }[];
};

function formatCurrency(value: number) {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  return `${(value / 1000).toFixed(0)}K`;
}

export default function RevenueChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7a5af8" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#7a5af8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(152,162,179,0.2)" vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#98A2B3' }} axisLine={false} tickLine={false} />
        <YAxis tickFormatter={formatCurrency} tick={{ fontSize: 12, fill: '#98A2B3' }} axisLine={false} tickLine={false} width={50} />
        <Tooltip
          contentStyle={{
            background: 'var(--tooltip-bg, #fff)',
            border: '1px solid #E4E7EC',
            borderRadius: '12px',
            fontSize: '13px',
          }}
          formatter={(value) => [`₫${Number(value ?? 0).toLocaleString('vi-VN')}`, 'Doanh thu']}
        />
        <Area type="monotone" dataKey="revenue" stroke="#7a5af8" strokeWidth={2} fill="url(#revenueGrad)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
