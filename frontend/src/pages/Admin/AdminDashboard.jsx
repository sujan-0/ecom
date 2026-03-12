import Chart from "react-apexcharts";
import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";
import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import Loader from "../../components/Loader";

const StatCard = ({ title, value, icon, color, isLoading }) => (
  <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex items-center gap-5">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl font-black flex-shrink-0 ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{title}</p>
      <p className="text-2xl font-black text-slate-900 mt-1">
        {isLoading ? <span className="skeleton inline-block w-20 h-7" /> : value}
      </p>
    </div>
  </div>
);

const AdminDashboard = () => {
  const { data: sales, isLoading } = useGetTotalSalesQuery();
  const { data: customers, isLoading: loadingC } = useGetUsersQuery();
  const { data: orders, isLoading: loadingO } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();

  const [chartState, setChartState] = useState({
    options: {
      chart: { type: "area", toolbar: { show: false }, background: "transparent" },
      tooltip: { theme: "light" },
      colors: ["#10b981"],
      dataLabels: { enabled: false },
      stroke: { curve: "smooth", width: 2 },
      fill: {
        type: "gradient",
        gradient: { shadeIntensity: 1, opacityFrom: 0.25, opacityTo: 0.02 },
      },
      grid: { borderColor: "#f1f5f9", strokeDashArray: 4 },
      xaxis: { categories: [], labels: { style: { colors: "#94a3b8", fontSize: "11px" } } },
      yaxis: { labels: { style: { colors: "#94a3b8", fontSize: "11px" } }, min: 0 },
    },
    series: [{ name: "Sales (NRP)", data: [] }],
  });

  useEffect(() => {
    if (salesDetail) {
      const formatted = salesDetail.map((item) => ({ x: item._id, y: item.totalSales }));
      setChartState((prev) => ({
        ...prev,
        options: {
          ...prev.options,
          xaxis: { ...prev.options.xaxis, categories: formatted.map((i) => i.x) },
        },
        series: [{ name: "Sales (NRP)", data: formatted.map((i) => i.y) }],
      }));
    }
  }, [salesDetail]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 animate-fade-in">
      <AdminMenu />

      <div className="flex-1 space-y-8">
        {/* Page header */}
        <div>
          <p className="text-overline text-brand-500 mb-1">Overview</p>
          <h1 className="font-display text-3xl text-slate-900">Dashboard</h1>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <StatCard
            title="Total Revenue"
            value={`NRP ${sales?.totalSales?.toLocaleString() || "0"}`}
            icon="💰"
            color="bg-brand-500"
            isLoading={isLoading}
          />
          <StatCard
            title="Customers"
            value={customers?.length || 0}
            icon="👤"
            color="bg-blue-500"
            isLoading={loadingC}
          />
          <StatCard
            title="Total Orders"
            value={orders?.totalOrders || 0}
            icon="📦"
            color="bg-violet-500"
            isLoading={loadingO}
          />
        </div>

        {/* Chart */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-overline text-slate-400 mb-1">Analytics</p>
              <h2 className="text-lg font-bold text-slate-900">Sales Over Time</h2>
            </div>
          </div>
          <Chart options={chartState.options} series={chartState.series} type="area" height={280} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
