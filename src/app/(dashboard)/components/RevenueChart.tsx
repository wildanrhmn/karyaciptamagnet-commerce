import { generateYAxis } from './utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana } from './Fonts';
import { fetchRevenue } from '../data/data';

export default async function RevenueChart(){
  let revenue = await fetchRevenue();
  const chartHeight = 350;

  if (!revenue || revenue.length === 0) {
    revenue = [
      { month: 'Jan', revenue: 2000 },
      { month: 'Feb', revenue: 1800 },
      { month: 'Mar', revenue: 2200 },
      { month: 'Apr', revenue: 2500 },
      { month: 'May', revenue: 2300 },
      { month: 'Jun', revenue: 3000 },
      { month: 'Jul', revenue: 2800 },
      { month: 'Aug', revenue: 3200 },
      { month: 'Sep', revenue: 3500 },
      { month: 'Oct', revenue: 3700 },
      { month: 'Nov', revenue: 3900 },
      { month: 'Dec', revenue: 4000 },
    ];
  }

  const { yAxisLabels, topLabel } = generateYAxis(revenue);

  return (
    <div className="w-full col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Penghasilan Terbaru
      </h2>

      <div className="rounded-xl bg-gray-50 p-4">
        <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4" style={{ height: `${chartHeight}px` }}>
          <div
            className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {revenue.map((month) => (
            <div key={month.month} className="flex flex-col items-center gap-2">
              <div
                className="w-full rounded-md bg-blue-300"
                style={{
                  height: `${(chartHeight / topLabel) * month.revenue}px`,
                }}
              ></div>
              <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                {month.month}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center pb-2 pt-16">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Last 12 months</h3>
        </div>
      </div>
    </div>
  );
}
