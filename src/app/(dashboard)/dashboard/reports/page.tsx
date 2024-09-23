// app/dashboard/reports/page.tsx
import { fetchReportData } from './reportData';
import { SalesSummary } from './SalesSummary';
import { MonthlySalesChart } from './MonthlySalesChart';
import { TopProducts } from './TopProduct';
import { DownloadPDFButton } from './DownloadPDFButton';

export default async function ReportPage() {
  const { totalSales, monthlyOrders, topProducts, recentOrders } = await fetchReportData();

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">Sales Report</h1>
          <DownloadPDFButton />
        </div>
        <div id="report-content" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <SalesSummary totalSales={totalSales._sum.totalPrice || 0} />
            </div>
            <TopProducts products={topProducts} />
          </div>
          <div className="mt-6">
            <MonthlySalesChart monthlyOrders={monthlyOrders} />
          </div>
          {/* Add more report components here */}
        </div>
      </div>
    </div>
  );
}