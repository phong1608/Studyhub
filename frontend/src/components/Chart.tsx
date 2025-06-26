'use client';

import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// Định nghĩa kiểu dữ liệu cho các mục doanh thu
interface RevenueData {
  amount: number;
  createdAt: string;
}

// Props của component nhận vào data có kiểu là mảng RevenueData
interface RevenueChartProps {
  data: RevenueData[];
}

// Component hiển thị bảng và biểu đồ doanh thu
const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Thống kê doanh thu</h2>

      {/* Bảng thống kê */}
      <table className="min-w-full table-auto border-collapse border border-gray-300 mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Ngày</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Doanh thu</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-900">{entry.createdAt}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(entry.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Biểu đồ đường */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="createdAt" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="amount" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export { RevenueChart }; 
export type { RevenueData };

