// app/dashboard/reports/page.tsx
import { fetchReportData } from './reportData';
import { SalesSummary } from './SalesSummary';
import { MonthlySalesChart } from './MonthlySalesChart';
import { TopProducts } from './TopProducts';
import { RecentOrders } from './RecentOrders';
import { SalesByCategory } from './SalesByCategory';
import React from 'react';

export default async function ReportPage() {
  const { totalSales, monthlyOrders, topProducts, recentOrders, salesByCategory } = await fetchReportData();

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800">Laporan Penjualan</h1>
        </div>
        <div id="report-content" className="space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-2">
              <SalesSummary totalSales={totalSales._sum.totalPrice || 0} />
            </div>
            <div className="lg:col-span-2">
              <TopProducts products={topProducts} />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <MonthlySalesChart monthlyOrders={monthlyOrders} />
            </div>
            <div className="lg:col-span-1">
              <SalesByCategory data={salesByCategory} />
            </div>
          </div>
          <div className="grid grid-cols-1">
            <RecentOrders orders={recentOrders} />
          </div>
        </div>
      </div>
    </div>
  );
}