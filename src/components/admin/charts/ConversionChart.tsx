'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type Props = {
  data: { stage: string; value: number }[];
};

export default function ConversionChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} layout="vertical" margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(152,162,179,0.2)" horizontal={false} />
        <XAxis type="number" tick={{ fontSize: 12, fill: '#98A2B3' }} axisLine={false} tickLine={false} />
        <YAxis type="category" dataKey="stage" tick={{ fontSize: 12, fill: '#98A2B3' }} axisLine={false} tickLine={false} width={80} />
        <Tooltip
          formatter={(value) => [Number(value ?? 0).toLocaleString('vi-VN'), 'Số lượng']}
          contentStyle={{ borderRadius: '12px', fontSize: '13px', border: '1px solid #E4E7EC' }}
        />
        <Bar dataKey="value" fill="#7a5af8" radius={[0, 6, 6, 0]} barSize={20} />
      </BarChart>
    </ResponsiveContainer>
  );
}
