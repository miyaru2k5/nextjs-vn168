'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type Props = {
  data: { month: string; users: number; active: number }[];
};

export default function UserGrowthChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(152,162,179,0.2)" vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#98A2B3' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: '#98A2B3' }} axisLine={false} tickLine={false} width={45} />
        <Tooltip
          contentStyle={{ borderRadius: '12px', fontSize: '13px', border: '1px solid #E4E7EC' }}
        />
        <Legend wrapperStyle={{ fontSize: '13px' }} />
        <Line type="monotone" dataKey="users" name="Tổng" stroke="#7a5af8" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="active" name="Hoạt động" stroke="#12b76a" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
